import { Box, Typography } from "@mui/material"
import { PriceBreakdown } from "../types/PriceBreakdown"

import React from "react" // For testing

type PriceBreakdownProps = {
  priceBreakdown: PriceBreakdown
}

export const PriceBreakdownBox = ({ priceBreakdown }: PriceBreakdownProps) => {
  return (
    <Box className="price-breakdown">
      <Typography variant="h5">Price breakdown</Typography>
      <Typography data-raw-value={(priceBreakdown.cartValue * 100).toString()}>
        Cart Value: {priceBreakdown.cartValue.toFixed(2)} €
      </Typography>
      <Typography
        data-raw-value={(priceBreakdown.deliveryFee * 100).toString()}
      >
        Delivery fee: {priceBreakdown.deliveryFee.toFixed(2)} €
      </Typography>
      <Typography data-raw-value={priceBreakdown.deliveryDistance.toString()}>
        Delivery distance: {priceBreakdown.deliveryDistance.toFixed(0)} m
      </Typography>
      <Typography
        data-raw-value={(priceBreakdown.smallOrderSurcharge * 100).toString()}
      >
        Small order surcharge: {priceBreakdown.smallOrderSurcharge.toFixed(2)} €
      </Typography>
      <Typography
        className="total"
        data-raw-value={(priceBreakdown.totalPrice * 100).toString()}
      >
        Total price: {priceBreakdown.totalPrice.toFixed(2)} €
      </Typography>
    </Box>
  )
}
