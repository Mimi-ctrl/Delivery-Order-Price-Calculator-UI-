import { getStaticData, getDynamicData, getVenueData } from "../api";
import { StaticData, DynamicData, ExtractedData } from "../../types/Data";

global.fetch = jest.fn();

describe("Venue Data API Functions", () => {
  const mockVenueSlug = "home-assignment-venue-helsinki";

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStaticData", () => {
    it("fetches static data successfully", async () => {
      const mockStaticData: StaticData = {
        venue_raw: {
          location: {
            coordinates: [24.9384, 60.1699],
          },
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStaticData,
      });

      const result = await getStaticData(mockVenueSlug);

      expect(fetch).toHaveBeenCalledWith(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${mockVenueSlug}/static`
      );
      expect(result).toEqual(mockStaticData);
    });

    it("throws an error when fetching static data fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getStaticData(mockVenueSlug)).rejects.toThrow(
        "Error with fetching static data: Not Found"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("throws an error when an exception occurs", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      await expect(getStaticData(mockVenueSlug)).rejects.toThrow(
        "Network Error"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getDynamicData", () => {
    it("fetches dynamic data successfully", async () => {
      const mockDynamicData: DynamicData = {
        venue_raw: {
          delivery_specs: {
            order_minimum_no_surcharge: 2000,
            delivery_pricing: {
              base_price: 500,
              distance_ranges: [
                { min: 0, max: 1000, a: 2, b: 0.1 },
                { min: 1000, max: 5000, a: 5, b: 0.05 },
              ],
            },
          },
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockDynamicData,
      });

      const result = await getDynamicData(mockVenueSlug);

      expect(fetch).toHaveBeenCalledWith(
        `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${mockVenueSlug}/dynamic`
      );
      expect(result).toEqual(mockDynamicData);
    });

    it("throws an error when fetching dynamic data fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Internal Server Error",
      });

      await expect(getDynamicData(mockVenueSlug)).rejects.toThrow(
        "Error with fetching dynamic data: Internal Server Error"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("throws an error when an exception occurs", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

      await expect(getDynamicData(mockVenueSlug)).rejects.toThrow(
        "Network Error"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getVenueData", () => {
    it("fetches and combines static and dynamic data correctly", async () => {
      const mockStaticData: StaticData = {
        venue_raw: {
          location: {
            coordinates: [24.9384, 60.1699],
          },
        },
      };

      const mockDynamicData: DynamicData = {
        venue_raw: {
          delivery_specs: {
            order_minimum_no_surcharge: 2000,
            delivery_pricing: {
              base_price: 500,
              distance_ranges: [
                { min: 0, max: 1000, a: 2, b: 0.1 },
                { min: 1000, max: 5000, a: 5, b: 0.05 },
              ],
            },
          },
        },
      };

      (fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockStaticData,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockDynamicData,
        });

      const result = await getVenueData(mockVenueSlug);

      const expectedExtractedData: ExtractedData = {
        coordinates: [24.9384, 60.1699],
        orderMinimumNoSurcharge: 20,
        basePrice: 5,
        distanceRanges: [
          { min: 0, max: 1000, a: 2, b: 0.1 },
          { min: 1000, max: 5000, a: 5, b: 0.05 },
        ],
      };

      expect(result).toEqual(expectedExtractedData);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("throws an error if either static or dynamic data fetching fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getVenueData(mockVenueSlug)).rejects.toThrow(
        "Error with fetching static data: Not Found"
      );
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
