import { expect, test } from "bun:test";
import { statsPatterns, statsSpotlightAttributes } from "../src/stats/translations";

test("dynamic templates are anchored and do not absorb user or backend text", () => {
	const patterns = statsPatterns.map(([source]) => new RegExp(source));
	for (const text of [
		"Showing the latest 100 failures in the last 7 days; older ones are not loaded.",
		"12 of 48", "elapsed 1m 3s", "42 in flight", "5 messages", "1,204 results",
	]) expect(patterns.some(pattern => pattern.test(text))).toBe(true);
	for (const text of [
		"Showing the latest 100 failures in My private project; older ones are not loaded.",
		"Failed: secret API key", "model tool · error", "elapsed user payload",
		"5 requests to secret-model", "with private-provider", "Other (private account)",
		"42 in flight extra", "prefix 5 messages", "5 messages suffix", "5 results for secret-model",
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

test("Spotlight templates retain formatter values and reject arbitrary suffixes", () => {
	const render = (input: string) => {
		for (const [source, replacement] of statsPatterns) {
			if (new RegExp(source).test(input)) return input.replace(new RegExp(source), replacement);
		}
		return input;
	};
	expect(render("−12.5K gross")).toBe("总节省 −12.5K");
	expect(render("Saved 1.2K tokens ($0.0025)")).toBe("节省 1.2K Token（$0.0025）");
	expect(render("Fetched back after 12% of cuts (10%–15%)")).toBe("12% 的精简后发生回取 (10%–15%)");
	expect(render(" · 2h 05m after the cut".trim())).toBe("· 精简后 2h 05m");
	expect(render("Show 3 more tools")).toBe("显示另外 3 个工具");
	for (const input of ["Saved private tokens ($0.10)", "Show Requests more tools", "12 calls later private", "Secret: 4 cuts"]) {
		expect(render(input)).toBe(input);
	}
});

test("Spotlight attribute-only templates preserve opaque tool and step labels", () => {
	const render = (input: string) => {
		for (const [source, replacement] of statsSpotlightAttributes) {
			if (new RegExp(source).test(input)) return input.replace(new RegExp(source), replacement);
		}
		return input;
	};
	expect(render("Requests: 12 cuts")).toBe("Requests：12 次精简");
	expect(render("Models · Private steps · 1k–4k saved: 7 cuts")).toBe("Models · Private steps · 节省 1k–4k：7 次精简");
	expect(render("4 more tools: Requests, Models")).toBe("另外 4 个工具：Requests, Models");
	for (const input of ["Requests", "Private steps", "Secret: more cuts", "foo\nbar: 7 cuts"]) {
		expect(render(input)).toBe(input);
	}
});
