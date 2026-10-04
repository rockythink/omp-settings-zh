// Run under Bun, separate from the compiled host's module graph and build flags.
import { startServer, closeDb } from "@oh-my-pi/omp-stats";
import type { StandaloneJudge } from "@oh-my-pi/pi-coding-agent/judgment/standalone";

let judge: Promise<StandaloneJudge> | undefined;
const server = await startServer(0, "127.0.0.1", {
  judge: async () => {
    judge ??= import("@oh-my-pi/pi-coding-agent/judgment/standalone")
      .then(({ openStandaloneJudge }) => openStandaloneJudge(process.cwd(), "stats_frustration"));
    return (await judge).judge;
  },
});
console.log(JSON.stringify({ url: `http://127.0.0.1:${server.port}` }));

let stopping = false;
const stop = async () => {
  if (stopping) return;
  stopping = true;
  server.stop();
  if (judge) { try { (await judge).close(); } catch { /* A failed judge owns no auth store. */ } }
  closeDb();
  process.exit(0);
};
process.on("SIGTERM", stop);
process.on("SIGINT", stop);
// A parent crash must not leave a statistics process behind.
void (async () => {
  for await (const _chunk of Bun.stdin.stream()) { /* Parent owns this pipe. */ }
  await stop();
})();
