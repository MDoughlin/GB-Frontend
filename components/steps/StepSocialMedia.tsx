import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  formData: {
    instagram_url: string;
    facebook_url: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export function StepSocialMedia({ formData, setFormData }: Props) {
  <View>
    <Text style={styles.heading}>Social Media</Text>
    <Text style={styles.inputLabel}>Instagram Handle:</Text>
    <View style={styles.inputContainer}>
      <Icon style={styles.icon} name="logo-instagram" />
      <Text style={styles.staticPrefix}>www.instagram.com/</Text>
      <TextInput
        style={styles.socialInput}
        value={formData.instagram_url}
        onChangeText={(text) =>
          setFormData((prev: any) => ({
            ...prev,
            instagram_url: text.toLowerCase(),
          }))
        }
        placeholder="yourhandle"
      />
    </View>
    <Text style={styles.inputLabel}>Facebook:</Text>
    <View style={styles.inputContainer}>
      <Icon style={styles.icon} name="logo-facebook" />
      <Text style={styles.staticPrefix}>www.facebook.com/</Text>
      <TextInput
        style={styles.socialInput}
        value={formData.facebook_url}
        onChangeText={(text) =>
          setFormData((prev: any) => ({ ...prev, facebook_url: text }))
        }
        placeholder="username"
      ></TextInput>
    </View>
  </View>;
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
  icon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "98%",
  },
  inputLabel: {
    paddingTop: 5,
    marginBottom: 5,
  },
  socialInput: {
    flex: 1,
  },
});
