import { useState } from "react"

export const GetLocation = () => {
  const [userLatitude, setUserLatitude] = useState<string>("0")
  const [userLongitude, setUserLongitude] = useState<string>("0")

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLatitude(position.coords.latitude.toString())
          setUserLongitude(position.coords.longitude.toString())
        },
        (error) => {
          alert("Could not get location: " + error.message)
        }
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }
  return {
    userLatitude,
    userLongitude,
    getLocation,
    setUserLatitude,
    setUserLongitude,
  }
}
