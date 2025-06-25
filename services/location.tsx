import * as Location from "expo-location";

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
};

export const reverseGeocodeWithNominatim = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          "User-Agent": "GB/1.0 MDoughlin@hotmail.com", //will have to change this email
        },
      }
    );
    const data = await response.json();
    return data.display_name; // full address string
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
  }
};
