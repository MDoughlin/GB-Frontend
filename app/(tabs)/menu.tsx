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
} from "react-native";

const VendorMenu = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const vendorId = useSelector((state: any) => state.vendor.vendorId);
  const [menuItems, setMenuItems] = useState([]);

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
      <View>
        <Text>{title}</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.name}>{item.item}</Text>
            <Text style={styles.price}>
              ${parseFloat(item.price).toFixed(2)}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <>
            <Text
              style={{ padding: 16, textAlign: "center", fontWeight: "bold" }}
            >
              No Items yet
            </Text>
            <Text style={{ padding: 16, textAlign: "center" }}>
              Start adding items to your menu to showcase your delicious meals.
            </Text>
          </>
        }
      />
      <Button
        title="Add Item"
        onPress={() => router.push("/vendor/menu-item")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default VendorMenu;
