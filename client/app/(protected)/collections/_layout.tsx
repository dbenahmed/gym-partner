import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert } from "react-native";
export default function CollectionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "Profile",
        headerTransparent: true,
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
          title: "Collections",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Plans/index"
        options={{
          title: "Plans",
        }}
      />
      <Stack.Screen
        name="Plans/Exercises/index"
        options={{
          title: "Exercises",
        }}
      />
    </Stack>
  );
}
