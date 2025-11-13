// polyfills are loaded from the app entry; avoid loading here to preserve init order

import { Drawer } from "expo-router/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  DrawerNavigationProp,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

function CustomHeader() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ marginLeft: 10 }}
    >
      <MaterialCommunityIcons name="menu" size={26} color="#000" />
    </TouchableOpacity>
  );
}

function CustomDrawerContent() {
  const router = useRouter();
  const [vendors, setVendors] = useState<any[]>([]);

  //this needs to move to the drawer
  // useEffect(() => {
  //   const fetchVendors = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/vendor/");
  //       const data = await response.json();
  //       setVendors(data || []);
  //     } catch (error) {
  //       console.error("Error fetching vendors", error);
  //     }
  //   };
  //   fetchVendors();
  // }, []);

  useEffect(() => {
    // ✅ Comment out fetch and use dummy vendors instead
    const dummyVendors = [
      {
        id: "1",
        business_name: "Sunset Grille",
        owner: "Alicia King",
        phone_number: "(246) 555-1234",
        email: "sunsetgrille@example.com",
      },
      {
        id: "2",
        business_name: "Tropical Treats",
        owner: "Marcus Best",
        phone_number: "(246) 555-5678",
        email: "tropicaltreats@example.com",
      },
      {
        id: "3",
        business_name: "Bajan Bites",
        owner: "Naomi Foster",
        phone_number: "(246) 555-9876",
        email: "bajanbites@example.com",
      },
    ];
    setVendors(dummyVendors);
  }, []);

  return (
    <DrawerContentScrollView style={{ paddingTop: 60 }}>
      <Text style={styles.drawerTitle}>Your Businesses</Text>

      {vendors.map((vendor) => (
        <TouchableOpacity
          key={vendor.id}
          onPress={() =>
            router.push({
              pathname: "/vendor/dashboard",
              params: { vendorId: vendor.id },
            } as any)
          }
          style={styles.drawerItem}
        >
          <Text style={styles.drawerText}>{vendor.business_name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.drawerItem, { marginTop: 15 }]}
        onPress={() => router.push("/vendor/sign-up" as any)}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={22}
          color="#2E6CF6"
        />
        <Text
          style={{
            color: "#2E6CF6",
            fontSize: 16,
            marginLeft: 8,
            fontWeight: "600",
          }}
        >
          Add New Business
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function HomeDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitle: "Home",
        headerLeft: () => <CustomHeader />,
        drawerPosition: "left",
        swipeEnabled: true,
      }}
      drawerContent={(props) => <CustomDrawerContent />}
    >
      <Drawer.Screen name="index" />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerText: {
    fontSize: 16,
    color: "#333",
  },
});
