export interface StatsProxy {
  url: string;
  stop(): void;
}

const SCRIPT_PATH = "/__omp-settings-zh.js";
const HOP_HEADERS = ["connection", "keep-alive", "transfer-encoding", "upgrade", "proxy-authenticate", "proxy-authorization", "te", "trailer"];

/** Loopback only; never add CORS or the official dashboard identity headers. */
export function startStatsProxy(upstream: string, script: string): StatsProxy {
  const target = new URL(upstream);
  if (target.protocol !== "http:" || target.hostname !== "127.0.0.1") throw new Error("Stats 上游必须为本机回环地址");
  const server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    async fetch(request, server) {
      const url = new URL(request.url);
      const origin = `http://127.0.0.1:${server.port}`;
      // Reject DNS rebinding and cross-origin requests before touching upstream.
      if (url.origin !== origin || request.headers.get("host") !== new URL(origin).host
        || (request.headers.has("origin") && request.headers.get("origin") !== origin)
        || request.headers.get("sec-fetch-site") === "cross-site") {
        return new Response("Forbidden", { status: 403 });
      }
      if (request.method === "OPTIONS") return new Response(null, { status: 204 });
      if (!["GET", "HEAD", "POST"].includes(request.method)) return new Response("Method not allowed", { status: 405 });
      if (request.method === "POST" && request.headers.get("x-omp-stats-action") !== "1") {
        return new Response("X-Omp-Stats-Action: 1 required", { status: 403 });
      }
      if (url.pathname === SCRIPT_PATH) {
        return new Response(request.method === "HEAD" ? null : script, {
          headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" },
        });
      }
      if (url.pathname === "/api/events") server.timeout(request, 0);
      const headers = new Headers(request.headers);
      for (const name of [...HOP_HEADERS, "host", "origin", "accept-encoding", "if-none-match", "if-modified-since"]) headers.delete(name);
      try {
        const response = await fetch(target.origin + url.pathname + url.search, {
          method: request.method,
          headers,
          body: request.method === "POST" ? request.body : null,
          signal: request.signal,
          redirect: "manual",
        });
        const resultHeaders = new Headers(response.headers);
        for (const name of [...HOP_HEADERS, "content-encoding", "content-length", "access-control-allow-origin", "access-control-allow-credentials", "x-omp-stats-dashboard", "x-omp-stats-hostname"]) resultHeaders.delete(name);
        // The origin and ephemeral port own the page and its language preference.
        resultHeaders.set("cache-control", "no-store");
        if (response.ok && response.headers.get("content-type")?.includes("text/html") && request.method !== "HEAD") {
          const html = await response.text();
          if (!html.includes("</head>")) return new Response("不兼容的 Stats 页面：缺少 head", { status: 502 });
          const injection = `<script src="${SCRIPT_PATH}" defer></script>`;
          resultHeaders.delete("etag");
          return new Response(html.replace("</head>", injection + "</head>"), { status: response.status, headers: resultHeaders });
        }
        return new Response(response.body, { status: response.status, headers: resultHeaders });
      } catch {
        return new Response("官方 Stats 服务不可用", { status: 502 });
      }
    },
  });
  return { url: `http://127.0.0.1:${server.port}`, stop: () => { server.stop(true); } };
}
