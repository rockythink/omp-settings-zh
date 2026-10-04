import { fileURLToPath } from "node:url";
import { startStatsProxy } from "./proxy";
import type { StatsProxy } from "./proxy";

export interface StatsDashboard {
  url: string;
  stop(): Promise<void>;
  isRunning(): boolean;
}

/** Compile only our browser adapter; upstream assets are served untouched. */
async function browserScript(): Promise<string> {
  const result = await Bun.build({ entrypoints: [fileURLToPath(new URL("./browser.ts", import.meta.url))], target: "browser", minify: true });
  if (!result.success || !result.outputs[0]) throw new Error("Stats 页面语言脚本构建失败：" + result.logs.join("\n"));
  return result.outputs[0].text();
}

export async function startStatsDashboard(cwd: string): Promise<StatsDashboard> {
  const script = await browserScript();
  const env: NodeJS.ProcessEnv = { ...process.env, BUN_BE_BUN: "1" };
  // These describe the parent binary, not the source-package worker.
  delete env.PI_COMPILED;
  delete env.PI_BUNDLED;
  const worker = Bun.spawn([process.execPath, "run", fileURLToPath(new URL("./worker.ts", import.meta.url))], {
    cwd, env, stdin: "pipe", stdout: "pipe", stderr: "pipe",
  });
  const isRunning = () => worker.exitCode === null && worker.signalCode === null;
  let diagnostics = "";
  // Drain stderr even after readiness; bound memory and never log session content.
  void (async () => {
    const decoder = new TextDecoder();
    for await (const chunk of worker.stderr) diagnostics = (diagnostics + decoder.decode(chunk, { stream: true })).slice(-4096);
  })();
  let proxy: StatsProxy | undefined;
  let stopPromise: Promise<void> | undefined;
  const stop = () => stopPromise ??= (async () => {
    proxy?.stop();
    worker.stdin.end();
    if (isRunning()) worker.kill("SIGTERM");
    const timeout = setTimeout(() => { if (isRunning()) worker.kill("SIGKILL"); }, 3000);
    try { await worker.exited; } finally { clearTimeout(timeout); }
  })();
  try {
    let timer: NodeJS.Timeout | undefined;
    const ready = (async () => {
      const decoder = new TextDecoder();
      let line = "";
      let url: string | undefined;
      for await (const chunk of worker.stdout) {
        if (url) continue; // Keep stdout drained while the service is alive.
        line += decoder.decode(chunk, { stream: true });
        if (line.length > 8192) throw new Error("Stats 服务启动输出异常");
        const end = line.indexOf("\n");
        if (end < 0) continue;
        const message: unknown = JSON.parse(line.slice(0, end));
        if (typeof message !== "object" || !message || !("url" in message) || typeof message.url !== "string"
          || !/^http:\/\/127\.0\.0\.1:\d+$/.test(message.url)) throw new Error("Stats 服务启动地址无效");
        url = message.url;
        resolveReady(url);
      }
      if (!url) throw new Error("Stats 服务未启动：" + diagnostics);
    });
    let resolveReady!: (url: string) => void;
    const address = new Promise<string>((resolve, reject) => {
      resolveReady = resolve;
      timer = setTimeout(() => reject(new Error("Stats 服务启动超时：" + diagnostics)), 30000);
      void worker.exited.then(code => reject(new Error(`Stats 服务退出（${code}）：${diagnostics}`)));
      void ready().catch(reject);
    });
    let upstream: string;
    try { upstream = await address; } finally { clearTimeout(timer); }
    const page = await fetch(upstream, { signal: AbortSignal.timeout(5000) });
    if (!page.ok || !page.headers.get("content-type")?.includes("text/html")) throw new Error("官方 Stats 页面不可用");
    await page.body?.cancel();
    proxy = startStatsProxy(upstream, script);
    void worker.exited.then(() => proxy?.stop());
    return { url: proxy.url, stop, isRunning };
  } catch (error) {
    await stop();
    throw error;
  }
}
