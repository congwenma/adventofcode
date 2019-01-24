// console.log("hello typescript");
import * as fs from "fs";
import * as es from "event-stream";

var stream = fs
  .createReadStream(__dirname + "/data/input.txt", "utf-8")
  .pipe(es.split());

var list: string[] = [];

interface Counter {
  [letter: string]: number;
}

// NOTE: part 1
const checksum = (list: string[]): number => {
  const dictionaries: Counter[] = list.map(str => {
    return str.split("").reduce((counter: Counter, letter: string) => {
      counter[letter] = counter[letter] ? counter[letter] + 1 : 1;
      return counter;
    }, {});
  });

  const doubles = dictionaries.filter(dict => Object.values(dict).includes(2))
    .length;
  const triples = dictionaries.filter(dict => Object.values(dict).includes(3))
    .length;
  return doubles * triples;
};

// NOTE: part 2
const findDiffDistance1 = (list: string[]): string => {
  let result: string = "";

  // return common strings between the correct pair.
  list.find((i: string) => {
    return !!list.find((j: string) => {
      const splitI = i.split("");
      const splitJ = j.split("");
      let misMatch: number = 0;

      splitI.forEach((letterI, idx) => {
        if (splitJ[idx] !== letterI) {
          misMatch++;
        }
      });
      // terminate condition
      if (misMatch === 1) {
        splitI.forEach((letterI, idx) => {
          if (splitJ[idx] === letterI) {
            result += letterI;
          }
        });
        return true;
      }
      return false;
    });
  });

  return result;
};

console.log(
  `test findDiffDistance1 is: ${findDiffDistance1([
    "abcde",
    "fghij",
    "klmno",
    "pqrst",
    "fguij",
    "axcye",
    "wvxyz"
  ])}`
); // fgij

console.log(
  `test checksum is: ${checksum([
    "abcdef",
    "bababc",
    "abbcde",
    "abcccd",
    "aabcdd",
    "abcdee",
    "ababab"
  ])}` // 3 * 4 === 12
);

stream
  .pipe(
    es.mapSync(function(line: string) {
      // pause the readstream
      stream.pause();

      // skips eof line
      if (line !== "") {
        list.push(line);
      }

      // resume the readstream, possibly from a callback
      stream.resume();
    })
  )
  .on("end", () => {
    console.log(`CheckSum is: ${checksum(list)}`);
    console.log(`findDiffDistance1 is: ${findDiffDistance1(list)}`);
  });
