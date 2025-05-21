import { useRouter, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";
import { Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";

const DeleteBusiness = () => {
  const router = useRouter();
  const { vendorId } = useLocalSearchParams();
  console.log("VendorId:", vendorId);

  const handleDelete = () => {
    Alert.alert(
      "Confirm deletion",
      "Are you sure you want to delete your business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://10.0.0.167:3000/vendor/${vendorId}`,
                {
                  method: "DELETE",
                }
              );

              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
              }

              Alert.alert("Deleted", "Your business has been removed");
              router.push("/vendor/home");
            } catch (error) {
              console.error("Delete failed:", error);
              Alert.alert("Error", "Failed to delete business.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Delete Business</Text>
      <Text style={styles.warning}>
        This action is permanent and cannot be undone
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}> Delete Business</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  warning: {
    fontSize: 16,
    color: "red",
    marginBottom: 24,
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
export default DeleteBusiness;
