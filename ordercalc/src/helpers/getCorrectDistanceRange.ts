import { DistanceRange } from "../types/Data"

export const getCorrectDistanceRange = (
  distanceRanges: DistanceRange[],
  distance: number
): DistanceRange | null => {
  const last = distanceRanges.at(-1)
  if (last && distance >= last.min) {
    return null
  }

  for (const range of distanceRanges) {
    if (distance >= range.min && distance < range.max) {
      return range
    }
  }

  return null
}
