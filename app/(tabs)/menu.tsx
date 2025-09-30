import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setVendorData } from "@/store/vendorSlice";
import { BackButton } from "../../components/BackButton";
import {
  Text,
  SafeAreaView,
  Button,
  View,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

const VendorMenu = () => {
  const router = useRouter();
  // const { title } = useLocalSearchParams();
  const vendorId = useSelector((state: any) => state.vendor.vendorId);
  const [menuItems, setMenuItems] = useState([
    {
      id: "1",
      item: "Cheeseburger",
      price: "8.99",
      imageUrl:
        "https://californiaavocado.com/wp-content/uploads/2021/03/Classic-Calif-Avocado-Cheeseburger-with-Carmelized-Onions-CAC-001-cropped-1014x676.jpg",
    },
    {
      id: "2",
      item: "Veggie Wrap",
      price: "6.49",
      imageUrl:
        "https://www.superhealthykids.com/wp-content/uploads/2023/08/veggie-wrap-3.jpg",
    },
    {
      id: "3",
      item: "Chicken Tenders",
      price: "9.25",
      imageUrl: "https://example.com/chicken-tenders.jpg",
    },
  ]);

  console.log("Redux vendorId", vendorId);

  useEffect(() => {
    console.log("Vendor ID", vendorId);
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `http://10.0.0.167:3000/menu/vendor/${vendorId}`
        );
        const data = await response.json();
        console.log("Menu items from backend", data);
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu", error);
      }
    };
    if (vendorId) {
      fetchMenuItems();
    }
  }, [vendorId]);

  return (
    <SafeAreaView>
      <View>{/* <Text>{title}</Text> */}</View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.item}</Text>
              <Text style={styles.price}>
                ${parseFloat(item.price).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text
              style={{ padding: 16, textAlign: "center", fontWeight: "bold" }}
            >
              No Items yet
            </Text>
            <Text style={{ padding: 16, textAlign: "center" }}>
              Start adding items to your menu to showcase your delicious meals.
            </Text>
          </View>
        }
      />
      <Button
        title="Add Item"
        onPress={() => router.push("/vendor/menu-item")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  price: {
    marginTop: 2,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 3,
  },
});

export default VendorMenu;
