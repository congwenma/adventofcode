// 0: ts-node_path, 1: file_path
const [_tsnode_path, _file_path, ...args]: string[] = process.argv;
import getCorrectDir from "./utils/get_correct_dir";
const { join } = require("path");

const correctDir: string = getCorrectDir(args);
console.log("************");
console.log("project: ", correctDir);
console.log(`running ${join(correctDir, "run.ts")}:`);
console.log();

// NOTE: huh, won't work
// require("ts-node").register("./tsconfig.json");
// require(join(__dirname, correctDir, "run.ts")).run();

require(join(__dirname, correctDir, "run.ts"));
