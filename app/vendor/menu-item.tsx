import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { BackButton } from "@/components/BackButton";
import { ActionButton } from "@/components/ActionButton";
import { MultiSelectDropdown } from "@/components/MultiSelectDropdown";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface FormData {
  item: string;
  price: string;
  image: string;
  category: string[];
}

interface CuisineOption {
  key: string;
  value: string;
}

const CUISINE_OPTIONS: CuisineOption[] = [
  { key: "1", value: "Traditional Bajan" },
  { key: "2", value: "Caribbean" },
  { key: "3", value: "Seafood" },
  { key: "4", value: "International" },
  { key: "5", value: "Vegan and Vegetarian" },
  { key: "6", value: "Sweets and Treats" },
  { key: "7", value: "Drinks" },
];

const MenuItem = () => {
  const router = useRouter();
  const vendorId = useSelector((state: RootState) => state.vendor.vendorId);

  const [image, setImage] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormdata] = useState<FormData>({
    item: "",
    price: "",
    image: "",
    category: [],
  });

  const uploadImage = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.item.trim() || !formData.price.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      category: selectedCategories,
      vendor_id: vendorId,
      price: parseFloat(formData.price),
    };

    try {
      const response = await fetch("http://10.0.0.167:3000/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      alert("Menu item added successfully!");
      router.back();
    } catch (error) {
      console.error("Error submitting menu item", error);
      alert("Failed to submit menu item. Please try again");
    }
  }, [formData, vendorId, router, selectedCategories]);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormdata((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCategoryChange = useCallback((values: string[]) => {
    setSelectedCategories(values);
    setFormdata((prev) => ({ ...prev, category: values }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton style={styles.backButton} route="/vendor/menu" />
      <Text style={styles.heading}>Add Item</Text>
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      <TextInput
        placeholder="Item Name"
        value={formData.item}
        onChangeText={(text) => updateField("item", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={(text) => updateField("price", text.trim())}
        style={styles.input}
      />
      <MultiSelectDropdown
        data={CUISINE_OPTIONS}
        label="Cuisine Type"
        placeholder="Select cuisine types"
        selectedValues={selectedCategories}
        onSelectionChange={handleCategoryChange}
        boxStyles={{ width: "85%" }}
      />
      <TouchableOpacity onPress={uploadImage} style={styles.photoBox}>
        <Text style={styles.boxText}>Upload Photo</Text>
        <Text style={styles.boxText}>
          Add a photo of your dish to make it more {"\n"} appealing to customers
        </Text>
      </TouchableOpacity>
      <ActionButton
        label="Add item"
        onPress={handleSubmit}
        style={{ minWidth: 350 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  backButton: {
    marginTop: 10,
    right: 160,
  },
  heading: {
    marginTop: 12,
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    width: "85%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    width: "85%",
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  photoBox: {
    width: 350,
    height: 200,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
    marginBottom: 25,
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  boxText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#333",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});

export default MenuItem;
