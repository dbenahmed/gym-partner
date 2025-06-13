import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/themeContext";
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import * as SystemUI from "expo-system-ui";
import useThemeContext from "@/context/themeContext";

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
  const { theme, colors } = useThemeContext();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("black");
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </SafeAreaView>
    </>
  );
}
