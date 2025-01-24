import { DynamicData, ExtractedData, StaticData } from "../types/data"

const url =
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues"

export const getStaticData = async (venueSlug: string): Promise<StaticData> => {
  try {
    const response = await fetch(`${url}/${venueSlug}/static`)
    if (!response.ok) {
      throw new Error(
        `Error with fetching static data: ${response.statusText}`
      )
    }
    return await response.json()
  } catch (error) {
    console.error("Error with fetching static data:", error)
    throw error
  }
}

export const getDynamicData = async (
  venueSlug: string
): Promise<DynamicData> => {
  try {
    const response = await fetch(`${url}/${venueSlug}/dynamic`)
    if (!response.ok) {
      throw new Error(
        `Error with fetching dynamic data: ${response.statusText}`
      )
    }
    return await response.json()
  } catch (error) {
    console.error("Error with fetching dynamic data:", error)
    throw error
  }
}

export const getVenueData = async (
  venueSlug: string
): Promise<ExtractedData> => {
  const stat = await getStaticData(venueSlug)
  const dynam = await getDynamicData(venueSlug)
  const extract: ExtractedData = {
    coordinates: stat.venue_raw.location.coordinates,
    orderMinimumNoSurcharge:
      dynam.venue_raw.delivery_specs.order_minimum_no_surcharge,
    basePrice: dynam.venue_raw.delivery_specs.delivery_pricing.base_price,
    distanceRanges:
      dynam.venue_raw.delivery_specs.delivery_pricing.distance_ranges,
  }
  return extract
}
