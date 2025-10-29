// Load polyfills first
import "../polyfill-entry.js";
import { Redirect } from "expo-router";

export default function Index() {
  // Redirect users straight into your tabs → home screen
  return <Redirect href="/(tabs)/home" />;
}
