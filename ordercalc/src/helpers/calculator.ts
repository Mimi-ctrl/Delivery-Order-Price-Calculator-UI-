import { PriceBreakdown } from "../types"

export const calculateOrderPrice = (
  cartValue: number,
  deliveryFee: number,
  deliveryDistance: number,
  orderMinimumNoSurcharge: number
): PriceBreakdown => {
  const smallOrderSurcharge =
    cartValue < orderMinimumNoSurcharge / 100
      ? orderMinimumNoSurcharge / 100 - cartValue
      : 0
  const totalPrice =
    cartValue > 0 ? cartValue + deliveryFee + smallOrderSurcharge : 0

  return {
    cartValue,
    deliveryFee,
    deliveryDistance,
    smallOrderSurcharge,
    totalPrice,
  }
}

export const handleSetPriceBreakdown = (
  cartValue: number,
  deliveryFee: number,
  deliveryDistance: number,
  orderMinimumNoSurcharge: number,
  setPriceBreakdown: (breakdown: PriceBreakdown) => void
) => {
  const priceBreakdown = calculateOrderPrice(
    cartValue,
    deliveryFee,
    deliveryDistance,
    orderMinimumNoSurcharge
  )
  setPriceBreakdown(priceBreakdown)
}
