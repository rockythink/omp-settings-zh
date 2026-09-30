import { getHostMetadata } from "../src/host-adapter";
import { buildCoverageReport } from "../src/report";
import { zhCN } from "../src/translations/zh-CN";

const host = await getHostMetadata();
const report = buildCoverageReport(host, zhCN);
const drift = {
  untranslatedPaths: report.untranslatedPaths,
  stalePaths: report.stalePaths,
  optionMismatches: report.optionMismatches,
  sourceHashMismatches: report.sourceHashMismatches,
};
const driftCount = Object.values(drift).reduce((count, entries) => count + entries.length, 0);

if (driftCount === 0) {
  console.log(`OMP ${host.version} Schema 漂移：0`);
} else {
  console.error(JSON.stringify(drift, null, 2));
  process.exitCode = 1;
}
