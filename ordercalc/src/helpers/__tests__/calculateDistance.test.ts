import { calculateDistance } from "../calculateDistance";

describe("calculateDistance", () => {
  it("calculates the distance correctly between two points (same location)", () => {
    // Rautatientori
    const lat1 = 60.171124; 
    const lon1 = 24.943956;

    const distance = calculateDistance(lat1, lon1, lat1, lon1);

    expect(distance).toBeCloseTo(0, 1);
  });

  it("calculates the distance correctly between two close points", () => {
    // Rautatientori
    const lat1 = 60.171124; 
    const lon1 = 24.943956;
    // Helsinki Cathedral
    const lat2 = 60.170116;
    const lon2 = 24.952249;

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    expect(distance).toBeGreaterThan(0);
    expect(distance).toBeCloseTo(472, -1);
  });

  it("calculates the distance correctly between two distant points", () => {
    // Rautatientori
    const lat1 = 60.171124; 
    const lon1 = 24.943956;
    // Itis
    const lat2 = 60.210572;
    const lon2 = 25.081483;

    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    expect(distance).toBeCloseTo(8777, -1);
  });
});
