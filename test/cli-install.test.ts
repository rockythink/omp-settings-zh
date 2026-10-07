import { expect, test } from "bun:test";
import { mkdtemp, mkdir, readFile, rm, stat, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const installer = resolve("src/cli/install.ts");

async function fixture(shell: "bash" | "zsh") {
  const home = await mkdtemp(join(tmpdir(), "omp-installer-'"));
  const originalBin = join(home, "original bin");
  await mkdir(originalBin);
  const omp = join(originalBin, "omp");
  // A real executable boundary: observable argv, stdin, stderr and nonzero exit.
  await writeFile(omp, '#!/bin/sh\nprintf "<%s>\\n" "$@"\ncat\nprintf "original-stderr\\n" >&2\nexit 23\n', { mode: 0o755 });
  const env = { ...process.env, HOME: home, SHELL: `/bin/${shell}`, ZDOTDIR: home, PATH: `${originalBin}:/usr/bin:/bin` };
  const invoke = async (args: string[], path = installer) => {
    const proc = Bun.spawn([process.execPath, path, ...args], { env, stdout: "pipe", stderr: "pipe" });
    const [code, stdout, stderr] = await Promise.all([proc.exited, new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
    return { code, stdout, stderr };
  };
  return { home, env, omp, invoke, wrapper: join(home, ".local/share/omp-settings-zh/bin/omp") };
}

test("installer preserves zsh configuration and permissions, reinstalls without recursion, uninstalls only its own data", async () => {
  const f = await fixture("zsh");
  try {
    const zdir = join(f.home, "zsh config");
    await mkdir(zdir);
    f.env.ZDOTDIR = zdir;
    const rc = join(zdir, ".zshrc");
    await writeFile(rc, "# existing without newline", { mode: 0o640 });
    expect((await f.invoke(["install", "--bun", process.execPath])).code).toBe(0);
    const initial = await readFile(rc, "utf8");
    expect((await stat(rc)).mode & 0o777).toBe(0o640);
    expect(await Bun.file(join(f.home, ".bashrc")).exists()).toBe(false);
    f.env.PATH = `${join(f.home, ".local/share/omp-settings-zh/bin")}:${f.env.PATH}`;
    expect((await f.invoke(["install"])).code).toBe(0);
    expect(await readFile(rc, "utf8")).toBe(initial);
    const zsh = Bun.which("zsh");
    if (zsh) {
      const shell = Bun.spawn([zsh, "-lic", "command -v omp"], { env: f.env, stdout: "pipe", stderr: "pipe" });
      expect((await new Response(shell.stdout).text()).trim()).toBe(f.wrapper);
      expect(await shell.exited).toBe(0);
    }
    await writeFile(rc, initial + "# subsequently added\n");
    const unrelated = join(f.home, ".local/share/omp-settings-zh/keep.txt");
    await writeFile(unrelated, "keep");
    expect((await f.invoke(["uninstall"])).code).toBe(0);
    expect(await readFile(rc, "utf8")).toBe("# existing without newline\n# subsequently added\n");
    expect((await stat(rc)).mode & 0o777).toBe(0o640);
    expect(await readFile(unrelated, "utf8")).toBe("keep");
    expect(await Bun.file(f.wrapper).exists()).toBe(false);
    expect(await Bun.file(f.omp).exists()).toBe(true);
    expect((await f.invoke(["uninstall"])).code).toBe(0);
  } finally { await rm(f.home, { recursive: true, force: true }); }
});

test("Bash uses the existing login file instead of creating a shadowing bash_profile", async () => {
  for (const login of [".profile", ".bash_login", ".bash_profile"]) {
    const f = await fixture("bash");
    try {
      await writeFile(join(f.home, login), "# login\n");
      expect((await f.invoke(["install", "--omp", f.omp, "--bun", process.execPath])).code).toBe(0);
      expect((await readFile(join(f.home, login), "utf8")).includes("omp-settings-zh PATH")).toBe(true);
      if (login !== ".bash_profile") expect(await Bun.file(join(f.home, ".bash_profile")).exists()).toBe(false);
      expect(await Bun.file(join(f.home, ".zshrc")).exists()).toBe(false);
      const shell = Bun.spawn(["/bin/bash", "-lc", "command -v omp"], { env: f.env, stdout: "pipe", stderr: "pipe" });
      expect((await new Response(shell.stdout).text()).trim()).toBe(f.wrapper);
      expect(await shell.exited).toBe(0);
      expect((await f.invoke(["uninstall"])).code).toBe(0);
      expect(await readFile(join(f.home, login), "utf8")).toBe("# login\n");
    } finally { await rm(f.home, { recursive: true, force: true }); }
  }
});

test("shell fast paths preserve complete argv, exit status and standard streams without Bun", async () => {
  const f = await fixture("bash");
  try {
    const selectedBun = join(f.home, "bun-selected");
    await symlink(process.execPath, selectedBun);
    expect((await f.invoke(["install", "--bun", selectedBun])).code).toBe(0);
    await rm(selectedBun); // Fast paths must not even attempt to launch Bun.
    for (const args of [[], ["plugin", "stats", "a b"], ["--help", "stats"], ["stats", "--json"],
      ["stats", "-js"], ["stats", "-sj"], ["stats", "--summary"], ["stats", "-h"], ["stats", "--json=false"],
      ["stats", "--host", "127.0.0.1", "-j", "a b", "'quoted'"]]) {
      const proc = Bun.spawn([f.wrapper, ...args], { env: f.env, stdin: new TextEncoder().encode("stdin-data\n"), stdout: "pipe", stderr: "pipe" });
      const [code, out, err] = await Promise.all([proc.exited, new Response(proc.stdout).text(), new Response(proc.stderr).text()]);
      expect(code).toBe(23);
      expect(out).toBe((args.length ? args : [""]).map(arg => `<${arg}>\n`).join("") + "stdin-data\n");
      expect(err).toBe("original-stderr\n");
    }
  } finally { await rm(f.home, { recursive: true, force: true }); }
});

test("modified managed blocks and foreign wrappers are refused before any other write", async () => {
  const f = await fixture("zsh");
  try {
    expect((await f.invoke(["install", "--bun", process.execPath])).code).toBe(0);
    const rc = join(f.home, ".zshrc");
    await writeFile(rc, (await readFile(rc, "utf8")).replace("export PATH=", "export CHANGED="));
    const wrapper = await readFile(f.wrapper, "utf8");
    for (const command of ["install", "uninstall"]) expect((await f.invoke([command])).code).toBe(1);
    expect(await readFile(f.wrapper, "utf8")).toBe(wrapper);
    await writeFile(f.wrapper, "#!/bin/sh\n# user file\n");
    expect((await f.invoke(["install"])).code).toBe(1);
    expect((await f.invoke(["uninstall"])).code).toBe(1);
    expect(await readFile(f.wrapper, "utf8")).toBe("#!/bin/sh\n# user file\n");
  } finally { await rm(f.home, { recursive: true, force: true }); }
});

test("installer retains stable logical package paths in default and named Profiles", async () => {
  for (const profile of [undefined, "maintenance-profile"]) {
    const f = await fixture("bash");
    try {
      const env = f.env as NodeJS.ProcessEnv;
      delete env.PI_PROFILE;
      env.OMP_PROFILE = profile ?? "";
      const root = join(f.home, ".omp", ...(profile ? ["profiles", profile] : []), "plugins/node_modules");
      const logical = join(root, "omp-settings-zh");
      await mkdir(root, { recursive: true });
      await symlink(resolve("."), logical);
      expect((await f.invoke(["install", "--bun", process.execPath], join(logical, "src/cli/install.ts"))).code).toBe(0);
      const state = JSON.parse(await readFile(join(f.home, ".local/share/omp-settings-zh/state.json"), "utf8"));
      expect(state.main).toBe(join(logical, "src/cli/main.ts"));
    } finally { await rm(f.home, { recursive: true, force: true }); }
  }
});

test("lifecycle API can be imported from another entry and returns status without emitting output", async () => {
  const f = await fixture("bash");
  try {
    const script = `import { installLauncher, uninstallLauncher } from ${JSON.stringify(installer)};
      const status = await installLauncher({omp:${JSON.stringify(f.omp)},bun:process.execPath});
      const again = await installLauncher();
      const removed = await uninstallLauncher();
      console.log(JSON.stringify({status,again,removed}));`;
    const result = await f.invoke([script], "-e");
    expect(result.code).toBe(0);
    const statuses = JSON.parse(result.stdout);
    expect(statuses.status).toContain("已安装");
    expect(statuses.again).toContain("已安装");
    expect(statuses.removed).toContain("已卸载");
    expect(await Bun.file(f.wrapper).exists()).toBe(false);
  } finally { await rm(f.home, { recursive: true, force: true }); }
});

test("GUI extension loads use the real account when shell and account environment names are absent", async () => {
  const f = await fixture("zsh");
  try {
    const env: NodeJS.ProcessEnv = { ...f.env };
    delete env.SHELL;
    delete env.USER;
    delete env.LOGNAME;
    const child = Bun.spawn([process.execPath, installer, "install", "--bun", process.execPath], { env, stdout: "pipe", stderr: "pipe" });
    const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
    if (code !== 0) throw new Error(stdout + stderr);
    expect(await Bun.file(f.wrapper).exists()).toBe(true);
    const state = JSON.parse(await readFile(join(f.home, ".local/share/omp-settings-zh/state.json"), "utf8"));
    const loginShell = state.configs.some((config: {path: string}) => config.path.endsWith("/.zshrc")) ? "/bin/zsh" : "/bin/bash";
    const shell = Bun.spawn([loginShell, "-lc", "command -v omp"], { env, stdout: "pipe", stderr: "pipe" });
    const [shellCode, found, shellError] = await Promise.all([shell.exited, new Response(shell.stdout).text(), new Response(shell.stderr).text()]);
    if (shellCode !== 0) throw new Error(shellError);
    expect(found.trim()).toBe(f.wrapper);
    expect(state.configs.every((config: {path: string}) => config.path.startsWith(f.home + "/"))).toBe(true);
    expect((await f.invoke(["uninstall"])).code).toBe(0);
    expect(await Bun.file(f.wrapper).exists()).toBe(false);
  } finally { await rm(f.home, { recursive: true, force: true }); }
});

test("official updates replace the selected official binary without replacing the PATH launcher", async () => {
  const f = await fixture("zsh");
  try {
    await writeFile(f.omp, "#!/bin/sh\nif [ \"$1\" = update ]; then\n  target=$(command -v omp)\n  printf \"updated-official-binary\\n\" > \"$target\"\n  printf \"%s\\n\" \"$target\"\nfi\n", { mode: 0o755 });
    expect((await f.invoke(["install", "--bun", process.execPath])).code).toBe(0);
    const launcher = await readFile(f.wrapper, "utf8");
    const child = Bun.spawn([f.wrapper, "update"], {
      env: { ...f.env, PATH: `${join(f.home, ".local/share/omp-settings-zh/bin")}:${f.env.PATH}` },
      stdout: "pipe", stderr: "pipe",
    });
    const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
    if (code !== 0) throw new Error(stderr);
    expect(stdout.trim()).toBe(f.omp);
    expect(await readFile(f.omp, "utf8")).toBe("updated-official-binary\n");
    expect(await readFile(f.wrapper, "utf8")).toBe(launcher);
    expect((await f.invoke(["uninstall"])).code).toBe(0);
  } finally { await rm(f.home, { recursive: true, force: true }); }
});


test("native uninstall dry-run retains launcher files and bypasses destructive ownership preflight", async () => {
  const f = await fixture("zsh");
  try {
    await writeFile(f.omp, '#!/bin/sh\nprintf "<%s>\\n" "$@"\nexit 0\n', { mode: 0o755 });
    expect((await f.invoke(["install", "--bun", process.execPath])).code).toBe(0);
    const statePath = join(f.home, ".local/share/omp-settings-zh/state.json");
    const state = await readFile(statePath, "utf8");
    const wrapper = await readFile(f.wrapper, "utf8");
    const invokeLauncher = async (args: string[]) => {
      const child = Bun.spawn([f.wrapper, ...args], { env: f.env, stdout: "pipe", stderr: "pipe" });
      const [code, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
      return { code, stdout, stderr };
    };
    const rc = join(f.home, ".zshrc");
    const originalRc = await readFile(rc, "utf8");
    const changedRc = originalRc.replace("export PATH=", "export PATH=user-change:");
    await writeFile(rc, changedRc);
    for (const flag of ["--dry-run", "--help", "-h"]) {
      const result = await invokeLauncher(["plugin", "uninstall", "--scope", "user", "omp-settings-zh", flag]);
      expect(result.code).toBe(0);
      expect(result.stdout).toContain(`<${flag}>`);
      expect(await readFile(statePath, "utf8")).toBe(state);
      expect(await readFile(f.wrapper, "utf8")).toBe(wrapper);
      expect(await readFile(rc, "utf8")).toBe(changedRc);
    }
    expect((await invokeLauncher(["plugin", "uninstall", "omp-settings-zh"])).code).toBe(1);
    await writeFile(rc, originalRc);
    expect((await invokeLauncher(["plugin", "uninstall", "--scope=user", "omp-settings-zh"])).code).toBe(0);
    expect(await Bun.file(f.wrapper).exists()).toBe(false);
    expect(await Bun.file(statePath).exists()).toBe(false);
  } finally { await rm(f.home, { recursive: true, force: true }); }
});
