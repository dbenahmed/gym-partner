import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert } from "react-native";

import Colors from "@/constants/Colors";

export default function CollectionsLayout() {
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
