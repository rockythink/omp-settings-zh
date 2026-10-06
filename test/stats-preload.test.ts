import { expect, test } from "bun:test";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createStatsPreload } from "../src/stats/preload";

const SCRIPT_PATH = "/__omp-settings-zh.js";
const script = 'globalThis.statsLanguage = "中文";\n// quotes " \' \\ </script> \u2028 \u2029\n';
const html = "<!doctype html><html><head><title>Stats</title></head><body>Official dashboard</body></html>";

// A separate Bun process loads the generated CJS before registering real HTTP
// handlers. No forwarding server or in-process evaluation of the preload.
const serverSource = String.raw`
const html = ${JSON.stringify(html)};
let mutations = 0;
const stats = Bun.serve({
  hostname: "127.0.0.1", port: 0, idleTimeout: 2,
  async fetch(request, server) {
    const url = new URL(request.url);
    const headers = { "x-omp-stats-dashboard": "3" };
    const status = Number(url.searchParams.get("status") || 200);
    if (status !== 200) {
      return new Response("original refusal " + status, { status, headers: { ...headers, "content-type": "text/html" } });
    }
    // Official-style authorization is in the API handler, not the static marker.
    if (url.pathname.startsWith("/api/")) {
      const origin = "http://127.0.0.1:" + server.port;
      if ((request.headers.has("origin") && request.headers.get("origin") !== origin)
        || request.headers.get("host") !== new URL(origin).host
        || (request.method === "POST" && request.headers.get("x-omp-stats-action") !== "1")) {
        return new Response("original forbidden", { status: 403, headers });
      }
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
      if (url.pathname === "/api/events") {
        server.timeout(request, 0);
        return new Response(new ReadableStream({ start(controller) {
          controller.enqueue(new TextEncoder().encode('event: status\ndata: {"phase":"ready"}\n\n'));
          // Deliberately stay open: consumers must read the first event now.
        } }), { headers: { ...headers, "content-type": "text/event-stream", "cache-control": "no-cache" } });
      }
      if (request.method === "POST") mutations++;
      return Response.json({ mutations }, { headers });
    }
    if (request.method === "POST") return new Response("original static POST", { status: 405, headers });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("original method", { status: 405, headers });
    return new Response(request.method === "HEAD" ? null : new Blob([html], { type: "text/html" }), {
      headers: { ...headers, "content-type": "text/html; charset=utf-8", "content-length": String(new TextEncoder().encode(html).length), etag: '"original-html"', "cache-control": "public, max-age=3600" },
    });
  },
});
const unrelated = Bun.serve({ hostname: "127.0.0.1", port: 0, fetch(request) {
  const url = new URL(request.url);
  if (url.pathname === "/__omp-settings-zh.js" && !url.searchParams.has("fallback")) return new Response("not found", { status: 404 });
  return new Response(html, { headers: { "content-type": "text/html", etag: '"unrelated-html"', "cache-control": "public" } });
} });
console.log(JSON.stringify({ stats: "http://127.0.0.1:" + stats.port, unrelated: "http://127.0.0.1:" + unrelated.port }));
`;

async function withServers(run: (urls: { stats: string; unrelated: string }) => Promise<void>) {
  const directory = await mkdtemp(join(tmpdir(), "omp stats preload 中文-"));
  let child: Bun.Subprocess<"ignore", "pipe", "pipe"> | undefined;
  try {
    const preload = join(directory, "preload.cjs");
    const entry = join(directory, "server.cjs");
    await Promise.all([writeFile(preload, createStatsPreload(script)), writeFile(entry, serverSource)]);
    child = Bun.spawn([process.execPath, entry], {
      env: { ...process.env, BUN_OPTIONS: `--preload=data:text/javascript;base64,${Buffer.from(`require(${JSON.stringify(preload)});`).toString("base64")}` },
      stdin: "ignore", stdout: "pipe", stderr: "pipe",
    });
    const reader = child.stdout.getReader();
    const ready = (async () => {
      const decoder = new TextDecoder();
      let line = "";
      try {
        while (!line.includes("\n")) {
          const chunk = await reader.read();
          if (chunk.done) throw new Error(`Stats fixture exited before readiness: ${await new Response(child!.stderr).text()}`);
          line += decoder.decode(chunk.value, { stream: true });
        }
        return JSON.parse(line.slice(0, line.indexOf("\n"))) as { stats: string; unrelated: string };
      } finally { reader.releaseLock(); }
    })();
    const urls = await ready;
    await run(urls);
  } finally {
    if (child) { child.kill(); await child.exited; }
    await rm(directory, { recursive: true, force: true });
  }
}

test("actual Bun preload injects the original HTML and serves same-origin GET/HEAD script without stale metadata", async () => {
  await withServers(async ({ stats }) => {
    const page = await fetch(stats);
    const body = await page.text();
    expect(body).toBe(html.replace("</head>", `<script src="${SCRIPT_PATH}" defer></script></head>`));
    expect(page.headers.get("x-omp-stats-dashboard")).toBe("3");
    expect(page.headers.get("etag")).toBeNull();
    expect(page.headers.get("cache-control")).toBe("no-store");
    const length = page.headers.get("content-length");
    if (length !== null) expect(Number(length)).toBe(new TextEncoder().encode(body).length);

    const translated = await fetch(stats + SCRIPT_PATH);
    expect(await translated.text()).toBe(script);
    expect(translated.headers.get("content-type")).toBe("text/javascript; charset=utf-8");
    expect(translated.headers.get("cache-control")).toBe("no-store");
    expect(translated.headers.get("etag")).toBeNull();
    const head = await fetch(stats + SCRIPT_PATH, { method: "HEAD" });
    expect(head.status).toBe(200);
    expect(await head.text()).toBe("");
    expect(head.headers.get("content-type")).toBe("text/javascript; charset=utf-8");
    const headPage = await fetch(stats, { method: "HEAD" });
    expect(await headPage.text()).toBe("");
  });
});

test("preload preserves original refusals, API authorization and non-GET methods while retaining allowed cross-origin static resources", async () => {
  await withServers(async ({ stats }) => {
    for (const path of ["/", SCRIPT_PATH]) {
      for (const status of [401, 403, 500]) {
        for (const method of ["GET", "HEAD"]) {
          const response = await fetch(`${stats}${path}?status=${status}`, { method });
          expect(response.status).toBe(status);
          expect(await response.text()).toBe(method === "HEAD" ? "" : `original refusal ${status}`);
          expect(response.headers.get("cache-control")).toBeNull();
        }
      }
    }
    for (const headers of [
      {},
      { "x-omp-stats-action": "1", origin: "https://foreign.example" },
      { "x-omp-stats-action": "1", host: "foreign.example" },
    ]) {
      const denied = await fetch(stats + "/api/judge", { method: "POST", headers });
      expect(denied.status).toBe(403);
      expect(await denied.text()).toBe("original forbidden");
      expect(denied.headers.has("access-control-allow-origin")).toBe(false);
    }
    const mutation = await fetch(stats + "/api/judge", {
      method: "POST", headers: { origin: stats, "x-omp-stats-action": "1" },
    });
    expect(await mutation.json()).toEqual({ mutations: 1 });
    const api = await fetch(stats + "/api/state");
    expect(await api.json()).toEqual({ mutations: 1 });
    expect(api.headers.get("cache-control")).toBeNull();
    for (const method of ["POST", "OPTIONS", "PUT"]) {
      const response = await fetch(stats + SCRIPT_PATH, { method });
      expect(response.status).toBe(method === "OPTIONS" ? 204 : 405);
      expect(await response.text()).toBe(method === "OPTIONS" ? "" : method === "POST" ? "original static POST" : "original method");
      expect(response.headers.has("access-control-allow-origin")).toBe(false);
    }
    for (const path of ["/", SCRIPT_PATH]) {
      const allowed = await fetch(stats + path, { headers: { origin: "https://foreign.example", host: "foreign.example", "sec-fetch-site": "cross-site" } });
      expect(allowed.status).toBe(200);
      expect(allowed.headers.has("access-control-allow-origin")).toBe(false);
      expect(await allowed.text()).toBe(path === SCRIPT_PATH ? script : html.replace("</head>", `<script src="${SCRIPT_PATH}" defer></script></head>`));
    }
  });
});

test("preloaded Stats SSE stays readable while its stream is still open", async () => {
  await withServers(async ({ stats }) => {
    const abort = new AbortController();
    try {
      const response = await fetch(stats + "/api/events", { signal: abort.signal });
      expect(response.headers.get("content-type")).toBe("text/event-stream");
      expect(response.headers.get("cache-control")).toBe("no-cache");
      const reader = response.body!.getReader();
      try {
        const first = await reader.read();
        expect(first.done).toBe(false);
        expect(new TextDecoder().decode(first.value)).toBe('event: status\ndata: {"phase":"ready"}\n\n');
      } finally {
        abort.abort();
        await reader.cancel().catch(() => {});
      }
    } finally { abort.abort(); }
  });
}, 5000);

test("other Bun servers in the preloaded process retain their HTML, caching and missing script", async () => {
  await withServers(async ({ unrelated }) => {
    const response = await fetch(unrelated);
    expect(await response.text()).toBe(html);
    expect(response.headers.get("etag")).toBe('"unrelated-html"');
    expect(response.headers.get("cache-control")).toBe("public");
    const missing = await fetch(unrelated + SCRIPT_PATH);
    expect(missing.status).toBe(404);
    expect(await missing.text()).toBe("not found");
    const fallback = await fetch(unrelated + SCRIPT_PATH + "?fallback=1");
    expect(fallback.status).toBe(200);
    expect(await fallback.text()).toBe(html);
    expect(fallback.headers.get("content-type")).toBe("text/html");
    expect(fallback.headers.get("etag")).toBe('"unrelated-html"');
  });
});
