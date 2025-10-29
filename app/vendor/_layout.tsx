import { Stack } from "expo-router";

export default function VendorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="businessInformation" />
      <Stack.Screen name="accountAndSecurityMenu" />
      <Stack.Screen name="editVendor" />
      <Stack.Screen name="menu-item" />
      <Stack.Screen name="DeleteBusiness" />
    </Stack>
  );
}



