import { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from '@mui/material'
import './App.css'

type PriceBreakdown = {
  cartValue: number
  deliveryFee: number
  deliveryDistance: number
  smallOrderSurcharge: number
  totalPrice: number
}

const DeliveryOrderPriceCalculator = () => {
  const [venueSlug, setVenueSlug] = useState<string>('home-assignment-venue-helsinki')
  const [cartValue, setCartValue] = useState<string>('10')
  const [userLatitude, setUserLatitude] = useState<string>('60.17094')
  const [userLongitude, setUserLongitude] = useState<string>('24.93087')
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    cartValue: 0,
    deliveryFee: 0,
    deliveryDistance: 0,
    smallOrderSurcharge: 0,
    totalPrice: 0,
  })
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLatitude(position.coords.latitude.toString())
          setUserLongitude(position.coords.longitude.toString())
        },
        (error) => {
          alert('Could not get location: ' + error.message)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const calculateDeliveryPrice = () => {
    const cartValueNumber = parseFloat(cartValue)
    const deliveryFee = 1.9
    const deliveryDistance = 177
    const smallOrderSurcharge = cartValueNumber < 10 ? 10 - cartValueNumber : 0
    const totalPrice = cartValueNumber + deliveryFee + smallOrderSurcharge

    setPriceBreakdown({
      cartValue: cartValueNumber,
      deliveryFee,
      deliveryDistance,
      smallOrderSurcharge,
      totalPrice,
    })
  }

  return (
    <Container className="container">
      <Typography variant="h4" className="header">
        Delivery Order Price Calculator
      </Typography>

      <Typography variant="h5" className="details">
        Details
      </Typography>

      <Box component="form" noValidate autoComplete="off" className="form">
        <TextField
          label="Venue slug"
          value={venueSlug}
          onChange={(e) => setVenueSlug(e.target.value)}
          className="form-field"
          variant="outlined"
        />
        <TextField
          label="Cart value (EUR)"
          type="number"
          value={cartValue}
          onChange={(e) => setCartValue(e.target.value)}
          className="form-field"
          variant="outlined"
        />
        <TextField
          label="User latitude"
          value={userLatitude}
          onChange={(e) => setUserLatitude(e.target.value)}
          className="form-field"
          variant="outlined"
        />
        <TextField
          label="User longitude"
          value={userLongitude}
          onChange={(e) => setUserLongitude(e.target.value)}
          className="form-field"
          variant="outlined"
        />
        <Box className="button-container">
          <Button
            variant="outlined"
            onClick={getLocation}
            className="button"
          >
            Get location
          </Button>
          <Button
            variant="contained"
            onClick={calculateDeliveryPrice}
            className="button"
          >
            Calculate delivery price
          </Button>
        </Box>
      </Box>

      <Divider/>

      <Box className="price-breakdown">
        <Typography variant="h5">Price breakdown</Typography>
        <Typography>Cart Value: {priceBreakdown.cartValue.toFixed(2)} €</Typography>
        <Typography>Delivery fee: {priceBreakdown.deliveryFee.toFixed(2)} €</Typography>
        <Typography>Delivery distance: {priceBreakdown.deliveryDistance} m</Typography>
        <Typography>
          Small order surcharge: {priceBreakdown.smallOrderSurcharge.toFixed(2)} €
        </Typography>
        <Typography className="total">
          Total price: {priceBreakdown.totalPrice.toFixed(2)} €
        </Typography>
      </Box>
    </Container>
  )
}

export default DeliveryOrderPriceCalculator
