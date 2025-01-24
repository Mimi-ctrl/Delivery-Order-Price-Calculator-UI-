import { handleCalculateTotalPrice } from "../handleCalculateTotalPrice";
import { calculateDeliveryFee } from "../calculateDeliveryFee";
import { calculateDistance } from "../calculateDistance";
import { handleSetPriceBreakdown } from "../calculator";
import { ExtractedData } from "../../types/Data";

jest.mock("../calculateDeliveryFee");
jest.mock("../calculateDistance");
jest.mock("../calculator");

describe("handleCalculateTotalPrice", () => {
  const mockSetPriceBreakdown = jest.fn();
  const mockSetDeliveryNotAvailable = jest.fn();

  const mockVenueData: ExtractedData = {
    coordinates: [24.9384, 60.1699],
    basePrice: 500,
    distanceRanges: [
      { min: 0, max: 1000, a: 2, b: 0.1 },
      { min: 1000, max: 5000, a: 5, b: 0.05 },
    ],
    orderMinimumNoSurcharge: 2000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calculates the total price and updates the price breakdown for valid inputs", () => {
    const mockDistance = 800;
    const mockDeliveryFee = 5;

    (calculateDistance as jest.Mock).mockReturnValue(mockDistance);
    (calculateDeliveryFee as jest.Mock).mockReturnValue(mockDeliveryFee);

    handleCalculateTotalPrice(
      "15", // cartValue
      mockVenueData,
      "60.1700", // userLatitude
      "24.9410", // userLongitude
      mockSetPriceBreakdown,
      mockSetDeliveryNotAvailable
    );

    expect(calculateDistance).toHaveBeenCalledWith(
      60.17,
      24.941,
      60.1699,
      24.9384
    );
    expect(calculateDeliveryFee).toHaveBeenCalledWith(
      mockVenueData,
      "60.1700",
      "24.9410"
    );
    expect(handleSetPriceBreakdown).toHaveBeenCalledWith(
      15, // cartValue
      mockDeliveryFee,
      mockDistance,
      mockVenueData.orderMinimumNoSurcharge,
      mockSetPriceBreakdown
    );
    expect(mockSetDeliveryNotAvailable).not.toHaveBeenCalled();
  });

  it("sets delivery not available when deliveryFee is null", () => {
    (calculateDistance as jest.Mock).mockReturnValue(800);
    (calculateDeliveryFee as jest.Mock).mockReturnValue(null);

    handleCalculateTotalPrice(
      "15", // cartValue
      mockVenueData,
      "60.1700", // userLatitude
      "24.9410", // userLongitude
      mockSetPriceBreakdown,
      mockSetDeliveryNotAvailable
    );

    expect(calculateDistance).toHaveBeenCalledWith(
      60.17,
      24.941,
      60.1699,
      24.9384
    );
    expect(calculateDeliveryFee).toHaveBeenCalledWith(
      mockVenueData,
      "60.1700",
      "24.9410"
    );
    expect(mockSetDeliveryNotAvailable).toHaveBeenCalledWith(true);
    expect(handleSetPriceBreakdown).not.toHaveBeenCalled();
  });

  it("does nothing if venueData is null", () => {
    handleCalculateTotalPrice(
      "15", // cartValue
      null, // venueData
      "60.1700", // userLatitude
      "24.9410", // userLongitude
      mockSetPriceBreakdown,
      mockSetDeliveryNotAvailable
    );

    expect(calculateDistance).not.toHaveBeenCalled();
    expect(calculateDeliveryFee).not.toHaveBeenCalled();
    expect(handleSetPriceBreakdown).not.toHaveBeenCalled();
    expect(mockSetDeliveryNotAvailable).not.toHaveBeenCalled();
  });
});
