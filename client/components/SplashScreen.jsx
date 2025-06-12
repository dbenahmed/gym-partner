import React from "react";
import { ActivityIndicator, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import useThemeContext from "@/context/themeContext";


const SplashScreen = ({ children, hideLogo = true }) => {
  const { theme, colors } = useThemeContext();


  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      {
        !hideLogo && <Image source={require("@/assets/images/png.png")} style={styles.logo} />
      }
      {children}
      <ActivityIndicator size="large" color={colors.tint} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    dropShadowColor: "#000",
    dropShadowOffset: { width: 0, height: 2 },
    dropShadowOpacity: 0.25,
    dropShadowRadius: 3.84,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default SplashScreen;
