import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  route?: string;
};

export function BackButton(props: Props = { route: "/" }) {
  const router = useRouter();

  const handleRoute = () => {
    if (props.route) {
      router.push(props.route as any);
    } else {
      router.push("/");
    }
  };

  return (
    <TouchableOpacity onPress={handleRoute}>
      <MaterialIcons name="arrow-back-ios-new" size={30} />
    </TouchableOpacity>
  );
}
