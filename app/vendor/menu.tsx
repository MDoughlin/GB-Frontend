import { useRouter } from "expo-router";
import { Text, SafeAreaView, Button } from "react-native";

const VendorMenu = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>Menu</Text>
      <Button
        title="Add Item"
        onPress={() => router.push("/vendor/menu-item")}
      />
    </SafeAreaView>
  );
};

export default VendorMenu;
