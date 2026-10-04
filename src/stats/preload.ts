/** Generate a dependency-free CommonJS preload for the real official Bun process. */
export function createStatsPreload(script: string): string {
  return String.raw`(() => {
  const script = ${JSON.stringify(script)};
  const scriptPath = "/__omp-settings-zh.js";
  const injection = '<script src="' + scriptPath + '" defer></script>';
  const serve = Bun.serve;

  function changedHeaders(response) {
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.delete("etag");
    headers.set("cache-control", "no-store");
    return headers;
  }

  function transform(request, response) {
    // Identity is not authorization: execute the original handler first and keep
    // every refusal/error, including those carrying the dashboard marker.
    if (!(response instanceof Response) || !response.ok
      || !response.headers.has("x-omp-stats-dashboard")
      || (request.method !== "GET" && request.method !== "HEAD")
      || response.status === 204 || response.status === 205) return response;

    const pathname = new URL(request.url).pathname;
    if (pathname === "/api" || pathname.startsWith("/api/")) return response;
    if (pathname === scriptPath) {
      const headers = changedHeaders(response);
      headers.set("content-type", "text/javascript; charset=utf-8");
      if (response.body) void response.body.cancel().catch(() => {});
      return new Response(request.method === "HEAD" ? null : script, {
        status: response.status, statusText: response.statusText, headers,
      });
    }

    // API responses and open SSE streams are returned without reading or copying.
    if (request.method === "HEAD"
      || response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "text/html") return response;
    return response.text().then((html) => {
      const injected = html.replace(/<\/head\s*>/i, injection + "$&");
      return new Response(injected === html ? html + injection : injected, {
        status: response.status, statusText: response.statusText,
        headers: changedHeaders(response),
      });
    });
  }

  Bun.serve = function (options) {
    const handler = options?.fetch;
    if (typeof handler !== "function") return serve.call(this, options);
    return serve.call(this, {
      ...options,
      fetch(request, server) {
        const result = handler.call(this, request, server);
        return result && typeof result.then === "function"
          ? result.then((response) => transform(request, response))
          : transform(request, result);
      },
    });
  };
})();
`;
}
