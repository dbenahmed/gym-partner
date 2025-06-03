import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert } from "react-native";

import Colors from "@/constants/Colors";
import useThemeContext from "@/context/themeContext"; // Replace with real path

export default function CollectionsLayout() {
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
        name="index"
        options={{
          title: "My Collections",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="/[collectionId]/index"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="/[collectionId]/[planId]/index"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
