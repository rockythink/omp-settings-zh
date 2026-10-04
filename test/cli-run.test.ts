import { expect, test } from "bun:test";
import { isStatsWeb } from "../src/cli/run";

test("only Stats Web arguments select the original-server preload", () => {
  for (const argv of [
    ["stats"],
    ["stats", "--port", "0", "--host", "localhost"],
    ["stats", "--port=8847", "--host=::1"],
    ["stats", "-p", "8847"],
    ["stats", "-p8847"],
    ["stats", "-p=8847", "--host", "0.0.0.0"],
    ["stats", "--host", "192.0.2.1"],
    ["stats", "--host=stats.example.test"],
  ]) expect(isStatsWeb(argv)).toBe(true);
});

test("reports, help and invalid or unknown forms retain the official command path", () => {
  for (const argv of [
    [], ["--version"], ["help", "stats"], ["stats", "--help"], ["stats", "-h"],
    ["stats", "--json"], ["stats", "-j"], ["stats", "--summary"], ["stats", "-s"],
    ["stats", "-js"], ["stats", "--json=false"], ["stats", "--unknown"],
    ["stats", "--port"], ["stats", "--host"], ["stats", "--port", "--help"],
    ["stats", "--port", "-1"], ["stats", "--"], ["stats", "unexpected"],
  ]) expect(isStatsWeb(argv)).toBe(false);
});
