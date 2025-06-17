import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackButton } from "@/components/BackButton";
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
      <Text style={styles.value}>
        {Array.isArray(value) ? value.join(", ") : value || "N/A"}
      </Text>
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
  const [cuisineOptions, setCuisineOptions] = useState<string[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!vendorId) return;

    const fetchData = async () => {
      try {
        const [vendorRes, cuisineRes, paymentRes] = await Promise.all([
          fetch(`http://10.0.0.167:3000/vendor/${vendorId}`),
          fetch("http://10.0.0.167:3000/vendor/options/cuisine-types"),
          fetch("http://10.0.0.167:3000/vendor/options/payment-methods"),
        ]);

        const vendorData = await vendorRes.json();
        const cuisines = await cuisineRes.json();
        const payments = await paymentRes.json();

        setVendor(vendorData);
        setCuisineOptions(cuisines);
        setPaymentOptions(payments);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [vendorId]);

  const handleEdit = (
    field: string,
    value: string | string[] | object,
    options?: string[]
  ) => {
    router.push({
      pathname: "/vendor/editVendor",
      params: {
        vendorId,
        field,
        value: JSON.stringify(value),
        ...(options ? { options: JSON.stringify(options) } : {}),
      },
    });
  };

  if (!vendor) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <BackButton />
      <Text>Business Information</Text>
      <InfoRow
        label="Business Name"
        value={vendor.business_name}
        onEdit={() => handleEdit("business_name", vendor.business_name)}
      />
      <InfoRow
        label="Phone Number"
        value={vendor.phone_number}
        onEdit={() => handleEdit("phone_number", vendor.phone_number)}
      />
      <InfoRow
        label="Business Hours"
        value={Object.entries(vendor.business_hours)
          .map(([day, hours]) => `${day}: ${hours}`)
          .join(", ")}
        onEdit={() => handleEdit("business_hours", vendor.business_hours)}
      />
      <InfoRow
        label="Instagram"
        value={vendor.instagram_url}
        onEdit={() => handleEdit("instagram_url", vendor.instagram_url)}
      />
      <InfoRow
        label="Facebook"
        value={vendor.facebook_url}
        onEdit={() => handleEdit("facebook_url", vendor.facebook_url)}
      />
      <InfoRow
        label="Location"
        value={vendor.location}
        onEdit={() => handleEdit("location", vendor.location)}
      />
      <InfoRow
        label="Payment Methods"
        value={vendor.payment_method}
        onEdit={() =>
          handleEdit("payment_method", vendor.payment_method, paymentOptions)
        }
      />
      <InfoRow
        label="Order Instructions"
        value={vendor.order_instructions}
        onEdit={() =>
          handleEdit("order_instructions", vendor.order_instructions)
        }
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
  value: {},
});

export default businessInformation;
