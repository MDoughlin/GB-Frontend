import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";

type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

type BuinessHours = {
  [key in Weekday]: string;
};

type Props = {
  formData: {
    business_hours: BuinessHours;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepBusinessHours({ formData, setFormData }: Props) {
  return (
    <ScrollView>
      <View>
        <Text style={styles.heading}>Business Hours</Text>
        {Object.keys(formData.business_hours).map((day) => (
          <View key={day}>
            <Text>{day}:</Text>
            <TextInput
              key={day}
              style={styles.businessInput}
              placeholder={`${day} Hours`}
              value={formData.business_hours[day as Weekday]}
              onChangeText={(text) =>
                setFormData((prev: any) => ({
                  ...prev,
                  business_hours: {
                    ...prev.business_hours,
                    [day]: text,
                  },
                }))
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  businessInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "98%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 25,
    marginTop: 10,
    marginLeft: 5,
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
