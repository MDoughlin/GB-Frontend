import { SetStateAction, useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MultipleSelectList } from "react-native-dropdown-select-list";
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add Item</Text>
      <TouchableOpacity onPress={uploadImage} style={styles.box}>
        <Text style={styles.boxText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TextInput placeholder="Item Name" style={styles.input} />
      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
      />
      <Text>Category</Text>
      <MultipleSelectList
        setSelected={(val: SetStateAction<string>) => setSelected(val)}
        data={cuisine}
        save="value"
        label="Cuisine"
        search={false}
      />
      {/* needs to submit and redirect to menu screen  */}
      <TouchableOpacity>
        <Text style={styles.button} onPress={() => router.push("/vendor/menu")}>
          Add Item
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginTop: 12,
    fontSize: 32,
    marginBottom: 20,
  },
  boxText: {
    position: "absolute",
    bottom: 3,
    right: 25,
  },
  box: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: " grey",
    marginBottom: 25,
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
  button: {
    backgroundColor: "#FBBC05",
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    color: "#fff",
    bottom: 0,
  },
});

export default MenuItem;
