class Frequency {
  list: Array<number> = [];

  constructor(list: Array<number> = []) {
    if (list) {
      this.list = list;
    }
  }

  sum() {
    return this.list.reduce((a, b) => a + b, 0);
  }

  firstSumReoccurance(): number {
    let uniqueFrequency: Array<number> = [];
    const findReoccuranceRecur = (
      runningSum: number,
      list: Array<number>,
      uniqueFrequency: Array<number>
    ): number => {
      // let result: number = NaN;
      const found: number | undefined = list.find((num: number) => {
        runningSum += num;

        // Found reoccurrance
        if (uniqueFrequency.indexOf(runningSum) !== -1) {
          uniqueFrequency.push(runningSum);
          // result = num;
          return true;
        }
        uniqueFrequency.push(runningSum);
        return false;
      });
      if (!!found) {
        // console.log(`has found: ${found}`);
        // console.log(`reoccur sequence: ${uniqueFrequency}`);

        return runningSum;
      } else {
        return findReoccuranceRecur(runningSum, list, uniqueFrequency);
      }
    };

    return findReoccuranceRecur(0, this.list, []);
  }
}

export default Frequency;
