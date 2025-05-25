import { useRouter } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../store/hooks";
import { setVendorId } from "@/store/vendorSlice";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

const VendorHomeScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
      onPress={() => {
        dispatch(setVendorId(item.id));
        router.push({
          pathname: `/vendor/dashboard`,
          params: { vendorId: item.id },
        });
      }}
    >
      <Text style={styles.circleText}>{item.business_name.charAt(0)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {vendors.length > 0 ? (
          <>
            <Text>CTA</Text>
            <FlatList
              data={vendors}
              keyExtractor={(item) => item.id}
              renderItem={renderVendor}
              horizontal={true}
              contentContainerStyle={{ gap: 12 }}
            />
            <TouchableOpacity>
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
            <Text>CTA</Text>
            <Text>Let's Add Your Establishment</Text>
            <MaterialCommunityIcons
              style={styles.addButtonTwo}
              name="plus-circle-outline"
              size={40}
              onPress={() => router.push("/vendor/sign-up")}
            />
          </>
        )}
      </View>
    </SafeAreaView>
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
    flexDirection: "row",
  },
  circleText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    right: 20,
    botton: 30,
    borderRadius: 50,
  },
  addButtonTwo: {
    position: "absolute",
    left: 275,
    top: 650,
  },
});

export default VendorHomeScreen;
