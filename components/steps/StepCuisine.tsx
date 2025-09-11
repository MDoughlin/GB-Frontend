import { View, Text, TextInput, StyleSheet } from "react-native";
import { CheckBox } from "../CheckBox";

type Props = {
  formData: {
    cuisine_type: [];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepCuisine({ formData, setFormData }: Props) {
  return (
    <View>
      <Text style={styles.heading}>Cuisine</Text>
      <CheckBox
        options={[
          { label: "Traditional Bajan", value: "Traditional Bajan" },
          { label: "Caribbean", value: "Caribbean" },
          { label: "Seafood", value: "Seafood" },
          { label: "International", value: "International" },
          { label: "Fusion", value: "Fusion" },
          { label: "Vegan/Vegetarian", value: "Vegan/Vegetarian" },
          { label: "Sweets and Treats", value: "Sweets and Treats" },
          { label: "Drinks", value: "Drinks" },
        ]}
        checkedValues={formData.cuisine_type}
        onChange={(updatedArray: any) =>
          setFormData((prev: any) => ({ ...prev, cuisine_type: updatedArray }))
        }
        style={undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
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
