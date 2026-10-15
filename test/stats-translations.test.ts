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

test("savings templates retain signed percentages and reject surrounding data", () => {
	for (const amount of ["23.1%", "-2788.9%", "-0.1%"]) {
		const input = `${amount} saved`;
		const matches = statsPatterns.filter(([source]) => new RegExp(source).test(input));
		expect(matches).toHaveLength(1);
		const [source, replacement] = matches[0]!;
		const rendered = input.replace(new RegExp(source), replacement);
		expect(rendered.match(/-?\d[\d,.]*%/g)).toEqual([amount]);
		expect(rendered).not.toBe(input);
	}
	for (const text of ["project -2788.9% saved", "-2788.9% saved for Requests"]) {
		expect(statsPatterns.some(([source]) => new RegExp(source).test(text))).toBe(false);
	}
});
