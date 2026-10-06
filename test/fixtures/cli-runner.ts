import { runOfficialCommand } from "../../src/cli/run";
const [official, ...argv] = Bun.argv.slice(2);
if (!official) throw new Error("missing official fixture");
process.exitCode = await runOfficialCommand(official, argv);
