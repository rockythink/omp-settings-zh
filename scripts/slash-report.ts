import { staticText } from "../src/slash-autocomplete";

type Translation = Parameters<typeof staticText>[1];
interface CommandSource {
  readonly name: string;
  readonly aliases?: readonly string[];
  readonly description?: string;
}

/** Development-only contract report; never reads session state or executes a command. */
export function buildSlashCommandReport(sources: readonly CommandSource[], locale: readonly Translation[]) {
  const untranslatedCommands: string[] = [];
  const incompleteCommands: string[] = [];
  const staleCommands: string[] = [];
  const sourceMismatches: string[] = [];
  const aliasMismatches: { command: string; expected: readonly string[]; actual: readonly string[] }[] = [];
  const duplicateIdentifiers: string[] = [];
  const sourceNames = new Set<string>();
  const entries = new Map<string, Translation>();
  for (const [scope, rows] of [["source", sources], ["translation", locale]] as const) {
    const identifiers = new Set<string>();
    for (const row of rows) {
      for (const id of [row.name, ...(row.aliases ?? [])]) {
        if (identifiers.has(id)) duplicateIdentifiers.push(scope + ":" + id);
        identifiers.add(id);
      }
    }
  }
  for (const entry of locale) entries.set(entry.name, entry);
  let completeCommands = 0;
  let totalIdentifiers = 0;
  for (const source of sources) {
    sourceNames.add(source.name);
    totalIdentifiers += 1 + (source.aliases?.length ?? 0);
    const entry = entries.get(source.name);
    if (!entry) { untranslatedCommands.push(source.name); continue; }
    let complete = true;
    if (!entry.zh.trim() || entry.zh === entry.en) {
      incompleteCommands.push(source.name);
      complete = false;
    }
    // Registry drift permits dynamic key hints only for switch/loop, not runtime effort glyphs.
    // Reject synthetic argument prefixes even when the runtime display matcher accepts them.
    if (source.name === "switch" || source.name === "loop" ? staticText(source.description, entry)?.prefix !== "" : source.description !== entry.en) {
      sourceMismatches.push(source.name);
      complete = false;
    }
    const expected = source.aliases ?? [];
    const actual = entry.aliases ?? [];
    if (expected.length !== actual.length || expected.some((alias, index) => alias !== actual[index])) {
      aliasMismatches.push({ command: source.name, expected, actual });
      complete = false;
    }
    if (complete) completeCommands++;
  }
  for (const entry of locale) if (!sourceNames.has(entry.name)) staleCommands.push(entry.name);
  return {
    totalCommands: sources.length, totalIdentifiers, completeCommands,
    untranslatedCommands, incompleteCommands, staleCommands, sourceMismatches, aliasMismatches, duplicateIdentifiers,
  };
}

export function hasSlashCommandDrift(report: ReturnType<typeof buildSlashCommandReport>): boolean {
  return report.completeCommands !== report.totalCommands || report.staleCommands.length > 0 || report.duplicateIdentifiers.length > 0;
}
