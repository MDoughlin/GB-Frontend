import React from "react";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}
