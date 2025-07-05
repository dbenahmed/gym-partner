// app/index.js
import { Redirect } from "expo-router";
import { useEffect } from "react";
import useAuth from "@/context/authContext";
import SplashScreen from "@/components/SplashScreen";
import useTheme from "@/context/themeContext";
import { StyleSheet, Text, View } from "react-native";
import routes from "@/constants/routes";

export default function Index() {

  const { authenticated, splashLoading } = useAuth();
  const { theme, colors } = useTheme();


  console.log('theme', theme);
  if (splashLoading) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
      <SplashScreen hideLogo={false}>
        <Text style={[styles.title, { color: colors.text }]}>Gym Partner</Text>
      </SplashScreen>
    </View>
  }

  if (authenticated) { // logged in 
    return <Redirect href={routes.PROTECTED_HOME} />;
  }

  return <Redirect href={routes.LANDING} />;
}


const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});