import { useRouter } from "expo-router";
import React from "react";
import {
  TouchableOpacity,
  Text,
  TextStyle,
  ViewStyle,
  StyleSheet,
  GestureResponderEvent,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Props = {
  label: string;
  route: string;
  onPress?: (event: GestureResponderEvent) => void;
  navigateTo?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Button({
  label,
  onPress,
  navigateTo,
  icon,
  style,
  textStyle,
}: Props) {
  const router = useRouter();

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
    } else if (navigateTo) {
      router.push(navigateTo as any);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      {/* {icon && <View style={styles.icon}>{icon}</View>} */}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FBBC05",
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  label: {},
});
