import { useRouter } from "expo-router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ActionButton } from "@/components/ActionButton";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

interface MenuItem {
  id: string;
  item: string;
  price: string;
  imageUrl?: string;
}

// TODO: Move to environment configuration
const API_BASE_URL = "http://10.0.0.167:3000";

const VendorMenu = () => {
  const router = useRouter();
  const vendorId = useSelector((state: RootState) => state.vendor.vendorId);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = useCallback(async () => {
    if (!vendorId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/menu/vendor/${vendorId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.statusText}`);
      }

      const data = await response.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching menu:", errorMessage);
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleRetry = () => {
    fetchMenuItems();
  };

  // const handleAddItem = () => {
  //   if (!vendorId) {
  //     Alert.alert("Error", "Vendor ID not found");
  //     return;
  //   }
  //   router.push("/vendor/menu-item");
  // };

  const renderMenuItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <View style={styles.menuItem}>
        <Image
          source={{ uri: item.imageUrl || "https://via.placeholder.com/60" }}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.warn(`Failed to load image for ${item.item}`)}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.item}</Text>
          <Text style={styles.price}>${parseFloat(item.price).toFixed(2)}</Text>
        </View>
      </View>
    ),
    []
  );

  const renderEmptyState = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Items yet</Text>
        <Text style={styles.emptyMessage}>
          Start adding items to your menu to showcase your delicious meals.
        </Text>
      </View>
    ),
    []
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FBBC05" />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <ActionButton label="Retry" onPress={handleRetry} />
        </View>
      );
    }

    return (
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderMenuItem}
        ListEmptyComponent={renderEmptyState}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
      {!loading && !error && (
        <View style={styles.buttonContainer}>
          <ActionButton label="Add Item" navigateTo="/vendor/menu-item" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  price: {
    marginTop: 2,
    fontSize: 14,
    color: "#666",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 3,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyTitle: {
    paddingBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  emptyMessage: {
    padding: 8,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    marginBottom: 16,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 16,
  },
});

export default VendorMenu;
