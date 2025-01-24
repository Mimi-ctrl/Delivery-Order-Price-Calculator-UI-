export const calculateDistance = (
  latit1: number, // UserLatutide
  longt1: number, // UserLongitude
  latit2: number,
  longt2: number
): number => {
  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180
  const eathRadiusMeters = 6371000
  const latitude1 = degreesToRadians(latit1)
  const latitude2 = degreesToRadians(latit2)

  const latitudeDifference = degreesToRadians(latit2 - latit1)
  const longitudeDifference = degreesToRadians(longt2 - longt1)

  const step1 = Math.sin(latitudeDifference / 2)
  const step2 = Math.sin(longitudeDifference / 2)

  const calculation =
    step1 * step1 + Math.cos(latitude1) * Math.cos(latitude2) * step2 * step2
  const centralAngle =
    2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation))
  const distance = eathRadiusMeters * centralAngle

  // Distance in meters
  return distance
}
