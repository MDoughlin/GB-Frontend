import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const VendorHomeScreen = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:3000/vendor/");
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors", error);
      }
    };
    fetchVendors();
  }, []);

  const renderVendor = ({ item }) => (
    <TouchableOpacity
      style={styles.circle}
      onPress={() => router.push(`/vendor/dashboard`)}
    >
      <Text style={styles.circleText}>{item.business_name.charAt(0)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {vendors.length > 0 ? (
        <>
          <FlatList
            data={vendors}
            keyExtractor={(item) => item.id}
            renderItem={renderVendor}
          />
          <TouchableOpacity
          // style={styles.circle}
          // onPress={() => router.push("/vendor/dashboard")}
          >
            {/* <Text style={styles.circleText}>{dummyVendor.name.charAt(0)}</Text> */}
            <MaterialCommunityIcons
              style={styles.addButton}
              name="plus-circle-outline"
              size={40}
              onPress={() => router.push("/vendor/sign-up")}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Welcome to GB!</Text>
          <Button
            title="Go to Sign Up"
            onPress={() => router.push("/vendor/sign-up")}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    left: 275,
    top: 650,
  },
});

export default VendorHomeScreen;
