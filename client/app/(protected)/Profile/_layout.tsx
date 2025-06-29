import { Stack } from "expo-router";

import useThemeContext from "@/context/themeContext";

export default function Layout() {
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
          title: "Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="body-weight-tracking"
        options={{
          title: "Body Weight Tracking",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
