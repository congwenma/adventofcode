// 0: ts-node_path, 1: file_path
const [_tsnode_path, _file_path, ...args]: string[] = process.argv;
import getCorrectDir from "./utils/get_correct_dir";
const { join } = require("path");
const { exec } = require("child_process");

const correctDir: string = getCorrectDir(args);
const pattern = `"(${correctDir}/.*\\.(test|spec).ts$)"`;

console.log("************");
console.log("project: ", correctDir);
console.log(`running ${pattern}:`);
console.log();

// exec(`jest --watchAll ${pattern}`, (err: boolean, stdout: any, stderr: any) => {
//   if (err) {
//     throw new Error("Failed");
//     console.error("FAILED");
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

const jest = require("jest");
jest.run(`--watchAll ${pattern}`);
