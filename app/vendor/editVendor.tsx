import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const EditVendor = () => {
  const router = useRouter();
  const { field, value, vendorId } = useLocalSearchParams();
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | string[]>(
    value
      ? field === "cuisine_type" || field === "payment_method"
        ? JSON.parse(value as string)
        : value
      : ""
  );

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        if (field === "cuisine_type" || field === "payment_method") {
          const res = await fetch(
            `http://10.0.0.167:3000/vendor/options/${field}`
          );
          const data = await res.json();
          setOptions(data);
        }
      } catch (err) {
        console.error("Error fetching options", err);
      }
    };

    fetchOptions();
  }, []);

  const toggleSelection = (item: string) => {
    if (Array.isArray(inputValue)) {
      setInputValue((prev) =>
        (prev as string[]).includes(item)
          ? (prev as string[]).filter((i) => i !== item)
          : [...(prev as string[]), item]
      );
    }
  };

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
      {Array.isArray(inputValue) ? (
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.option,
                inputValue.includes(item) && styles.selected,
              ]}
              onPress={() => toggleSelection(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <TextInput
          value={String(inputValue)}
          onChangeText={setInputValue}
          style={styles.input}
        />
      )}
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
  option: {
    padding: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  selected: {
    backgroundColor: "#cce5ff",
  },
});

export default EditVendor;
