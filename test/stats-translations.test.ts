import { expect, test } from "bun:test";
import { statsPatterns, statsZh } from "../src/stats/translations";

test("official split JSX copy has exact translations without joining adjacent data nodes", () => {
	for (const [source, translation] of [
		["failures in", "次失败，时间范围"],
		["; older ones are not loaded.", "；更早的记录尚未加载。"],
		["elapsed", "已用时"],
		["of", "/"],
		["Timeline overview brush", "时间线概览范围选择器"],
		["tool · error", "工具 · 错误"],
		["error", "错误"],
	]) expect(statsZh[source!]).toBe(translation!);
});

test("dynamic templates are anchored and do not absorb user or backend text", () => {
	const patterns = statsPatterns.map(([source]) => new RegExp(source));
	for (const [source] of statsPatterns) {
		expect(source.startsWith("^")).toBe(true);
		expect(source.endsWith("$")).toBe(true);
	}
	for (const text of [
		"Showing the latest 100 failures in the last 7 days; older ones are not loaded.",
		"12 of 48", "elapsed 1m 3s", "42 in flight", "5 messages",
	]) expect(patterns.some(pattern => pattern.test(text))).toBe(true);
	for (const text of [
		"Showing the latest 100 failures in My private project; older ones are not loaded.",
		"Failed: secret API key", "model tool · error", "elapsed user payload",
		"5 requests to secret-model", "with private-provider", "Other (private account)",
		"42 in flight extra", "prefix 5 messages", "5 messages suffix",
	]) expect(patterns.some(pattern => pattern.test(text))).toBe(false);
});
