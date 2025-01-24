import { calculateDeliveryFee } from "./calculateDeliveryFee"
import { calculateDistance } from "./calculateDistance"
import { ExtractedData } from "../types/Data"
import { handleSetPriceBreakdown } from "./calculator"
import { PriceBreakdown } from "../types/PriceBreakdown"

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
    setDeliveryNotAvailable(false)
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
      handleSetPriceBreakdown(
        0,
        0,
        distance,
        0,
        setPriceBreakdown
      )
    }
  }
}
