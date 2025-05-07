import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Props = {
  route?: string;
};

export function BackButton(props: Props = { route: "/" }) {
  const router = useRouter();

  const handleRoute = () => {
    const destination = (props.route ?? "/") as any;
    router.push(destination);
  };

  return (
    <TouchableOpacity onPress={handleRoute} style={{ right: 150, top: 20 }}>
      <MaterialIcons name="arrow-back-ios-new" size={30} />
    </TouchableOpacity>
  );
}
