import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

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
  const [businessHourMode, setBusinessHourMode] = useState<"daily" | "uniform">(
    "daily"
  );
  const [uniformHours, setUniformHours] = useState("");

  const handleUniformChange = (text: string) => {
    setUniformHours(text);

    setFormData((prev: any) => {
      const updated: { [key: string]: string } = {};
      Object.keys(prev.business_hours).forEach((day) => {
        updated[day] = text;
      });
      return {
        ...prev,
        business_hours: updated,
      };
    });
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Business Hours</Text>
      <Text style={styles.subheading}>Set your business hours</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setBusinessHourMode("daily")}
        >
          <View
            style={[
              styles.radioCircle,
              businessHourMode === "daily" && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>Set hours for each day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setBusinessHourMode("uniform")}
        >
          <View
            style={[
              styles.radioCircle,
              businessHourMode === "uniform" && styles.selectedCircle,
            ]}
          />
          <Text style={styles.radioText}>Set a single set of hours</Text>
        </TouchableOpacity>
      </View>

      {businessHourMode === "daily" ? (
        Object.keys(formData.business_hours).map((day) => (
          <View key={day} style={styles.inputGroup}>
            <Text style={styles.dayLabel}>{day}</Text>
            <TextInput
              style={styles.input}
              placeholder={`${day} hours (e.g. 9am - 5pm)`}
            />
          </View>
        ))
      ) : (
        <View style={styles.inputGroup}>
          <Text style={styles.dayLabel}>All Days</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9am - 5pm"
            value={uniformHours}
            onChangeText={handleUniformChange}
          />
        </View>
      )}
    </ScrollView>
    // <ScrollView>
    //   <View>
    //     <Text style={styles.heading}>Business Hours</Text>
    //     {Object.keys(formData.business_hours).map((day) => (
    //       <View key={day}>
    //         <Text>{day}:</Text>
    //         <TextInput
    //           key={day}
    //           style={styles.businessInput}
    //           placeholder={`${day} Hours`}
    //           value={formData.business_hours[day as Weekday]}
    //           onChangeText={(text) =>
    //             setFormData((prev: any) => ({
    //               ...prev,
    //               business_hours: {
    //                 ...prev.business_hours,
    //                 [day]: text,
    //               },
    //             }))
    //           }
    //         />
    //       </View>
    //     ))}
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  radioGroup: {
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    borderColor: "#000",
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "98%",
    alignSelf: "center",
  },
  dayLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
});
