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
        options={{ headerShown: false, title: "Meals" }}
      />
    </Stack>
  );
}
