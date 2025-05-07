import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VendorSignUp from "./vendor/sign-up";
import VendorHomeScreen from "./vendor/home";
import VendorDashboard from "./vendor/dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={VendorHomeScreen} />
      <Stack.Screen name="Vendor Sign Up" component={VendorSignUp} />
      <Stack.Screen name="Dashboard" component={VendorDashboard} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
