import { BackButton } from "@/components/BackButton";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const accountAndSecurityMenu = () => {
  const router = useRouter();
  const items = [{ label: "Delete Business" }];

  return (
    <SafeAreaView style={styles.container}>
      <BackButton route="/vendor/dashboard" />
      <Text>Account and Security</Text>
      <View>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item as any)}
          >
            <Text>{item.label}</Text>
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
});

export default accountAndSecurityMenu;
