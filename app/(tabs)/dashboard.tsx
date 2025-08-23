import { useRouter, useLocalSearchParams } from "expo-router";
import { BackButton } from "@/components/BackButton";

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const VendorDashboard = () => {
  const router = useRouter();
  const { vendorId } = useLocalSearchParams();

  const dashboardItems = [
    { label: "Business Information", path: "/vendor/businessInformation" },
    { label: "Menu", path: "/vendor/menu" },
    { label: "Customer Engagement", path: "/vendor/analytics" },
    { label: "Account and Security", path: "/vendor/accountAndSecurityMenu" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton route="/vendor/home" />
      <View style={styles.dashboardList}>
        {dashboardItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: item.path as any,
                params: { title: item.label, vendorId },
              })
            }
            style={styles.dashboardItem}
          >
            <Text style={styles.dashboardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#aaa",
    marginBottom: 40,
    marginTop: 60,
  },
  dashboardItem: {
    marginBottom: 20,
  },
  dashboardList: {
    width: "80%",
  },
  dashboardText: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 70,
  },
});

export default VendorDashboard;
