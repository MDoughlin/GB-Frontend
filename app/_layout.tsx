import "react-native-gesture-handler";
import "react-native-reanimated";
// Global polyfills for Hermes compatibility
if (typeof global._toString === 'undefined') {
  (global as any)._toString = function(obj: any) {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    return obj.toString ? obj.toString() : String(obj);
  };
}

if (typeof global._from === 'undefined') {
  (global as any)._from = function(arrayLike: any) {
    return Array.from ? Array.from(arrayLike) : [].slice.call(arrayLike);
  };
}

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
