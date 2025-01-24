import { useEffect, useState } from "react"
import { GetLocation } from "./hooks/GetLocation"
import { DeliveryOrderForm } from "./components/DeliveryOrderForm"
import { PriceBreakdown } from "./types"
import { getVenueData } from "./networking/api"
import { ExtractedData } from "./types/data"
import { handleCalculateTotalPrice } from "./helpers/handleCalculateTotalPrice"
import "./styles/App.css"

export const DeliveryOrderPriceCalculator = () => {
  const {
    userLatitude,
    userLongitude,
    getLocation,
    setUserLatitude,
    setUserLongitude,
  } = GetLocation()

  const venueSlug = "home-assignment-venue-helsinki"
  const [venueData, setVenueData] = useState<ExtractedData | null>(null)
  const [cartValue, setCartValue] = useState<string>("0")
  const [deliveryNotAvailable, setDeliveryNotAvailable] =
    useState<boolean>(false)
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    cartValue: 0,
    deliveryFee: 0,
    deliveryDistance: 0,
    smallOrderSurcharge: 0,
    totalPrice: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const venue = await getVenueData(venueSlug)
      setVenueData(venue)
    }
    fetchData()
  }, [venueSlug])

  const handleCalculateOrderPrice = () => {
    handleCalculateTotalPrice(
      cartValue,
      venueData,
      userLatitude,
      userLongitude,
      setPriceBreakdown,
      setDeliveryNotAvailable
    )
  }

  return (
    <DeliveryOrderForm
      venueSlug={venueSlug}
      cartValue={cartValue}
      setCartValue={setCartValue}
      userLatitude={userLatitude}
      setUserLatitude={setUserLatitude}
      userLongitude={userLongitude}
      setUserLongitude={setUserLongitude}
      getLocation={getLocation}
      handleCalculateOrderPrice={handleCalculateOrderPrice}
      priceBreakdown={priceBreakdown}
      deliveryNotAvailable={deliveryNotAvailable}
    />
  )
}
