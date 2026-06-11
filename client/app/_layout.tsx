import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/themeContext";
import React, { useEffect } from "react";
import { Dimensions, StatusBar, useColorScheme, View } from "react-native";
import * as SystemUI from "expo-system-ui";
import useThemeContext from "@/context/themeContext";
import { LinearGradient } from "expo-linear-gradient";
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
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <StatusBar
          barStyle={theme === "light" ? "dark-content" : "light-content"}
        />
        <AuthProvider>
          {/* <LinearGradient
            colors={[colors.background, colors.tintLighter]} // Dark background → Light glow at bottom
            start={{ x: 0, y: 0 }} // Start from top (dark)
            end={{ x: 0, y: 1 }} // End at bottom (light glow)
            locations={[0.7, 1]} // Most of screen is dark, only bottom 30% has glow
            style={{
              flex: 1,
              height: screenHeight,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          /> */}

          <Slot />
        </AuthProvider>
      </SafeAreaView>
    </>
  );
}
