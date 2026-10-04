/// <reference lib="dom" />

/**
 * Translation writes happen with the observer disconnected. Observed writes
 * belong to React/another owner even if they equal our previous translation.
 * Invalidate the entire batch before rendering, including repeated attributes.
 */
export function invalidateExternalWrites<TextState, AttributeState>(
	records: readonly Pick<MutationRecord, "type" | "target" | "attributeName">[],
	texts: WeakMap<Text, TextState>,
	attributes: WeakMap<Element, Map<string, AttributeState>>,
): void {
	for (const record of records) {
		if (record.type === "characterData") texts.delete(record.target as Text);
		else if (record.type === "attributes" && record.attributeName) {
			attributes.get(record.target as Element)?.delete(record.attributeName);
		}
	}
}
