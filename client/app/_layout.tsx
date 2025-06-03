import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/themeContext";
import React from "react";

export default function RootLayout() {
  useFonts({
    outfitr: require("@/assets/fonts/Outfit-Regular.ttf"),
    outfitb: require("@/assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}
