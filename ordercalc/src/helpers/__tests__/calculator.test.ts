import { calculateOrderPrice, handleSetPriceBreakdown } from "../calculator";

describe("calculateOrderPrice", () => {
  it("calculates the price breakdown correctly when no surcharge is needed", () => {
    const cartValue = 20;
    const deliveryFee = 5;
    const deliveryDistance = 10;
    const orderMinimumNoSurcharge = 20; // Minimum order value = €20.00

    const result = calculateOrderPrice(cartValue, deliveryFee, deliveryDistance, orderMinimumNoSurcharge);

    expect(result).toEqual({
      cartValue,
      deliveryFee,
      deliveryDistance,
      smallOrderSurcharge: 0, // No surcharge needed
      totalPrice: 25, // €20 (cart) + €5 (delivery)
    });
  });

  it("calculates the price breakdown correctly when a surcharge is applied", () => {
    const cartValue = 15;
    const deliveryFee = 5;
    const deliveryDistance = 10;
    const orderMinimumNoSurcharge = 20; // Minimum order value = €20.00

    const result = calculateOrderPrice(cartValue, deliveryFee, deliveryDistance, orderMinimumNoSurcharge);

    expect(result).toEqual({
      cartValue,
      deliveryFee,
      deliveryDistance,
      smallOrderSurcharge: 5, // €20 - €15 = €5
      totalPrice: 25, // €15 (cart) + €5 (delivery) + €5 (surcharge)
    });
  });
});

describe("handleSetPriceBreakdown", () => {
  it("sets the price breakdown correctly", () => {
    const cartValue = 15;
    const deliveryFee = 5;
    const deliveryDistance = 10;
    const orderMinimumNoSurcharge = 20;
    const mockSetPriceBreakdown = jest.fn();

    handleSetPriceBreakdown(cartValue, deliveryFee, deliveryDistance, orderMinimumNoSurcharge, mockSetPriceBreakdown);

    expect(mockSetPriceBreakdown).toHaveBeenCalledWith({
      cartValue,
      deliveryFee,
      deliveryDistance,
      smallOrderSurcharge: 5, // €20 - €15 = €5
      totalPrice: 25, // €15 (cart) + €5 (delivery) + €5 (surcharge)
    });
  });
});
