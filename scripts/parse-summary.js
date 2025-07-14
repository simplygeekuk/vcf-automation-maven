import { readFileSync } from "fs";
import { argv } from "process";

const log = readFileSync(argv[2], "utf8");
const match = log.match(/(\d+)\s+specs,\s+(\d+)\s+failures/);

if (match) {
    const result = {
        specs: parseInt(match[1], 10),
        failures: parseInt(match[2], 10),
        success: parseInt(match[2], 10) === 0,
    };
    console.log(JSON.stringify(result, null, 2));
} else {
    console.error("Summary not found in log.");
    process.exit(1);
}
