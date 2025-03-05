import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";

export default function RootLayout() {
  
  useFonts({
    'outfitr': require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfitb': require('@/assets/fonts/Outfit-Bold.ttf'),
  });

  return (
  <Stack screenOptions={{ headerShown: false }}>
  </Stack>
  );
}
