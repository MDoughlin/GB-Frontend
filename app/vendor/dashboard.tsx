import { useRouter } from "expo-router";
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

  const dashboardItens = [
    { label: "Business Information", path: "/vendor/businessInfo" },
    { label: "Menu", path: "/vendor/menu" },
    { label: "Customer Engagement", path: "/vendor/analytics" },
    { label: "Account and Security", path: "/vendor/account" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.circle} />
      <View style={styles.dashboardList}>
        {dashboardItens.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.path as any)}
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
