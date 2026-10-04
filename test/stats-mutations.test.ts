import { expect, test } from "bun:test";
import { invalidateExternalWrites } from "../src/stats/mutations";

test("external writes invalidate provenance even when React data equals the previous Chinese display", () => {
	const text = { data: "请求" } as Text;
	const element = {} as Element;
	const texts = new WeakMap<Text, { original: string; rendered: string }>([
		[text, { original: "Requests", rendered: "请求" }],
	]);
	const states = new Map([
		["title", { original: "Requests", rendered: "请求" }],
		["aria-label", { original: "Close", rendered: "关闭" }],
	]);
	const attributes = new WeakMap([[element, states]]);
	invalidateExternalWrites([
		{ type: "characterData", target: text, attributeName: null },
		{ type: "attributes", target: element, attributeName: "title" },
		{ type: "attributes", target: element, attributeName: "title" },
	], texts, attributes);
	expect(texts.has(text)).toBe(false);
	expect(states.has("title")).toBe(false);
	expect(states.get("aria-label")).toEqual({ original: "Close", rendered: "关闭" });
	expect(text.data).toBe("请求");
});

test("moving nodes or changing display eligibility retains unmodified provenance for restoration", () => {
	const text = {} as Text;
	const element = {} as Element;
	const state = { original: "Requests", rendered: "请求" };
	const texts = new WeakMap([[text, state]]);
	const attributes = new WeakMap([[element, new Map([["title", state]])]]);
	invalidateExternalWrites([
		{ type: "childList", target: element, attributeName: null },
		{ type: "attributes", target: element, attributeName: "class" },
		{ type: "attributes", target: element, attributeName: "data-active" },
	], texts, attributes);
	expect(texts.get(text)).toBe(state);
	expect(attributes.get(element)?.get("title")).toBe(state);
});
