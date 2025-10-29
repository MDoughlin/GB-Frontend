import { useRouter, useLocalSearchParams } from "expo-router";
import { useMemo, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

interface MenuItem {
  label: string;
  path: string;
}

const VendorDashboard = () => {
  const router = useRouter();
  const { vendorId } = useLocalSearchParams();

  // Moved outside component to prevent recreation on every render
  const BUSINESS_ITEMS: MenuItem[] = [
    { label: "Business Information", path: "/vendor/businessInformation" },
    { label: "Menu Management", path: "/vendor/menu" },
    { label: "Customer Engagement", path: "/vendor/analytics" },
    { label: "Reviews", path: "" },
    { label: "Analytics", path: "" },
  ];

  const ACCOUNT_ITEMS: MenuItem[] = [
    { label: "Account Settings", path: "/vendor/accountAndSecurityMenu" },
  ];

  const sections = useMemo(
    () => [
      { title: "Business", items: BUSINESS_ITEMS },
      { title: "Account", items: ACCOUNT_ITEMS },
    ],
    []
  );

  const handlePress = useCallback(
    (item: MenuItem) => {
      if (!item.path) return;
      
      router.push({
        pathname: item.path as any,
        params: { title: item.label, vendorId },
      });
    },
    [router, vendorId]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboardList}>
        {sections.map((section) => (
          <View key={section.title}>
            <Text style={styles.header}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => handlePress(item)}
                style={[
                  styles.dashboardItem,
                  !item.path && styles.disabledItem,
                ]}
                disabled={!item.path}
              >
                <Text
                  style={[
                    styles.dashboardText,
                    !item.path && styles.disabledText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
  dashboardList: {
    width: "80%",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 18,
  },
  dashboardItem: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  disabledItem: {
    opacity: 0.5,
  },
  dashboardText: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 20,
  },
  disabledText: {
    color: "#999",
  },
});

export default VendorDashboard;


