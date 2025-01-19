import { useState } from "react"
import GetLocation from "./hooks/GetLocation"
import { handleSetPriceBreakdown } from "./hooks/calculator"
import DeliveryOrderForm from "./components/DeliveryOrderForm"
import { PriceBreakdown } from "./types"
import "./styles/App.css"

const DeliveryOrderPriceCalculator = () => {
  const {
    userLatitude,
    userLongitude,
    getLocation,
    setUserLatitude,
    setUserLongitude,
  } = GetLocation()
  const [venueSlug, setVenueSlug] = useState<string>(
    "home-assignment-venue-helsinki"
  )
  const [cartValue, setCartValue] = useState<string>("0")
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    cartValue: 0,
    deliveryFee: 0,
    deliveryDistance: 0,
    smallOrderSurcharge: 0,
    totalPrice: 0,
  })

  const handleCalculateDeliveryPrice = () => {
    const cartValueNumber = parseFloat(cartValue)
    handleSetPriceBreakdown(cartValueNumber, 1.9, 177, setPriceBreakdown)
  }

  return (
    <DeliveryOrderForm
      venueSlug={venueSlug}
      setVenueSlug={setVenueSlug}
      cartValue={cartValue}
      setCartValue={setCartValue}
      userLatitude={userLatitude}
      setUserLatitude={setUserLatitude}
      userLongitude={userLongitude}
      setUserLongitude={setUserLongitude}
      getLocation={getLocation}
      handleCalculateDeliveryPrice={handleCalculateDeliveryPrice}
      priceBreakdown={priceBreakdown}
    />
  )
}

export default DeliveryOrderPriceCalculator
