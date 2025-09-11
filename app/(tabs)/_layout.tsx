import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs screenOptions={{}}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="fastfood" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
