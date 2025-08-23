import { SetStateAction, useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const MenuItem = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [selected, setSelected] = useState("");
  const vendor = useSelector((state: RootState) => state.vendor);
  const vendorId = vendor.vendorId;
  const [formData, setFormdata] = useState({
    item: "",
    price: "",
    image: "",
    category: [],
  });

  const cuisine = [
    { key: "1", value: "Traditional Bajan" },
    { key: "2", value: "Caribbean" },
    { key: "3", value: "Seafood" },
    { key: "4", value: "International" },
    { key: "5", value: "Vegan and Vegetarian" },
    { key: "6", value: "Sweets and Treats" },
    { key: "7", value: "Drinks" },
  ];

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      vendor_id: vendorId,
      price: formData.price ? parseFloat(formData.price) : null,
    };
    console.log("SUBMIT PAYLOAD:", payload);
    console.log("Final Payload being sent:", payload);

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
      const data = await response.json();
      // if (data.id) {
      alert("Menu item added successfully!");
      router.back();
      // }
    } catch (error) {
      console.error("Error submitting menu item", error);
      alert("Failed to submit menu item. Please try again");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton route="/vendor/menu" />
      <Text style={styles.heading}>Add Item</Text>
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      <TextInput
        placeholder="Item Name"
        value={formData.item}
        onChangeText={(text) =>
          setFormdata((prev) => ({ ...prev, item: text }))
        }
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        value={formData.price}
        onChangeText={(text) =>
          setFormdata((prev) => ({ ...prev, price: text.trim() }))
        }
        style={styles.input}
      />
      <Text>Cuisine Type</Text>
      <MultipleSelectList
        setSelected={(val: SetStateAction<string>) => setSelected(val)}
        data={cuisine}
        save="value"
        label="Cuisine"
        search={false}
        boxStyles={{ width: 330, borderColor: "black" }}
      />
      <TouchableOpacity onPress={uploadImage} style={styles.photoBox}>
        <Text style={styles.boxText}>Upload Photo</Text>
        <Text>
          Add a photo of your dish to make it more {"\n"} appealing to customers
        </Text>
      </TouchableOpacity>
      <Button
        label="Add item"
        onPress={handleSubmit}
        style={{ minWidth: 350 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginTop: 12,
    fontSize: 32,
    marginBottom: 20,
  },
  boxText: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  image: {
    width: 200,
    height: 200,
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "85%",
    height: 50,
    borderRadius: 5,
    marginVertical: 0,
    marginBottom: 20,
  },
  photoBox: {
    width: 350,
    height: 200,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: " grey",
    marginBottom: 25,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MenuItem;
