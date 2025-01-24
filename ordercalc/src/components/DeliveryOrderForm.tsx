import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material"
import { PriceBreakdown } from "../types/PriceBreakdown"
import { PriceBreakdownBox } from "../components/PriceBreakdownBox"
import React from "react" // For testing

type DeliveryOrderFormProps = {
  venueSlug: string
  cartValue: string
  setCartValue: (value: string) => void
  userLatitude: string
  setUserLatitude: (value: string) => void
  userLongitude: string
  setUserLongitude: (value: string) => void
  getLocation: () => void
  handleCalculateOrderPrice: () => void
  priceBreakdown: PriceBreakdown
  deliveryNotAvailable: boolean
}

export function DeliveryOrderForm(props: DeliveryOrderFormProps) {
  const {
    venueSlug,
    cartValue,
    setCartValue,
    userLatitude,
    setUserLatitude,
    userLongitude,
    setUserLongitude,
    getLocation,
    handleCalculateOrderPrice,
    priceBreakdown,
    deliveryNotAvailable,
  } = props

  return (
    <Container className="container">
      <Typography variant="h4" className="header">
        Delivery Order Price Calculator
      </Typography>

      <Typography variant="h5" className="details">
        Details
      </Typography>

      <Box component="form" noValidate autoComplete="off" className="form">
        <Typography>Venue slug: {venueSlug}</Typography>
        <TextField
          label="Cart value (EUR)"
          value={cartValue}
          onChange={(e) => setCartValue(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="cartValue"
          error={isNaN(Number(cartValue))}
          helperText={
            isNaN(Number(cartValue)) ? "Please enter a valid number (0.0)" : ""
          }
        />
        <TextField
          label="User latitude"
          value={userLatitude}
          onChange={(e) => setUserLatitude(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="userLatitude"
          error={isNaN(Number(userLatitude))}
          helperText={
            isNaN(Number(userLatitude)) ? "Please enter a valid number" : ""
          }
        />
        <TextField
          label="User longitude"
          value={userLongitude}
          onChange={(e) => setUserLongitude(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="userLongitude"
          error={isNaN(Number(userLongitude))}
          helperText={
            isNaN(Number(userLongitude)) ? "Please enter a valid number" : ""
          }
        />
        <Box className="button-container">
          <Button
            variant="outlined"
            onClick={getLocation}
            className="button"
            data-test-id="getLocation"
          >
            Get location
          </Button>
          <Button
            variant="contained"
            onClick={handleCalculateOrderPrice}
            className="button"
            disabled={
              cartValue === "" ||
              isNaN(Number(cartValue)) ||
              userLatitude === "" ||
              isNaN(Number(userLatitude)) ||
              userLongitude === "" ||
              isNaN(Number(userLongitude))
            }
          >
            Calculate delivery price
          </Button>
        </Box>
      </Box>

      <Divider />

      <PriceBreakdownBox priceBreakdown={priceBreakdown} />

      {deliveryNotAvailable == true && (
        <Box>
          <Typography variant="h5" sx={{ color: "red" }}>
            Delivery is not available!
          </Typography>
        </Box>
      )}
    </Container>
  )
}
