import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

interface Vendor {
  order_instructions: unknown;
  business_name: string;
  phone_number: string;
  instagram_url: string;
  facebook_url: string;
  location: string;
  payment_method: string[];
  order_instruction: string;
  cuisine_type: string[];
}

const InfoRow = ({ label, value, onEdit }) => (
  <View style={styles.row}>
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
    <TouchableOpacity onPress={onEdit}>
      <Text style={styles.edit}>Edit</Text>
    </TouchableOpacity>
  </View>
);

const businessInformation = () => {
  const { vendorId } = useLocalSearchParams();
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    console.log("Vendor ID:", vendorId);

    if (!vendorId) return;

    const fetchVendor = async () => {
      try {
        const response = await fetch(
          `http://10.0.0.167:3000/vendor/${vendorId}`
        );
        const data = await response.json();
        console.log("Fetched Vendor:", data);
        setVendor(data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };

    fetchVendor();
  }, [vendorId]);

  if (!vendor) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <Text>Business Information</Text>
      <InfoRow
        label="Business Name"
        value={vendor.business_name}
        onEdit={() => {}}
      />
      <InfoRow
        label="Phone Number"
        value={vendor.phone_number}
        onEdit={() => {}}
      />
      <InfoRow
        label="Business Hours"
        value={vendor.business_name}
        onEdit={() => {}}
      />
      <InfoRow label="Location" value={vendor.location} onEdit={() => {}} />
      <InfoRow
        label="Instagram"
        value={vendor.instagram_url}
        onEdit={() => {}}
      />
      <InfoRow label="Facebook" value={vendor.facebook_url} onEdit={() => {}} />
      <InfoRow
        label="Payment Methods"
        value={vendor.payment_method}
        onEdit={() => {}}
      />
      <InfoRow
        label="Order Instructions"
        value={vendor.order_instructions}
        onEdit={() => {}}
      />
      <InfoRow
        label="Cuisine Type"
        value={vendor.cuisine_type}
        onEdit={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: "#00267F",
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  edit: {},
});

export default businessInformation;
