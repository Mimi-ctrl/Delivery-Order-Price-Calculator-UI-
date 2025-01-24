import { getCorrectDistanceRange } from "../getCorrectDistanceRange";
import { DistanceRange } from "../../types/Data";

describe("getCorrectDistanceRange", () => {
  const distanceRanges: DistanceRange[] = [
    { min: 0, max: 1000, a: 2, b: 0.1 },
    { min: 1000, max: 5000, a: 5, b: 0.05 },
    { min: 5000, max: 10000, a: 10, b: 0.02 },
    { min: 10000, max: 0, a: 10, b: 0.02 },
  ];

  it("returns the correct range for a distance within the range", () => {
    const distance = 800;
    const result = getCorrectDistanceRange(distanceRanges, distance);
    expect(result).toEqual({ min: 0, max: 1000, a: 2, b: 0.1 });
  });

  it("returns the correct range for a distance at the lower bound of a range", () => {
    const distance = 1000;
    const result = getCorrectDistanceRange(distanceRanges, distance);
    expect(result).toEqual({ min: 1000, max: 5000, a: 5, b: 0.05 });
  });

  it("returns the correct range for a distance at the upper bound (exclusive)", () => {
    const distance = 9999;
    const result = getCorrectDistanceRange(distanceRanges, distance);
    expect(result).toEqual({ min: 5000, max: 10000, a: 10, b: 0.02 });
  });

  it("returns null for a distance that is out of all ranges (too high)", () => {
    const distance = 10000;
    const result = getCorrectDistanceRange(distanceRanges, distance);
    expect(result).toBeNull();
  });

  it("returns null for a distance that is out of all ranges (too low)", () => {
    const distance = -1;
    const result = getCorrectDistanceRange(distanceRanges, distance);
    expect(result).toBeNull();
  });

  it("returns null if the last range's minimum is less than or equal to the distance", () => {
    const customRanges: DistanceRange[] = [
      { min: 0, max: 1000, a: 2, b: 0.1 },
      { min: 1000, max: 5000, a: 5, b: 0.05 },
      { min: 5000, max: 8000, a: 10, b: 0.02 },
    ];
    const distance = 8000;
    const result = getCorrectDistanceRange(customRanges, distance);
    expect(result).toBeNull();
  });

  it("handles an empty distanceRanges array and returns null", () => {
    const distance = 1000;
    const result = getCorrectDistanceRange([], distance);
    expect(result).toBeNull();
  });
});
