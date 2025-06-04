import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
} from "react-native";

const EditVendor = () => {
  const router = useRouter();
  const { field, value, vendorId } = useLocalSearchParams();
  const [inputValue, setInputValue] = useState(value);

  const handleSave = async () => {
    try {
      await fetch(`http://10.0.0.167:3000/vendor/${vendorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field as string]: inputValue }),
      });
      router.back();
    } catch (error) {
      console.error("Failed to update vendor", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Edit {field}</Text>
      <TextInput
        value={
          Array.isArray(inputValue) ? inputValue.join(", ") : String(inputValue)
        }
        onChangeText={setInputValue}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default EditVendor;
