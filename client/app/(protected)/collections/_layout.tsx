import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/app/contex/authcontex";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlansLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Collections",
        }}
      />
      <Stack.Screen
        name="(Plans)/index"
        options={{
          title: "Plans",
        }}
      />
      <Stack.Screen
        name="(Plans)/(Exercises)/index"
        options={{
          title: "Exercises",
        }}
      />
    </Stack>
  );
}
