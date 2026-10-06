import { expect, test } from "bun:test";
import { statsPatterns } from "../src/stats/translations";

test("dynamic templates are anchored and do not absorb user or backend text", () => {
	const patterns = statsPatterns.map(([source]) => new RegExp(source));
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
