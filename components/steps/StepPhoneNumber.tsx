import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
  formData: {
    phone_number: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const formatPhoneNumber = (text: string) => {
  const cleaned = text.replace(/\D/g, "");
  const length = cleaned.length;

  if (length < 4) return cleaned;
  if (length < 7) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
};

export function StepPhoneNumber({ formData, setFormData }: Props) {
  const handlePhoneNumberFormat = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setFormData((prev: any) => ({ ...prev, phone_number: formatted }));
  };

  return (
    <View>
      <Text style={styles.heading}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={formData.phone_number}
        onChangeText={handlePhoneNumberFormat}
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
    alignSelf: "center",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginTop: 150,
  },
});
