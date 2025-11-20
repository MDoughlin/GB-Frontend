import { useRouter } from "expo-router";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  route?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function BackButton({ route = "/", onPress, style }: Props) {
  const router = useRouter();

  const handleRoute = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <TouchableOpacity onPress={handleRoute} style={style}>
      <MaterialIcons name="arrow-back-ios-new" size={30} />
    </TouchableOpacity>
  );
}
