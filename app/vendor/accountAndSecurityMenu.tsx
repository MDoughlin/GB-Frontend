import { BackButton } from "@/components/BackButton";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type ValidPaths = "/vendor/DeleteBusiness";

const accountAndSecurityMenu = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const vendorId = useSelector((state: RootState) => state.vendor.vendorId);

  const items: { label: string; path: ValidPaths }[] = [
    { label: "Delete Business", path: "/vendor/DeleteBusiness" },
  ];
  console.log("vendorId from Redux:", vendorId);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton route="/vendor/dashboard" />
      <Text>{title}</Text>
      <View>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (!vendorId) {
                console.warn("vendorId is undefined");
                return;
              }
              router.push({
                pathname: item.path,
                params: { vendorId },
              });
            }}
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
