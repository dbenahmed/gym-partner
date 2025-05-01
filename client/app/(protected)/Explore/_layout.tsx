import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

export default function ExploreLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        options={{ title: "Explore", headerShown: false }}
        name="index"
      />
      <Stack.Screen
        name="exercise/[exerciseId]"
        options={{
          title: "Exercise Details",
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="meals/[mealId]"
        options={{
          title: "Meal Details",

          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
