import type { LocalePack, SettingTranslationFields } from "./types";

export function getSettingTranslation(locale: LocalePack, path: string, platform: string): SettingTranslationFields | undefined {
  const translation = locale.settings[path];
  return translation?.byPlatform?.[platform] ?? translation;
}
