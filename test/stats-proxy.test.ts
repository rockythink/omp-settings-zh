import { expect, test } from "bun:test";
import { startStatsProxy } from "../src/stats/proxy";

test("Stats proxy rejects rebinding, foreign origins and headerless mutations before upstream", async () => {
  let mutations = 0;
  const upstream = Bun.serve({ hostname: "127.0.0.1", port: 0, fetch(request) {
    if (request.method === "POST") mutations++;
    return new Response("accepted");
  } });
  const proxy = startStatsProxy(`http://127.0.0.1:${upstream.port}`, "");
  try {
    for (const headers of [
      {},
      { "x-omp-stats-action": "1", origin: "https://evil.example" },
      { "x-omp-stats-action": "1", host: `evil.example:${new URL(proxy.url).port}` },
      { "x-omp-stats-action": "1", "sec-fetch-site": "cross-site" },
    ]) {
      const response = await fetch(proxy.url + "/api/frustration/judge", { method: "POST", headers });
      expect(response.status).toBe(403);
    }
    expect(mutations).toBe(0);
    const allowed = await fetch(proxy.url + "/api/frustration/judge", {
      method: "POST", headers: { "x-omp-stats-action": "1", origin: proxy.url },
    });
    expect(allowed.status).toBe(200);
    expect(mutations).toBe(1);
    const preflight = await fetch(proxy.url + "/api/frustration/judge", { method: "OPTIONS" });
    expect(preflight.headers.has("access-control-allow-origin")).toBe(false);
  } finally { proxy.stop(); upstream.stop(true); }
});

test("Stats proxy streams live events without buffering until upstream closes", async () => {
  const upstream = Bun.serve({ hostname: "127.0.0.1", port: 0, fetch() {
    return new Response(new ReadableStream({ start(controller) {
      controller.enqueue(new TextEncoder().encode('event: status\ndata: {"phase":"ready"}\n\n'));
      // Deliberately remain open, as the official SSE endpoint does.
    } }), { headers: { "content-type": "text/event-stream" } });
  } });
  const proxy = startStatsProxy(`http://127.0.0.1:${upstream.port}`, "");
  const abort = new AbortController();
  try {
    const response = await fetch(proxy.url + "/api/events", { signal: abort.signal });
    const reader = response.body!.getReader();
    const first = await reader.read();
    expect(new TextDecoder().decode(first.value)).toBe('event: status\ndata: {"phase":"ready"}\n\n');
    abort.abort();
    await reader.cancel().catch(() => {});
  } finally { abort.abort(); proxy.stop(); upstream.stop(true); }
}, 5000);
