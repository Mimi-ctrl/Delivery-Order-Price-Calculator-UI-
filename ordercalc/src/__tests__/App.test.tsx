import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeliveryOrderPriceCalculator } from "../App";
import { getVenueData } from "../networking/api";
import { handleCalculateTotalPrice } from "../helpers/handleCalculateTotalPrice";
import "@testing-library/jest-dom";
import React from "react"; // For testing

jest.mock("../networking/api");
jest.mock("../helpers/handleCalculateTotalPrice");
jest.mock("../hooks/GetLocation", () => ({
  GetLocation: () => ({
    userLatitude: "60.1699",
    userLongitude: "24.9384",
    getLocation: jest.fn(),
    setUserLatitude: jest.fn(),
    setUserLongitude: jest.fn(),
  }),
}));

describe("DeliveryOrderPriceCalculator", () => {
  const mockVenueData = {
    coordinates: [24.9384, 60.1699],
    orderMinimumNoSurcharge: 2000,
    basePrice: 500,
    distanceRanges: [
      { min: 0, max: 1000, a: 2, b: 0.1 },
      { min: 1000, max: 5000, a: 5, b: 0.05 },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the DeliveryOrderForm component", async () => {
    (getVenueData as jest.Mock).mockResolvedValueOnce(mockVenueData);

    render(<DeliveryOrderPriceCalculator />);

    // Wait for the venue data to load
    await waitFor(() => expect(getVenueData).toHaveBeenCalledWith("home-assignment-venue-helsinki"));

    // Check for key elements in the DeliveryOrderForm
    expect(screen.getByText("Delivery Order Price Calculator")).toBeInTheDocument();
    expect(screen.getByLabelText("Cart value (EUR)")).toBeInTheDocument();
    expect(screen.getByText("Calculate delivery price")).toBeInTheDocument();
  });

  it("fetches venue data on mount", async () => {
    (getVenueData as jest.Mock).mockResolvedValueOnce(mockVenueData);

    render(<DeliveryOrderPriceCalculator />);

    await waitFor(() => {
      expect(getVenueData).toHaveBeenCalledWith("home-assignment-venue-helsinki");
      expect(getVenueData).toHaveBeenCalledTimes(1);
    });
  });

  it("updates cart value and triggers price calculation", async () => {
    (getVenueData as jest.Mock).mockResolvedValueOnce(mockVenueData);

    render(<DeliveryOrderPriceCalculator />);

    // Wait for the venue data to load
    await waitFor(() => expect(getVenueData).toHaveBeenCalled());

    const cartValueInput = screen.getByLabelText("Cart value (EUR)");
    fireEvent.change(cartValueInput, { target: { value: "25" } });

    expect(cartValueInput).toHaveValue("25");

    const calculateButton = screen.getByText("Calculate delivery price");
    fireEvent.click(calculateButton);

    expect(handleCalculateTotalPrice).toHaveBeenCalledWith(
      "25",
      mockVenueData,
      "60.1699",
      "24.9384",
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("displays 'Delivery is not available' message if delivery is unavailable", async () => {
    (getVenueData as jest.Mock).mockResolvedValueOnce(mockVenueData);
    (handleCalculateTotalPrice as jest.Mock).mockImplementationOnce(
      (_cartValue, _venueData, _latitude, _longitude, setPriceBreakdown, setDeliveryNotAvailable) => {
        setDeliveryNotAvailable(true);
      }
    );

    render(<DeliveryOrderPriceCalculator />);

    // Wait for the venue data to load
    await waitFor(() => expect(getVenueData).toHaveBeenCalled());

    const calculateButton = screen.getByText("Calculate delivery price");
    fireEvent.click(calculateButton);

    await waitFor(() =>
      expect(screen.getByText("Delivery is not available!")).toBeInTheDocument()
    );
  });
});
