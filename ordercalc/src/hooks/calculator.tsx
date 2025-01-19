import { PriceBreakdown } from "../types"

export const calculateDeliveryPrice = (
  cartValue: number,
  deliveryFee: number,
  deliveryDistance: number
): PriceBreakdown => {
  const smallOrderSurcharge = cartValue < 10 ? 10 - cartValue : 0
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
  setPriceBreakdown: (breakdown: PriceBreakdown) => void
) => {
  const priceBreakdown = calculateDeliveryPrice(
    cartValue,
    deliveryFee,
    deliveryDistance
  )
  setPriceBreakdown(priceBreakdown)
}
