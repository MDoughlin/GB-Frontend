// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import "react-native-reanimated";
// import { Provider } from "react-redux";
// import { store } from "../store/store";

// import { useColorScheme } from "@/hooks/useColorScheme";
// import VendorSignUp from "./vendor/sign-up";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <Stack screenOptions={{ headerShown: false }}>
//           {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="index" options={{ headerShown: false }} />
//         <Stack.Screen name="vendor/sign-up" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" /> */}
//         </Stack>
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </Provider>
//   );
// }

import React from "react";
import { Provider } from "react-redux";
import { Slot } from "expo-router";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
