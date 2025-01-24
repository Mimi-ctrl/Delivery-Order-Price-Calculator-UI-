import { render, screen, fireEvent, configure } from "@testing-library/react";
import { DeliveryOrderForm } from "../DeliveryOrderForm";
import { PriceBreakdown } from "../../types/PriceBreakdown";
import "@testing-library/jest-dom";
import React from "react"; // For testing

configure({testIdAttribute: "data-test-id"})

describe("DeliveryOrderForm", () => {
  const mockProps = {
    venueSlug: "test-venue",
    cartValue: "",
    setCartValue: jest.fn(),
    userLatitude: "",
    setUserLatitude: jest.fn(),
    userLongitude: "",
    setUserLongitude: jest.fn(),
    getLocation: jest.fn(),
    handleCalculateOrderPrice: jest.fn(),
    priceBreakdown: {
      cartValue: 0,
      deliveryFee: 0,
      deliveryDistance: 0,
      smallOrderSurcharge: 0,
      totalPrice: 0,
    } as PriceBreakdown,
    deliveryNotAvailable: false,
  };

  it("renders the DeliveryOrderForm component correctly", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    expect(screen.getByText("Delivery Order Price Calculator")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText(`Venue slug: ${mockProps.venueSlug}`)).toBeInTheDocument();
    expect(screen.getByText("Calculate delivery price")).toBeInTheDocument();
    expect(screen.getByTestId("cartValue")).toBeInTheDocument();
    expect(screen.getByTestId("userLatitude")).toBeInTheDocument();
    expect(screen.getByTestId("userLongitude")).toBeInTheDocument();
  });

  it("disables the calculate button if inputs are invalid", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    const calculateButton = screen.getByText("Calculate delivery price");
    expect(calculateButton).toBeDisabled();
  });

  it("calls setCartValue on cart value input change", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    const cartValueInput = screen.getByTestId("cartValue").querySelector("input");
    fireEvent.change(cartValueInput!, { target: { value: "50" } });

    expect(mockProps.setCartValue).toHaveBeenCalledWith("50");
  });

  it("calls setUserLatitude on latitude input change", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    const latitudeInput = screen.getByTestId("userLatitude").querySelector("input");
    fireEvent.change(latitudeInput!, { target: { value: "60.1699" } });

    expect(mockProps.setUserLatitude).toHaveBeenCalledWith("60.1699");
  });

  it("calls setUserLongitude on longitude input change", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    const longitudeInput = screen.getByTestId("userLongitude").querySelector("input");
    fireEvent.change(longitudeInput!, { target: { value: "24.9384" } });

    expect(mockProps.setUserLongitude).toHaveBeenCalledWith("24.9384");
  });

  it("calls getLocation when the 'Get location' button is clicked", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    const getLocationButton = screen.getByTestId("getLocation");
    fireEvent.click(getLocationButton);

    expect(mockProps.getLocation).toHaveBeenCalled();
  });

  it("enables the calculate button when all inputs are valid", () => {
    render(
      <DeliveryOrderForm
        {...mockProps}
        cartValue="50"
        userLatitude="60.1699"
        userLongitude="24.9384"
      />
    );

    const calculateButton = screen.getByText("Calculate delivery price");
    expect(calculateButton).not.toBeDisabled();
  });

  it("displays 'Delivery is not available!' when deliveryNotAvailable is true", () => {
    render(<DeliveryOrderForm {...mockProps} deliveryNotAvailable={true} />);

    expect(screen.getByText("Delivery is not available!")).toBeInTheDocument();
  });

  it("renders the PriceBreakdownBox with the correct props", () => {
    render(<DeliveryOrderForm {...mockProps} />);

    expect(screen.getByText("Price breakdown")).toBeInTheDocument();
  });
});
