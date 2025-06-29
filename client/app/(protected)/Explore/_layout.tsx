import React from "react";
import { Stack, useRouter } from "expo-router";
import { Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import useThemeContext from "@/context/themeContext"; // Replace with real path

export default function ExploreLayout() {
  const router = useRouter();
  const { colors } = useThemeContext();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.tint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: colors.background,
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
          /* headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/Explore");
              }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.tint} />
            </Pressable>
          ), */
        }}
      />
      <Stack.Screen
        name="meals/[mealId]"
        options={{
          title: "Meal Details",
          /* headerLeft: () => (
            <Pressable
              onPress={() => {
                router.push("/Explore");
              }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.tint} />
            </Pressable>
          ), */
        }}
      />
    </Stack>
  );
}
