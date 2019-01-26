var _ = require("lodash");
// 1 2 3
// 4 5 6
// 7 8 9
// X 0 X
const dict = {
  1: [6, 8],
  2: [7, 9],
  3: [4, 8],
  4: [3, 9, 0],
  5: [],
  6: [1, 7, 0],
  7: [2, 6],
  8: [1, 3],
  9: [4, 2],
  0: [4, 6]
};

// ['1-6-8']
// ['1']
// [['1-6'], ['1-8']]
// [[['1-6'], ...], ['1-8']]

const getPermutation = number => dict[number];

const mainRecur = (
  wantedDigits,
  currentDigit = 1,
  currentFinding = ["1"],
  depth = 1
) => {
  var termination = wantedDigits === depth;
  console.log("termination", wantedDigits, currentDigit, depth);

  if (termination) {
    return currentFinding.length;
  }

  var permutation = dict[currentDigit]; // 1: [6, 8]
  console.log("#1", currentFinding);
  currentFinding = currentFinding.map(finding =>
    permutation.map(perm => finding + "-" + perm)
  );
  console.log("#2", currentFinding);

  return permutation
    .map(num => {
      return mainRecur(wantedDigits, num, currentFinding, depth + 1);
    })
    .reduce((a, b) => a + b);
};

// console.log(`should be 1: ${mainRecur(1)}`)
// console.log(`should be 2: ${mainRecur(2)}`);

// console.log(`should be 5: ${mainRecur(3)}`);
// 1-6-1, 1-8-1, 1-6-7, 1-6-0, 1-8-3

console.log(`should be 10: ${mainRecur(4)}`);
// 1-6-1, 2
// 1-8-1, 2
// 1-6-7, 2
// 1-6-0, 2
// 1-8-3, 2
