import Frequency from "./frequency";

describe("chronal_calibaration", function() {
  let freq = new Frequency([+1, -2, +3, +1]);
  it("#sum", () => {
    expect(freq.sum()).toEqual(3);
  });

  it("#firstSumReoccurance", () => {
    expect(freq.firstSumReoccurance()).toEqual(2);
  });
});
