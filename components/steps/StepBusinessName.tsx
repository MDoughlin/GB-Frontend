import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
  formData: {
    business_name: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepBusinessName({ formData, setFormData }: Props) {
  return (
    <View>
      <Text style={styles.heading}>Business Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={formData.business_name}
        onChangeText={(text) =>
          setFormData((prev: any) => ({ ...prev, business_name: text }))
        }
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
    width: "95%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginTop: 150,
    alignSelf: "center",
  },
});
