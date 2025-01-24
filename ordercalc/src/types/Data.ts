export type StaticData = {
  venue_raw: {
    location: {
      coordinates: [number, number]
    }
  }
}

export type DistanceRange = {
  min: number
  max: number
  a: number
  b: number
}

export type DynamicData = {
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number
      delivery_pricing: {
        base_price: number
        distance_ranges: DistanceRange[]
      }
    }
  }
}

export type ExtractedData = {
  coordinates: [number, number]
  orderMinimumNoSurcharge: number
  basePrice: number
  distanceRanges: DistanceRange[]
}
