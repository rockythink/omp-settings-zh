// Keep a separate launcher parent alive so tests can remove just that parent.
const child = Bun.spawn([process.execPath, ...Bun.argv.slice(2)], { stdin: "ignore", stdout: "inherit", stderr: "inherit" });
process.exitCode = await child.exited;
export {};
