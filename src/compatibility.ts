export interface HostOption {
  value: string;
  label: string;
  description?: string;
}

export interface HostUiMetadata {
  tab: string;
  group?: string;
  label: string;
  description: string;
  warning?: string;
  options?: HostOption[] | "runtime";
}

export interface HostSettingDefinition {
  type: string;
  default: unknown;
  values?: readonly string[];
  ui?: HostUiMetadata;
  [key: string]: unknown;
}

export interface HostMetadata {
  version: string;
  platform: string;
  schema: Record<string, HostSettingDefinition | undefined>;
}

export type CompatibilityResult = { compatible: true } | { compatible: false; reason: string };

export function checkHostCompatibility(host: HostMetadata): CompatibilityResult {
  const majorVersion = Number.parseInt(host.version.split(".", 1)[0] ?? "", 10);
  if (majorVersion !== 18) {
    return { compatible: false, reason: "不支持 OMP " + host.version + "；当前适配目标为 OMP 18.8.4" };
  }
  if (typeof host.schema !== "object" || host.schema === null || Array.isArray(host.schema)) {
    return { compatible: false, reason: "设置注册表结构无效" };
  }
  for (const [path, definition] of Object.entries(host.schema)) {
    if (typeof definition !== "object" || definition === null || Array.isArray(definition) || typeof definition.type !== "string" || !("default" in definition)) {
      return { compatible: false, reason: "设置 " + path + " 的定义结构无效" };
    }
    const ui = definition.ui;
    if (!ui) continue;
    if (typeof ui !== "object" || Array.isArray(ui) || typeof ui.tab !== "string" || typeof ui.label !== "string" || typeof ui.description !== "string") {
      return { compatible: false, reason: "设置 " + path + " 的 UI 元数据结构无效" };
    }
    if (ui.group !== undefined && typeof ui.group !== "string") {
      return { compatible: false, reason: "设置 " + path + " 的分组不是字符串" };
    }
    if (ui.options !== undefined && ui.options !== "runtime" && (
      !Array.isArray(ui.options) || !ui.options.every(option => typeof option === "object" && option !== null && !Array.isArray(option) && typeof option.value === "string" && typeof option.label === "string" && (option.description === undefined || typeof option.description === "string"))
    )) {
      return { compatible: false, reason: "设置 " + path + " 的选项结构无效" };
    }
  }
  return { compatible: true };
}
