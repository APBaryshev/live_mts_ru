import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const benchmarksDir = "./test-results/benchmarks";

try {
    const files = readdirSync(benchmarksDir)
        .filter((f) => f.startsWith("benchmark-") && f.endsWith(".json"))
        .sort()
        .reverse();

    if (files.length === 0) {
        console.log("❌ No benchmark files found");
        process.exit(1);
    }

    const latestFile = files[0];
    const filePath = join(benchmarksDir, latestFile);
    const result = JSON.parse(readFileSync(filePath, "utf8"));

    console.log("Benchmark Results:");
    console.log(`File: ${latestFile}`);
    console.log(`Total tests: ${result.stats.total}`);
    console.log(`Duration: ${result.stats.duration}ms`);
    console.log(`Passed: ${result.stats.passed}`);
    console.log(`Failed: ${result.stats.failed}`);
    console.log(`Average time per test: ${Math.round(result.stats.duration / result.stats.total)}ms`);
} catch (error) {
    console.log("❌ Error analyzing benchmark:", error.message);
    console.log('💡 Run "make benchmark" first to generate benchmark data');
}
