export {};

let networkCalls = 0;
const originalFetch = globalThis.fetch;
globalThis.fetch = new Proxy(originalFetch, {
  apply() {
    networkCalls += 1;
    throw new Error("translation initialization attempted a network request");
  },
});

try {
  const [{ applyTranslations }, { getHostMetadata }, { zhCN }, { createSettingsHost }, { getAllSettingDefs }] = await Promise.all([
    import("../src/apply-translations"),
    import("../src/host-adapter"),
    import("../src/translations/zh-CN"),
    import("@oh-my-pi/pi-coding-agent/config/settings-ui"),
    import("@oh-my-pi/pi-tui/overlays/settings-defs"),
  ]);
  const host = await getHostMetadata();
  const originalUi = structuredClone(Object.fromEntries(Object.entries(host.schema).map(([path, def]) => [path, def?.ui])));
  const behaviorSnapshot = Object.fromEntries(Object.entries(host.schema).map(([path, def]) => [path, { defaultValue: def?.default, values: def?.values }]));
  let mutationCount = 0;
  for (let cycle = 0; cycle < 3; cycle += 1) {
    const result = applyTranslations(host, zhCN);
    if (result.status !== "applied") throw new Error(result.reason);
    mutationCount = result.mutationCount;
    const panel = getAllSettingDefs(createSettingsHost().entries);
    if (panel.find(def => def.path === "autoResume")?.label !== "自动恢复") {
      throw new Error("new native panel did not use translated host metadata");
    }
    for (const [path, snapshot] of Object.entries(behaviorSnapshot)) {
      const def = host.schema[path];
      if (!def || !Object.is(def.default, snapshot.defaultValue) || !Object.is(def.values, snapshot.values)) {
        throw new Error("setting behavior metadata changed: " + path);
      }
    }
    const errors = result.restore();
    if (errors.length > 0) throw new Error(errors.join("; "));
    const restoredUi = Object.fromEntries(Object.entries(host.schema).map(([path, def]) => [path, def?.ui]));
    if (!Bun.deepEquals(restoredUi, originalUi)) throw new Error("original UI was not restored");
    if (getAllSettingDefs(createSettingsHost().entries).find(def => def.path === "autoResume")?.label !== "Auto Resume") {
      throw new Error("new native panel did not return to English");
    }
  }
  if (networkCalls !== 0) throw new Error("translation initialization attempted a network request");
  console.log("OMP " + host.version + " 冒烟通过：" + mutationCount + " 项显示元数据变更，3 次中英文切换与恢复，0 次网络请求");
} finally {
  globalThis.fetch = originalFetch;
}
