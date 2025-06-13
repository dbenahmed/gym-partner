import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/themeContext";
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import * as SystemUI from "expo-system-ui";
import useThemeContext from "@/context/themeContext";

import "../styles/globals.css";

export default function RootLayout() {
  useFonts({
    outfitr: require("@/assets/fonts/Outfit-Regular.ttf"),
    outfitb: require("@/assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <>
      <ThemeProvider>
        <InnerLayout />
      </ThemeProvider>
    </>
  );
}

function InnerLayout() {
  const { theme, colors, deviceTheme } = useThemeContext();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={theme === "light" ? "dark-content" : "light-content"}
        />
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </SafeAreaView>
    </>
  );
}
