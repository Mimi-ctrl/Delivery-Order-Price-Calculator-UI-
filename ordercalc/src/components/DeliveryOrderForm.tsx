import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material"
import { PriceBreakdown } from "../types"
import PriceBreakdownBox from "../components/PriceBreakdownBox"

type DeliveryOrderFormProps = {
  venueSlug: string;
  setVenueSlug: (value: string) => void;
  cartValue: string;
  setCartValue: (value: string) => void;
  userLatitude: string;
  setUserLatitude: (value: string) => void;
  userLongitude: string;
  setUserLongitude: (value: string) => void;
  getLocation: () => void;
  handleCalculateDeliveryPrice: () => void;
  priceBreakdown: PriceBreakdown;
}

function DeliveryOrderForm(props: DeliveryOrderFormProps) {
  const {
    venueSlug,
    setVenueSlug,
    cartValue,
    setCartValue,
    userLatitude,
    setUserLatitude,
    userLongitude,
    setUserLongitude,
    getLocation,
    handleCalculateDeliveryPrice,
    priceBreakdown,
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
        <TextField
          label="Venue slug"
          value={venueSlug}
          onChange={(e) => setVenueSlug(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="venueSlug"
        />
        <TextField
          label="Cart value (EUR)"
          type="number"
          value={cartValue}
          onChange={(e) => setCartValue(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="cartValue"
        />
        <TextField
          label="User latitude"
          value={userLatitude}
          onChange={(e) => setUserLatitude(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="userLatitude"
        />
        <TextField
          label="User longitude"
          value={userLongitude}
          onChange={(e) => setUserLongitude(e.target.value)}
          className="form-field"
          variant="outlined"
          data-test-id="userLongitude"
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
            onClick={handleCalculateDeliveryPrice}
            className="button"
          >
            Calculate delivery price
          </Button>
        </Box>
      </Box>

      <Divider />

      <PriceBreakdownBox priceBreakdown={priceBreakdown} />
    </Container>
  )
}

export default DeliveryOrderForm
