import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert } from "react-native";
export default function CollectionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerShown: false,
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "rgba(255,255,255,0.9)",
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
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
