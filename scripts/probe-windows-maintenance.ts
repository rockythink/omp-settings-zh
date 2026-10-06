import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const root = await mkdtemp(join(tmpdir(), "omp maintenance probe 中文 "));
const shell = join(process.env.SystemRoot!, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
try {
  for (const detached of [false, true]) for (const mode of ["buffer", "pipe"] as const) {
    const trace = join(root, detached + "-" + mode + ".txt");
    const script = "$ErrorActionPreference='Stop';$r=[IO.StreamReader]::new([Console]::OpenStandardInput(),[Text.UTF8Encoding]::new($false));try{$s=$r.ReadToEnd()}finally{$r.Dispose()};[IO.File]::WriteAllText('" + trace.replaceAll("'", "''") + "',[string]$s.Length);[Console]::WriteLine('READY');[Console]::Error.WriteLine('DONE')";
    const args = [shell, "-NoProfile", "-NonInteractive", "-EncodedCommand", Buffer.from(script, "utf16le").toString("base64")];
    const payload = "owned test payload 中文";
    const child = Bun.spawn(args, { detached, stdin: mode === "buffer" ? new TextEncoder().encode(payload) : "pipe", stdout: "pipe", stderr: "pipe" });
    if (mode === "pipe") { (child.stdin as import("bun").FileSink).write(payload); (child.stdin as import("bun").FileSink).end(); }
    const [code, out, err] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
    console.log(JSON.stringify({ detached, mode, code, out, err, sourceLength: await readFile(trace, "utf8").catch(error => String(error)), expectedLength: payload.length }));
  }
} finally { await rm(root, { recursive: true, force: true }); }
