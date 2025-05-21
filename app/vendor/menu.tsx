import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, SafeAreaView, Button, View } from "react-native";
import { BackButton } from "@/components/BackButton";

const VendorMenu = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <BackButton />
      <View>
        <Text>{title}</Text>
        <Button
          title="Add Item"
          onPress={() => router.push("/vendor/menu-item")}
        />
      </View>
    </SafeAreaView>
  );
};

export default VendorMenu;
