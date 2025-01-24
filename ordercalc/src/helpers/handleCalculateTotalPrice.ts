import { calculateDeliveryFee } from "./calculateDeliveryFee"
import { calculateDistance } from "./calculateDistance"
import { ExtractedData } from "../types/data"
import { handleSetPriceBreakdown } from "./calculator"
import { PriceBreakdown } from "../types"

export const handleCalculateTotalPrice = (
  cartValue: string,
  venueData: ExtractedData | null,
  userLatitude: string,
  userLongitude: string,
  setPriceBreakdown: (breakdown: PriceBreakdown) => void,
  setDeliveryNotAvailable: (value: boolean) => void
) => {
  const cartValueNumber = parseFloat(cartValue)
  if (venueData) {
    const distance = calculateDistance(
      Number(userLatitude),
      Number(userLongitude),
      venueData.coordinates[1],
      venueData.coordinates[0]
    )
    const deliveryFee = calculateDeliveryFee(
      venueData,
      userLatitude,
      userLongitude
    )
    if (deliveryFee) {
      handleSetPriceBreakdown(
        cartValueNumber,
        deliveryFee,
        distance,
        venueData.orderMinimumNoSurcharge,
        setPriceBreakdown
      )
    } else {
      setDeliveryNotAvailable(true)
    }
  }
}
