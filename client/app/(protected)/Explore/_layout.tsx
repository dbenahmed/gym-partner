import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

export default function ExploreLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: Colors.light.tint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Stack.Screen
        options={{ title: "Explore", headerShown: true }}
        name="index"
      />
      <Stack.Screen
        name="exercise/[exerciseId]"
        options={{
          title: "Exercise Details",
        }}
      />
      <Stack.Screen
        name="meals/[mealId]"
        options={{
          title: "Meal Details",
        }}
      />
    </Stack>
  );
}
