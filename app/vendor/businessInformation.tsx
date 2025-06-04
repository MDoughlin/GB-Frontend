import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

interface Vendor {
  business_name: string;
  phone_number: string;
  instagram_url: string;
  facebook_url: string;
  location: string;
  business_hours: { [day: string]: string };
  payment_method: string[];
  order_instructions: string;
  cuisine_type: string[];
}

type InfoRowProps = {
  label: string;
  value: string | string[];
  onEdit: () => void;
};

const InfoRow = ({ label, value, onEdit }: InfoRowProps) => (
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
  const router = useRouter();
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
        onEdit={() =>
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "business_name",
              value: vendor.business_name,
            },
          })
        }
      />
      <InfoRow
        label="Phone Number"
        value={vendor.phone_number}
        onEdit={() =>
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "phone_number",
              value: vendor.phone_number,
            },
          })
        }
      />
      <InfoRow
        label="Business Hours"
        value={Object.entries(vendor.business_hours)
          .map(([day, hours]) => `${day}: ${hours}`)
          .join(", ")}
        onEdit={() => {
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "business_hours",
              value: JSON.stringify(vendor.business_hours),
            },
          });
        }}
      />
      <InfoRow label="Location" value={vendor.location} onEdit={() => {}} />
      <InfoRow
        label="Instagram"
        value={vendor.instagram_url}
        onEdit={() => {
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "instagram_url",
              value: vendor.instagram_url,
            },
          });
        }}
      />
      <InfoRow
        label="Facebook"
        value={vendor.facebook_url}
        onEdit={() => {
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "facebook_url",
              value: vendor.facebook_url,
            },
          });
        }}
      />
      <InfoRow
        label="Payment Methods"
        value={vendor.payment_method}
        onEdit={() => {
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "payment_method",
              value: JSON.stringify(vendor.payment_method),
            },
          });
        }}
      />
      <InfoRow
        label="Order Instructions"
        value={vendor.order_instructions}
        onEdit={() => {
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "order_instructions",
              value: vendor.order_instructions,
            },
          });
        }}
      />
      <InfoRow
        label="Cuisine Type"
        value={vendor.cuisine_type}
        onEdit={() => {
          router.push({
            pathname: "/vendor/editVendor",
            params: {
              vendorId,
              field: "cuisine_type",
              value: JSON.stringify(vendor.cuisine_type),
            },
          });
        }}
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
