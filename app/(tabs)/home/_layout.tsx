import { Drawer } from "expo-router/drawer";

export default function HomeDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // keeps your single header from index
        drawerPosition: "left",
      }}
    />
  );
}
