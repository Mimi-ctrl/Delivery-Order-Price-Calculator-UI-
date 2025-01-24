import { renderHook, act } from "@testing-library/react";
import { GetLocation } from "../GetLocation";

describe("GetLocation Hook", () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };

  beforeAll(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default latitude and longitude", () => {
    const { result } = renderHook(() => GetLocation());

    expect(result.current.userLatitude).toBe("0");
    expect(result.current.userLongitude).toBe("0");
  });

  it("updates latitude and longitude on successful geolocation", async () => {
    const mockPosition = {
      coords: {
        latitude: 60.1699,
        longitude: 24.9384,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(mockPosition)
    );

    const { result } = renderHook(() => GetLocation());

    act(() => {
      result.current.getLocation();
    });

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    expect(result.current.userLatitude).toBe("60.1699");
    expect(result.current.userLongitude).toBe("24.9384");
  });

  it("alerts an error message on geolocation failure", () => {
    const mockError = { message: "Permission denied" };
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_success, error) => error(mockError)
    );

    const { result } = renderHook(() => GetLocation());

    act(() => {
      result.current.getLocation();
    });

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "Could not get location: Permission denied"
    );

    alertMock.mockRestore();
  });

  it("alerts if geolocation is not supported", () => {
    const originalGeolocation = global.navigator.geolocation;

    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });
    
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const { result } = renderHook(() => GetLocation());

    act(() => {
      result.current.getLocation();
    });

    expect(alertMock).toHaveBeenCalledWith(
      "Geolocation is not supported by your browser."
    );

    Object.defineProperty(global.navigator, "geolocation", {
      value: originalGeolocation,
      configurable: true,
    });

    alertMock.mockRestore();
  });
});
