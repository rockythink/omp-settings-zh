export interface OptionTranslation {
  readonly label?: string;
  readonly description?: string;
}

export interface SettingTranslation {
  /** SHA-256 of the normalized upstream UI metadata reviewed for this translation. */
  readonly sourceHash: string;
  readonly label?: string;
  readonly description?: string;
  /** Official English template used to capture live key hints from its original getter. */
  readonly descriptionSource?: string;
  readonly warning?: string;
  readonly options?: Readonly<Record<string, OptionTranslation>>;
}

export interface LocalePack {
  readonly locale: "zh-CN";
  readonly sourceOmpVersion: string;
  readonly settings: Readonly<Record<string, SettingTranslation>>;
}
