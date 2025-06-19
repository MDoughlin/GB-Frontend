import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, SafeAreaView, Button, View } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BackButton } from "@/components/BackButton";

const VendorMenu = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const vendorId = useSelector((state: any) => state.vendorId);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `http://10.0.0.167:3000/menu/vendor/${vendorId}`
        );
        const data = await response.json();
        setMenu(data);
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
      <BackButton />
      <View>
        <Text>{title}</Text>
        <Button
          title="Add Item"
          onPress={() => router.push("/vendor/menu-item")}
        />
      </View>
    </SafeAreaView>
  );
};

export default VendorMenu;
