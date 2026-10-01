import type { HostMetadata, HostSettingDefinition } from "./compatibility";

/** Only import surfaces shared by OMP's compiled host, inside the caller's failure boundary. */
export async function getHostMetadata(): Promise<HostMetadata> {
  const [{ VERSION }, { orderedSettings }] = await Promise.all([
    import("@oh-my-pi/pi-utils"),
    import("@oh-my-pi/pi-coding-agent/config/all-settings"),
  ]);
  const schema: HostMetadata["schema"] = {};
  for (const setting of orderedSettings()) {
    if (Object.hasOwn(schema, setting.id)) throw new Error("设置路径重复：" + setting.id);
    // Retain live registry definitions; the native panel builds fresh rows on each open.
    schema[setting.id] = setting.definition as unknown as HostSettingDefinition;
  }
  return { version: VERSION, platform: process.platform, schema };
}
