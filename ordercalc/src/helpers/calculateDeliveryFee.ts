import { getCorrectDistanceRange } from "./getCorrectDistanceRange"
import { calculateDistance } from "./calculateDistance"
import { ExtractedData, DistanceRange } from "../types/data"

export const calculateDeliveryFee = (
  venueData: ExtractedData,
  userLatitude: string,
  userLongitude: string
): number | null => {
  const distance = calculateDistance(
    Number(userLatitude),
    Number(userLongitude),
    venueData.coordinates[1],
    venueData.coordinates[0]
  )

  const distanceRanges: DistanceRange[] = venueData.distanceRanges
  const correctDistanceRange = getCorrectDistanceRange(
    distanceRanges,
    distance
  )

  if (correctDistanceRange) {
    return (
      venueData.basePrice / 100 +
      correctDistanceRange.a +
      (correctDistanceRange.b * distance) / 10
    )
  }
  return null
}
