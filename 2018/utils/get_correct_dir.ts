const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");

const isDirectory = (source: string) => lstatSync(source).isDirectory();
const getDirectories = (source: string) =>
  readdirSync(source)
    .map((name: string) => join(source, name))
    .filter(isDirectory);

const getCorrectDir = (args: string[]) => {
  const [exerciseIdx]: string[] = args;

  return getDirectories("./").find((dir: string) => {
    return new RegExp(`(^${exerciseIdx}-.)`).test(dir);
  });
};
export default getCorrectDir;
