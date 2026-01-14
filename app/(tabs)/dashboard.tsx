import { useRouter, useLocalSearchParams } from "expo-router";

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

  const BusinessItems = [
    { label: "Business Information", path: "/vendor/businessInformation" },
    { label: "Menu Management", path: "/vendor/menu" },
    { label: "Customer Engagement", path: "/vendor/analytics" },
    { label: "Reviews", path: "" },
    { label: "Analytics", path: "" },
  ];

  const AccountItems = [
    { label: "Account Settings", path: "/vendor/accountAndSecurityMenu" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboardList}>
        <Text style={styles.header}>Business</Text>
        {BusinessItems.map((item, index) => (
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
        <Text style={styles.header}>Account</Text>
        {AccountItems.map((item, index) => (
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
    marginTop: 40,
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
    paddingLeft: 20,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default VendorDashboard;
