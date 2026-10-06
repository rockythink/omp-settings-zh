/// <reference lib="dom" />

import { statsPatterns, statsZh } from "./translations";
import { invalidateExternalWrites } from "./mutations";

// Served by the official Stats listener; follows the DOM as React renders.
(() => {
	const controlId = "omp-stats-language";
	const styleId = "omp-stats-language-style";
	const storageKey = "omp-settings-zh.stats.language";
	if (document.getElementById(styleId)) return;

	type Language = "zh" | "en";
	type DisplayState = { original: string; rendered: string };
	const texts = new WeakMap<Text, DisplayState>();
	const attributes = new WeakMap<Element, Map<string, DisplayState>>();
	const patterns = statsPatterns.map(([source, replacement]) => [new RegExp(source), replacement] as const);
	const dictionary: Readonly<Record<string, string>> = statsZh;
	const displayAttributes = ["aria-label", "title", "placeholder"] as const;
	let language: Language = "zh";
	try {
		if (localStorage.getItem(storageKey) === "en") language = "en";
	} catch {
		// Private browsing or denied storage still allows an in-page language choice.
	}

	// These classes carry original API/user data, even when it coincides with a UI label.
	const excluded = [
		`#${controlId}`, "script", "style", "pre", "code", "textarea", "[contenteditable]",
		".mono", ".cell-primary", ".cell-secondary", ".kv-value", ".code-block",
		".error-state-message", ".errors-signature", ".errors-filter", ".errors-message", ".errors-example",
		".request-drawer-error-text", ".drawer-title", ".drawer-subtitle",
		".traces-title", ".traces-row-label", ".traces-row-detail", ".traces-row-track",
		".traces-gutter-track", ".traces-gutter-model", ".traces-tooltip", ".providers-account",
		".projects-folder", ".tools-name", ".bar-list-label", ".chart-tooltip-title", ".chart-tooltip-value",
		".frustration-judge [role='alert']", ".frustration-judge p .tone-bad", ".modal-body > .tone-bad",
	].join(",");
	const fixedLabels = [
		".topbar-title", ".nav-heading", ".nav-row-label", ".page-title", ".page-description",
		".card-title", ".card-description", ".stat-label", ".section-label", ".kv-key",
		".empty-title", ".empty-hint", ".modal-title", ".request-drawer-error-label",
		".traces-gutter-lane", ".traces-legend-item", ".traces-kind",
	].join(",");
	const dataStatLabels: Readonly<Record<string, true>> = { "Most used": true, "Top model": true, "Affected models": true };
	const fixedChartCards: Readonly<Record<string, true>> = { Activity: true, "Token mix": true, "Savings over time": true, "Where it went": true };

	function sourceText(element: Element | null): string {
		if (!element) return "";
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
		let value = "";
		let node: Node | null;
		while ((node = walker.nextNode())) {
			const text = node as Text;
			const state = texts.get(text);
			value += state && text.data === state.rendered ? state.original : text.data;
		}
		return value.trim();
	}

	function cardTitle(element: Element): string {
		return sourceText(element.closest(".card")?.querySelector(":scope > .card-header .card-title") ?? null);
	}

	function statLabel(element: Element): string {
		return sourceText(element.closest(".stat")?.querySelector(":scope > .stat-label") ?? null);
	}

	function fixedChart(element: Element): boolean {
		if (element.closest(".providers-mix, .frustration-key")) return true;
		const title = cardTitle(element);
		if (Object.hasOwn(fixedChartCards, title)) return true;
		if (title !== "Daily estimate") return false;
		const active = element.closest(".card")?.querySelector(".card-actions .segmented-option[data-active='true']");
		return sourceText(active ?? null) === "By component";
	}

	function safeText(text: Text): boolean {
		const parent = text.parentElement;
		if (!parent) return false;
		const cell = parent.closest("td");
		if (cell) {
			const header = cell.closest("table")?.querySelectorAll("thead th")[cell.cellIndex];
			const column = sourceText(header ?? null);
			if (["When", "Started", "Last seen", "Last used"].includes(column)) return true;
			if (column === "Status" && parent.matches(".badge, .cell-primary")) return true;
		}
		// SpanDrawer puts its fixed kind badge inside the otherwise data-only subtitle.
		if (parent.matches(".drawer-subtitle > .row > .badge")) return true;
		if (parent.closest(excluded)) return false;
		// The trace page reuses PageHeader for a session title and cwd, not UI prose.
		if (parent.closest(".traces-view .page-title, .traces-view .page-description")) return false;
		if (parent.matches(fixedLabels) || parent.closest("th, .chart-empty")) return true;
		if (parent.matches("[role=dialog] > header .badge, .modal-body > p.muted")) return true;
		if (parent.matches("svg title") && fixedChart(parent)) return true;
		if (parent.closest(".stat-foot")) return !["Most used", "Affected models"].includes(statLabel(parent));
		if (parent.closest(".stat-value")) return ["Result text", "Call arguments", "Avg result per call", "Avg arguments per call", "Last failure"].includes(statLabel(parent));
		if (parent.matches(".btn")) return !parent.closest(".traces-row");
		if (parent.matches(".segmented-option")) return !parent.closest(".frustration-classes");
		if (parent.matches(".check, .traces-check, .live-chip > span, .sidebar-foot > span, .table-more > .micro")) return true;
		if (parent.matches("option")) {
			const option = parent as HTMLOptionElement;
			// Nonempty options are model/provider/project/tool identifiers from API data.
			return option.value === "" && option.index === 0;
		}
		if (parent.closest(".legend-item")) return fixedChart(parent);
		if (parent.matches(".chart-tooltip-label")) {
			if (parent.closest(".chart-tooltip-total")) return true;
			const title = cardTitle(parent);
			if (title === "Window utilization") {
				// Series labels are account names; only the official exhaustion annotation is UI.
				return parent.matches(".chart-tooltip-label.tone-bad") && sourceText(parent) === "Exhausted";
			}
			return fixedChart(parent) ||
				["Peak burn hours", "Frustration by model version"].includes(title);
		}
		if (parent.matches(".costs-component-row > span:not(.num), .card-footer, .card-footer > span")) return true;
		if (parent.matches(".row, .row > .num") && cardTitle(parent) === "Token mix") return true;
		if (parent.matches(".frustration-quote > .micro, .frustration-progress-head > .num, .frustration-progress-meta > span, .frustration-progress-meta > span > .num, .frustration-judge > p.muted, .frustration-judge > p.micro.dim, .modal-body > p.micro.dim")) return true;
		if (parent.matches(".card-title > .badge")) return true;
		if (parent.matches(".traces-row-meta > .tone-bad")) return true;
		if (parent.matches(".costs-components + p") && cardTitle(parent) === "Where it went") return true;
		return false;
	}

	function safeAttribute(element: Element, name: string): boolean {
		// Canvas pixels stay untouched; only its fixed accessibility instructions are DOM text.
		if (element.matches(".traces-canvas, .traces-minimap")) return name === "aria-label";
		if (element.closest(excluded)) return false;
		if (name === "placeholder") return element.matches(".search input, input.input");
		if (element.matches(".stat")) return !Object.hasOwn(dataStatLabels, statLabel(element));
		// In the error phase, the sync tooltip contains the original backend error.
		if (element.matches(".live-chip") && name === "title" && sourceText(element.querySelector("span:not(.dot)")) === "Sync failed") return false;
		if (element.matches(".legend-item, .share-bar-seg")) return fixedChart(element);
		if (element.matches(".segmented-option")) return !element.closest(".frustration-classes");
		return element.matches(".btn, .topbar-menu, .sidebar, .segmented, .check, .traces-check, th, select.input, .live-chip");
	}

	function translate(value: string): string {
		// Keep the exact whitespace around a React text fragment, and every captured value.
		const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(value);
		if (!match) return value;
		const leading = match[1] ?? "";
		const core = match[2] ?? "";
		const trailing = match[3] ?? "";
		if (!core) return value;
		if (Object.hasOwn(dictionary, core)) return leading + dictionary[core] + trailing;
		for (const [pattern, replacement] of patterns) {
			if (pattern.test(core)) return leading + core.replace(pattern, replacement) + trailing;
		}
		return value;
	}

	function processText(text: Text): void {
		const previous = texts.get(text);
		const current = text.data;
		const original = previous && current === previous.rendered ? previous.original : current;
		const rendered = language === "zh" && safeText(text) ? translate(original) : original;
		if (rendered === original) texts.delete(text);
		else texts.set(text, { original, rendered });
		if (current !== rendered) text.data = rendered;
	}

	function processAttribute(element: Element, name: string): void {
		const states = attributes.get(element);
		const previous = states?.get(name);
		const current = element.getAttribute(name);
		if (current === null) {
			states?.delete(name);
			return;
		}
		const original = previous && current === previous.rendered ? previous.original : current;
		const rendered = language === "zh" && safeAttribute(element, name) ? translate(original) : original;
		if (rendered === original) states?.delete(name);
		else {
			const next = states ?? new Map<string, DisplayState>();
			next.set(name, { original, rendered });
			attributes.set(element, next);
		}
		if (current !== rendered) element.setAttribute(name, rendered);
	}

	function processNode(node: Node): void {
		if (node.nodeType === Node.TEXT_NODE) processText(node as Text);
		else if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as Element;
			for (const name of displayAttributes) {
				if (element.hasAttribute(name) || attributes.get(element)?.has(name)) processAttribute(element, name);
			}
		}
	}

	function scan(root: Node): void {
		if (!root.isConnected) return;
		processNode(root);
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
		let node: Node | null;
		while ((node = walker.nextNode())) processNode(node);
	}

	const control = document.createElement("div");
	control.id = controlId;
	control.className = "segmented";
	control.setAttribute("role", "group");
	const buttons = ( [ ["zh", "中文"], ["en", "English"] ] as const).map(([value, label]) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "segmented-option";
		button.lang = value === "zh" ? "zh-CN" : "en";
		button.textContent = label;
		button.addEventListener("click", () => changeLanguage(value));
		control.append(button);
		return { value, button };
	});
	control.addEventListener("keydown", event => {
		if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
		event.preventDefault();
		event.stopPropagation();
		const next = event.key === "Home" ? buttons[0] : event.key === "End" ? buttons[1] : buttons.find(item => item.value !== language);
		if (next) {
			changeLanguage(next.value);
			next.button.focus();
		}
	});

	const style = document.createElement("style");
	style.id = styleId;
	style.textContent = `
#${controlId} { flex: none; }
#${controlId} .segmented-option[data-active="true"] { background: var(--raised); box-shadow: inset 0 0 0 1px var(--line-3); }
#${controlId} button:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
@media (max-width: 1100px) {
  :root[data-omp-stats-zh] { --topbar-h: 94px; }
  :root[data-omp-stats-zh] .topbar { flex-wrap: wrap; align-content: space-evenly; column-gap: 8px; row-gap: 0; }
  :root[data-omp-stats-zh] .topbar-brand { min-width: 0; }
  :root[data-omp-stats-zh] .topbar-actions { order: 2; flex-basis: 100%; min-width: 0; max-width: 100%; overflow-x: auto; }
  :root[data-omp-stats-zh] .topbar-actions > *, :root[data-omp-stats-zh] .topbar-actions .segmented { flex-shrink: 0; }
  :root[data-omp-stats-zh] .topbar-hide-narrow { display: none !important; }
}
`;

	function updateControl(): void {
		document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
		control.setAttribute("aria-label", language === "zh" ? "界面语言" : "Interface language");
		for (const { value, button } of buttons) {
			button.dataset.active = String(value === language);
			button.setAttribute("aria-pressed", String(value === language));
		}
	}

	function mountControl(): void {
		const header = document.querySelector("header.topbar");
		if (header && control.parentElement !== header) header.append(control);
	}

	const observerOptions: MutationObserverInit = {
		subtree: true, childList: true, characterData: true, attributes: true,
		attributeFilter: [...displayAttributes, "class", "data-active"],
	};
	const observer = new MutationObserver(records => {
		observer.disconnect();
		try {
			applyMutations(records);
			mountControl();
		} finally {
			observer.observe(document.body, observerOptions);
		}
	});

	function applyMutations(records: MutationRecord[]): void {
		invalidateExternalWrites(records, texts, attributes);
		const roots = new Set<Node>();
		for (const record of records) {
			const element = record.target.nodeType === Node.ELEMENT_NODE ? record.target as Element : record.target.parentElement;
			if (element?.closest(`#${controlId}`)) continue;
			if (record.type === "attributes" && record.attributeName && displayAttributes.includes(record.attributeName as typeof displayAttributes[number])) {
				processAttribute(record.target as Element, record.attributeName);
				continue;
			}
			if (record.type === "childList") {
				for (const node of record.addedNodes) roots.add(node);
				// React can replace a direct string with several fragments without changing its parent.
				for (const node of record.target.childNodes) if (node.nodeType === Node.TEXT_NODE) roots.add(node);
			} else roots.add(record.target);
			// A reused stat label or chart mode changes which adjacent text is UI versus API data.
			if (element?.closest(".stat-label")) {
				const stat = element.closest(".stat");
				if (stat) roots.add(stat);
			}
			// A reused table header changes whether the existing cells contain UI or data.
			if (element?.closest("th")) {
				const table = element.closest("table");
				if (table) roots.add(table);
			}
			if (element?.closest(".card-title, .card-actions .segmented")) {
				const card = element.closest(".card");
				if (card) roots.add(card);
			}
		}
		for (const root of roots) {
			let covered = false;
			for (let parent = root.parentNode; parent; parent = parent.parentNode) {
				if (roots.has(parent)) { covered = true; break; }
			}
			if (!covered) scan(root);
		}
	}

	function changeLanguage(next: Language): void {
		if (next === language) return;
		const pending = observer.takeRecords();
		observer.disconnect();
		try {
			applyMutations(pending);
			language = next;
			try { localStorage.setItem(storageKey, next); } catch { /* Storage is optional. */ }
			updateControl();
			scan(document.body);
			mountControl();
		} finally {
			observer.observe(document.body, observerOptions);
		}
	}

	function start(): void {
		document.head.append(style);
		document.documentElement.setAttribute("data-omp-stats-zh", "");
		updateControl();
		mountControl();
		scan(document.body);
		observer.observe(document.body, observerOptions);
	}
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
	else start();
})();
