import { render, screen } from "@testing-library/react";
import { PriceBreakdownBox } from "../PriceBreakdownBox";
import { PriceBreakdown } from "../../types/PriceBreakdown";
import "@testing-library/jest-dom";
import React from "react"; // For testing

describe("PriceBreakdownBox", () => {
  const mockPriceBreakdown: PriceBreakdown = {
    cartValue: 50.5,
    deliveryFee: 5.25,
    deliveryDistance: 1200,
    smallOrderSurcharge: 2.5,
    totalPrice: 58.25,
  };

  it("renders the PriceBreakdownBox component correctly", () => {
    render(<PriceBreakdownBox priceBreakdown={mockPriceBreakdown} />);

    // Check for heading
    expect(screen.getByText("Price breakdown")).toBeInTheDocument();

    // Check for Cart Value
    const cartValueElement = screen.getByText("Cart Value: 50.50 €");
    expect(cartValueElement).toBeInTheDocument();
    expect(cartValueElement).toHaveAttribute("data-raw-value", "5050");

    // Check for Delivery Fee
    const deliveryFeeElement = screen.getByText("Delivery fee: 5.25 €");
    expect(deliveryFeeElement).toBeInTheDocument();
    expect(deliveryFeeElement).toHaveAttribute("data-raw-value", "525");

    // Check for Delivery Distance
    const deliveryDistanceElement = screen.getByText("Delivery distance: 1200 m");
    expect(deliveryDistanceElement).toBeInTheDocument();
    expect(deliveryDistanceElement).toHaveAttribute("data-raw-value", "1200");

    // Check for Small Order Surcharge
    const smallOrderSurchargeElement = screen.getByText(
      "Small order surcharge: 2.50 €"
    );
    expect(smallOrderSurchargeElement).toBeInTheDocument();
    expect(smallOrderSurchargeElement).toHaveAttribute(
      "data-raw-value",
      "250"
    );

    // Check for Total Price
    const totalPriceElement = screen.getByText("Total price: 58.25 €");
    expect(totalPriceElement).toBeInTheDocument();
    expect(totalPriceElement).toHaveAttribute("data-raw-value", "5825");
  });
});
