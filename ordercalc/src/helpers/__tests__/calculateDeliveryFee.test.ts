import { calculateDeliveryFee } from "../calculateDeliveryFee";
import { getCorrectDistanceRange } from "../getCorrectDistanceRange";
import { calculateDistance } from "../calculateDistance";
import { ExtractedData, DistanceRange } from "../../types/Data.ts"

jest.mock("../getCorrectDistanceRange", () => ({
  getCorrectDistanceRange: jest.fn(),
}));

jest.mock("../calculateDistance", () => ({
  calculateDistance: jest.fn(),
}));

describe("calculateDeliveryFee", () => {
  const mockVenueData: ExtractedData = {
    coordinates: [24.9384, 60.1699],
    orderMinimumNoSurcharge: 10,
    basePrice: 5,
    distanceRanges: [
      { min: 0, max: 1000, a: 2, b: 0.1 },
      { min: 1000, max: 5000, a: 5, b: 0.05 },
      { min: 5000, max: 0, a: 5, b: 0.05 },
    ],
  };

  it("calculates the delivery fee correctly for a valid range", () => {
    const mockDistance = 800;
    const mockDistanceRange: DistanceRange = { min: 0, max: 1000, a: 2, b: 0.1 };

    (calculateDistance as jest.Mock).mockReturnValue(mockDistance);
    (getCorrectDistanceRange as jest.Mock).mockReturnValue(mockDistanceRange);

    const userLatitude = "60.1700";
    const userLongitude = "24.9410";

    const result = calculateDeliveryFee(mockVenueData, userLatitude, userLongitude);

    expect(calculateDistance).toHaveBeenCalledWith(
      60.17,
      24.941,
      60.1699,
      24.9384
    );
    expect(getCorrectDistanceRange).toHaveBeenCalledWith(
      mockVenueData.distanceRanges,
      mockDistance
    );
    expect(result).toBe(15.0);
  });

  it("returns null when no valid distance range is found", () => {
    const mockDistance = 6000; // Distance in meters
    (calculateDistance as jest.Mock).mockReturnValue(mockDistance);
    (getCorrectDistanceRange as jest.Mock).mockReturnValue(null);

    const userLatitude = "60.1700";
    const userLongitude = "24.9410";

    const result = calculateDeliveryFee(mockVenueData, userLatitude, userLongitude);

    expect(calculateDistance).toHaveBeenCalledWith(
      60.17,
      24.941,
      60.1699,
      24.9384
    );
    expect(getCorrectDistanceRange).toHaveBeenCalledWith(
      mockVenueData.distanceRanges,
      mockDistance
    );
    expect(result).toBeNull();
  });
});
