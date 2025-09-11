import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  getCurrentLocation,
  reverseGeocodeWithNominatim,
} from "@/services/location";

type Props = {
  formData: {
    // business_address: string;
    location: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepBusinessAddress({ formData, setFormData }: Props) {
  return (
    <View>
      <Text style={styles.heading}>Location</Text>
      <Text style={styles.details}>Pin My Location</Text>
      <TouchableOpacity
        onPress={async () => {
          try {
            const coords = await getCurrentLocation();
            const address = await reverseGeocodeWithNominatim(
              coords.latitude,
              coords.longitude
            );

            setFormData((prev: any) => ({
              ...prev,
              location: address,
            }));
          } catch (error) {
            if (error instanceof Error) {
              alert("Could not get location: " + error.message);
            } else {
              alert("Could not get location: An unknown error occurred.");
            }
          }
        }}
      >
        {" "}
        <Icon name="location-outline" size={400} />
      </TouchableOpacity>
      {formData.location !== "" && (
        <View>
          <Text>Location Pinned:</Text>
          <Text>{formData.location}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  details: {
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "98%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginTop: 150,
  },
});
