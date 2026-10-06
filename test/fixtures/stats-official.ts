import { writeFileSync } from "node:fs";
// Real compiled Bun child for launcher/preload/HTTP/lifecycle integration tests.
const argv = Bun.argv.slice(2);
if (argv[0] !== "stats" || argv.includes("--help")) {
  console.log(JSON.stringify({ argv, cwd: process.cwd(), options: process.env.BUN_OPTIONS ?? null }));
  console.error("official stderr");
  process.exit(23);
}
const server = Bun.serve({
  hostname: "127.0.0.1", port: 0,
  fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === "/exit") {
      setTimeout(() => process.exit(17), 50);
      return new Response("exiting");
    }
    if (path === "/api/data") return Response.json({ official: true }, { headers: { "x-omp-stats-dashboard": "3" } });
    return new Response("<!doctype html><html><head><title>Stats</title></head><body>Official</body></html>", {
      headers: { "x-omp-stats-dashboard": "3", "content-type": "text/html" },
    });
  },
});
process.on("SIGINT", () => { server.stop(true); process.exit(0); });
const ready = JSON.stringify({
  argv, cwd: process.cwd(), options: process.env.BUN_OPTIONS,
  pid: process.pid, url: `http://127.0.0.1:${server.port}`,
});
if (process.env.OMP_RUNNER_TEST_READY_FILE) writeFileSync(process.env.OMP_RUNNER_TEST_READY_FILE, ready);
console.log(ready);
export {};
