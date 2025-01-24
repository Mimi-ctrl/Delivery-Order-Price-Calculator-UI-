import { getCorrectDistanceRange } from "./getCorrectDistanceRange"
import { calculateDistance } from "./calculateDistance"
import { ExtractedData, DistanceRange } from "../types/Data"

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
      venueData.basePrice +
      correctDistanceRange.a +
      (correctDistanceRange.b * distance) / 10
    )
  }
  return null
}
