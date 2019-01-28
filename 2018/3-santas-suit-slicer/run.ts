// console.log("hello typescript");
import * as fs from "fs";
import * as es from "event-stream";

var stream = fs
  .createReadStream(__dirname + "/data/input.txt", "utf-8")
  .pipe(es.split());

// var stream = fs
//   .createReadStream(__dirname + "/data/input-test.txt", "utf-8")
//   .pipe(es.split());

var list: Claim[] = [];

// Claims
// 3,2: 5x4 means:
//  3 from left, 2 from top, 5 width, 4 height

class Claim {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  constructor(
    id: number,
    left: number,
    top: number,
    width: number,
    height: number
  ) {
    this.id = id;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  view(): string {
    const { left, top, width, height } = this;
    return `left: ${left}, top: ${top}, width: ${width}, height: ${height}`;
  }

  hasBlock(x: number, y: number): boolean {
    const { left, top, width, height } = this;
    return (
      x >= left && x <= left + width - 1 && y >= top && y <= top + height - 1
    );
  }
}

const expand = (n: number): number[] => {
  var arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

const getOverlappingFabric = (list: Claim[]): number => {
  // console.log(list.map(claim => claim.view()));

  let total = 0;
  const claim_with_overlap: Claim[] = [];
  expand(1000).forEach(x => {
    expand(1000).forEach(y => {
      let passed = list.filter(claim => claim.hasBlock(x, y));

      let counter = passed.length;
      if (counter > 1) {
        // console.log(
        //   `${counter}, overlapping block ${x}, ${y}, OVERLAP ON: ${passed.map(
        //     claim => claim.view()
        //   )}`
        // );
        claim_with_overlap.push(...passed);
        total++;
      }
    });
  });

  // part 2
  const no_overlap: number[] = list.reduce((accu: number[], claim) => {
    if (!claim_with_overlap.includes(claim)) {
      accu.push(claim.id);
    }
    return accu;
  }, []);
  console.log(`no overlap: ${no_overlap}`);

  // part 1
  return total;
};

// How many square inches of fabric are within two or more claims?

const REGEX = /\#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
const parse_with_regex = (line: string): string[] => {
  var result = REGEX.exec(line);

  return result ? result.slice(1, 6) : [];
};
stream
  .pipe(
    es.mapSync(function(line: string) {
      // pause the readstream
      stream.pause();

      // skips eof line
      if (line !== "") {
        const [id, left, top, width, height] = parse_with_regex(line).map(
          Number
        );
        list.push(new Claim(id, left, top, width, height));
      }

      // resume the readstream, possibly from a callback
      stream.resume();
    })
  )
  .on("end", () => {
    console.log(`**Overlapping fabric ${getOverlappingFabric(list)}`);
  });
