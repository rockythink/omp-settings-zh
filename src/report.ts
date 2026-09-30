import { createHash } from "node:crypto";
import type { HostMetadata, HostOption, HostUiMetadata } from "./compatibility";
import type { LocalePack } from "./translations/types";
import { getSettingTranslation } from "./translations/resolve";

export interface OptionMismatch {
  readonly path: string;
  readonly missingValues: readonly string[];
  readonly staleValues: readonly string[];
}


export interface CoverageReport {
  readonly totalUiSettings: number;
  readonly translatedSettings: number;
  readonly completeSettings: number;
  readonly partialSettings: number;
  readonly untranslatedPaths: readonly string[];
  readonly partialPaths: readonly string[];
  readonly stalePaths: readonly string[];
  readonly optionMismatches: readonly OptionMismatch[];
  readonly sourceHashMismatches: readonly string[];
}

function normalizeOptions(options: HostUiMetadata["options"]): Array<{
  value: string;
  label: string;
  description: string | null;
}> | null {
  if (!Array.isArray(options)) return null;
  return options.map((option) => ({
    value: option.value,
    label: option.label,
    description: option.description ?? null,
  }));
}

export function computeSourceHash(ui: HostUiMetadata): string {
  const normalized = {
    tab: ui.tab,
    group: ui.group,
    label: ui.label,
    description: ui.description,
    warning: ui.warning ?? null,
    options: normalizeOptions(ui.options),
  };
  return createHash("sha256").update(JSON.stringify(normalized)).digest("hex");
}

function hasCompleteOptionTranslation(
  sourceOption: HostOption,
  translatedOption: { readonly label?: string; readonly description?: string } | undefined,
): boolean {
  if (!translatedOption?.label) return false;
  return sourceOption.description === undefined || Boolean(translatedOption.description);
}

export function buildCoverageReport(host: HostMetadata, locale: LocalePack): CoverageReport {
  const untranslatedPaths: string[] = [];
  const partialPaths: string[] = [];
  const optionMismatches: OptionMismatch[] = [];
  const sourceHashMismatches: string[] = [];
  let translatedSettings = 0;
  let completeSettings = 0;
  let totalUiSettings = 0;


  for (const [path, definition] of Object.entries(host.schema)) {
    const ui = definition?.ui;
    if (!ui) continue;
    totalUiSettings += 1;

    const translation = getSettingTranslation(locale, path, host.platform);
    if (!translation) {
      untranslatedPaths.push(path);
      continue;
    }
    translatedSettings += 1;

    let complete =
      Boolean(translation.label) &&
      Boolean(translation.description) &&
      (ui.warning === undefined ? translation.warning === undefined : Boolean(translation.warning));

    const currentHash = computeSourceHash(ui);
    if (translation.sourceHash !== currentHash) {
      sourceHashMismatches.push(path);
      complete = false;
    }

    const sourceOptions = Array.isArray(ui.options) ? ui.options : [];
    const translatedOptions = translation.options ?? {};
    const sourceValues = new Set(sourceOptions.map((option) => option.value));
    const missingValues = sourceOptions
      .filter((option) => !hasCompleteOptionTranslation(option, translatedOptions[option.value]))
      .map((option) => option.value);
    const staleValues = Object.keys(translatedOptions).filter((value) => !sourceValues.has(value));
    if (missingValues.length > 0 || staleValues.length > 0) {
      optionMismatches.push({ path, missingValues, staleValues });
      complete = false;
    }

    if (complete) completeSettings += 1;
    else partialPaths.push(path);
  }

  const stalePaths = Object.keys(locale.settings).filter((path) => !host.schema[path]?.ui);
  return {
    totalUiSettings,
    translatedSettings,
    completeSettings,
    partialSettings: partialPaths.length,
    untranslatedPaths,
    partialPaths,
    stalePaths,
    optionMismatches,
    sourceHashMismatches,
  };
}
