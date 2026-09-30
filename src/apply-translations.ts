import { checkHostCompatibility, type HostMetadata, type HostOption } from "./compatibility";
import type { LocalePack, OptionTranslation, SettingTranslation } from "./translations/types";
import { getSettingTranslation } from "./translations/resolve";

interface Mutation {
  readonly target: object;
  readonly key: string;
  readonly previous: unknown;
  readonly originalDescriptor: PropertyDescriptor | undefined;
  readonly getter: (() => string) | undefined;
  readonly value: unknown;
  readonly location: string;
}

type MutationPlan =
  | { readonly mutations: readonly Mutation[] }
  | { readonly conflict: string };

export type ApplyTranslationsResult =
  | { status: "applied"; mutationCount: number; restore: () => readonly string[] }
  | { status: "skipped"; reason: string }
  | { status: "rolled-back"; reason: string; rollbackErrors: readonly string[] };

function canWrite(mutation: Mutation): boolean {
  const descriptor = mutation.originalDescriptor;
  if (!descriptor) return Object.isExtensible(mutation.target);
  if (mutation.getter || !("value" in descriptor) && !descriptor.set) return descriptor.configurable === true;
  return "value" in descriptor ? descriptor.writable === true : typeof descriptor.set === "function";
}

function queueMutation(
  mutations: Mutation[],
  target: object,
  key: string,
  value: unknown,
  location: string,
  getter?: () => string,
): void {
  const previous = Reflect.get(target, key);
  if (!getter && Object.is(previous, value)) return;
  mutations.push({ target, key, previous, value, location, originalDescriptor: Object.getOwnPropertyDescriptor(target, key), getter });
}

function queueTextFields(
  mutations: Mutation[],
  target: object,
  translation: SettingTranslation | OptionTranslation,
  location: string,
): void {
  if (translation.label !== undefined) {
    queueMutation(mutations, target, "label", translation.label, `${location}.label`);
  }
  if (translation.description !== undefined) {
    const source = "descriptionSource" in translation ? translation.descriptionSource : undefined;
    const template = translation.description;
    const getter = source ? localizedDescriptionGetter(target, source, template) : undefined;
    queueMutation(mutations, target, "description", getter ? getter() : template, `${location}.description`, getter);
  }
  if ("warning" in translation && translation.warning !== undefined) {
    queueMutation(mutations, target, "warning", translation.warning, `${location}.warning`);
  }
}

function queueOptions(
  mutations: Mutation[],
  options: readonly HostOption[] | undefined,
  translations: Readonly<Record<string, OptionTranslation>> | undefined,
  location: string,
): void {
  if (!options || !translations) return;
  for (const option of options) {
    const translation = translations[option.value];
    if (translation) queueTextFields(mutations, option, translation, `${location}.${option.value}`);
  }
}

function buildMutationPlan(host: HostMetadata, locale: LocalePack): MutationPlan {
  const pendingMutations: Mutation[] = [];


  for (const path of Object.keys(locale.settings)) {
    const translation = getSettingTranslation(locale, path, host.platform);
    if (!translation) continue;
    const schemaDefinition = host.schema[path];
    const ui = schemaDefinition?.ui;
    if (!ui) continue;

    queueTextFields(pendingMutations, ui, translation, `schema.${path}.ui`);
    if (Array.isArray(ui.options)) {
      queueOptions(pendingMutations, ui.options, translation.options, `schema.${path}.ui.options`);
    }

  }

  const mutations: Mutation[] = [];
  const mutationByTarget = new WeakMap<object, Map<string, Mutation>>();
  for (const mutation of pendingMutations) {
    let fields = mutationByTarget.get(mutation.target);
    if (!fields) {
      fields = new Map();
      mutationByTarget.set(mutation.target, fields);
    }
    const existing = fields.get(mutation.key);
    if (existing) {
      if (!Object.is(existing.value, mutation.value)) {
        return {
          conflict: `共享宿主元数据存在冲突译文：${existing.location} 与 ${mutation.location}`,
        };
      }
      continue;
    }
    fields.set(mutation.key, mutation);
    mutations.push(mutation);
  }
  return { mutations };
}

export function applyTranslations(host: HostMetadata, locale: LocalePack): ApplyTranslationsResult {
  const compatibility = checkHostCompatibility(host);
  if (!compatibility.compatible) return { status: "skipped", reason: compatibility.reason };
  if (locale.locale !== "zh-CN") {
    return { status: "skipped", reason: `不支持 Locale Pack：${locale.locale as string}` };
  }

  const plan = buildMutationPlan(host, locale);
  if ("conflict" in plan) return { status: "skipped", reason: plan.conflict };
  const mutations = plan.mutations;
  const unwritable = mutations.find((mutation) => !canWrite(mutation));
  if (unwritable) {
    return { status: "skipped", reason: `宿主元数据不可写：${unwritable.location}` };
  }

  let attemptedIndex = -1;
  try {
    for (let index = 0; index < mutations.length; index += 1) {
      attemptedIndex = index;
      const mutation = mutations[index]!;
      if (!writeMutation(mutation)) {
        throw new Error(`写入被拒绝：${mutation.location}`);
      }
    }
    for (const mutation of mutations) {
      if (!isApplied(mutation)) {
        throw new Error(`应用后校验失败：${mutation.location}`);
      }
    }
    let restored = false;
    return { status: "applied", mutationCount: mutations.length, restore: () => {
      if (restored) return [];
      const errors = restoreMutations(mutations, mutations.length - 1, true);
      restored = errors.length === 0;
      return errors;
    } };
  } catch (error) {
    const rollbackErrors = restoreMutations(mutations, attemptedIndex, false);
    return {
      status: "rolled-back",
      reason: error instanceof Error ? error.message : String(error),
      rollbackErrors,
    };
  }
}

function restoreMutations(mutations: readonly Mutation[], lastIndex: number, ownedOnly: boolean): string[] {
  const errors: string[] = [];
  for (let index = lastIndex; index >= 0; index -= 1) {
    const mutation = mutations[index]!;
    try {
      // Do not overwrite a later edit made by another extension.
      if (ownedOnly && !isApplied(mutation)) continue;
      const descriptor = mutation.originalDescriptor;
      const redefined = mutation.getter || descriptor && !("value" in descriptor) && !descriptor.set;
      const restored = redefined && descriptor
        ? Reflect.defineProperty(mutation.target, mutation.key, descriptor)
        : descriptor ? Reflect.set(mutation.target, mutation.key, mutation.previous)
        : Reflect.deleteProperty(mutation.target, mutation.key);
      if (!restored || !descriptor?.get && !Object.is(Reflect.get(mutation.target, mutation.key), mutation.previous)) {
        errors.push(`${mutation.location}：恢复被拒绝`);
      }
    } catch (error) {
      errors.push(`${mutation.location}：${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return errors;
}

function isApplied(mutation: Mutation): boolean {
  return mutation.getter
    ? Object.getOwnPropertyDescriptor(mutation.target, mutation.key)?.get === mutation.getter
    : Object.is(Reflect.get(mutation.target, mutation.key), mutation.value);
}

function writeMutation(mutation: Mutation): boolean {
  const descriptor = mutation.originalDescriptor;
  if (mutation.getter || descriptor && !("value" in descriptor) && !descriptor.set) {
    return Reflect.defineProperty(mutation.target, mutation.key, {
      configurable: descriptor?.configurable ?? true, enumerable: descriptor?.enumerable ?? true,
      ...(mutation.getter ? { get: mutation.getter } : { value: mutation.value, writable: true }),
    });
  }
  return Reflect.set(mutation.target, mutation.key, mutation.value);
}

function localizedDescriptionGetter(target: object, source: string, template: string): () => string {
  const original = Object.getOwnPropertyDescriptor(target, "description");
  const text = Reflect.get(target, "description") as string;
  const names = [...source.matchAll(/\{([a-zA-Z]+)\}/g)].map(match => match[1]!);
  const literals = source.split(/\{[a-zA-Z]+\}/g);
  return () => {
    const english = original?.get ? original.get.call(target) as string : text;
    if (!english.startsWith(literals[0]!)) return english;
    const hints: Record<string, string> = {};
    let offset = literals[0]!.length;
    for (let index = 0; index < names.length; index += 1) {
      const suffix = literals[index + 1]!;
      const end = suffix ? english.indexOf(suffix, offset) : english.length;
      if (end < offset) return english;
      hints[names[index]!] = english.slice(offset, end);
      offset = end + suffix.length;
    }
    // An upstream wording change is safer in English than with guessed key hints.
    if (offset !== english.length) return english;
    return template.replace(/\{([a-zA-Z]+)\}/g, (token, name: string) => hints[name] ?? token);
  };
}
