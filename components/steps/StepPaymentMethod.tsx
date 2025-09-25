import { View, Text, TextInput, StyleSheet } from "react-native";
import { CheckBox } from "../CheckBox";

type Props = {
  formData: {
    payment_method: [];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepPaymentMethod({ formData, setFormData }: Props) {
  return (
    <View>
      <Text style={styles.heading}>Payment</Text>
      <Text>What form of payments do you accept?</Text>
      <CheckBox
        options={[
          { label: "Cash", value: "Cash" },
          { label: "Credit", value: "Credit / Debit Card" },
          { label: "FirstPay", value: "1st Pay" },
          { label: "CIBC", value: "CIBC Transfer" },
        ]}
        checkedValues={formData.payment_method}
        onChange={(updatedArray: any) =>
          setFormData((prev: any) => ({
            ...prev,
            payment_method: updatedArray,
          }))
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
