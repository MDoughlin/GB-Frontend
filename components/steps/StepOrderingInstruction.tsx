import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
  formData: {
    order_instructions: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepOrderingInstruction({ formData, setFormData }: Props) {
  return (
    <View>
      <Text style={styles.heading}>Ordering</Text>
      <Text>How do patrons order?</Text>
      <TextInput
        style={styles.orderInput}
        value={formData.order_instructions}
        onChangeText={(text) =>
          setFormData((prev: any) => ({ ...prev, order_intstructions: text }))
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
    width: "98%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginTop: 150,
  },
  orderInput: {
    borderWidth: 1,
    borderColor: "black",
    height: 100,
    padding: 10,
    width: "98%",
    borderRadius: 5,
    marginTop: 20,
  },
});
