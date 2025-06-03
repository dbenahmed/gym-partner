// app/index.js
import { Redirect } from "expo-router";
import { useEffect } from "react";
import useAuth from "@/context/authContext";
import SplashScreen from "@/components/SplashScreen";
import useTheme from "@/context/themeContext";

export default function Index() {

  const { authenticated, splashLoading } = useAuth();
  const { theme, colors } = useTheme();


  console.log('theme', theme);
  if (splashLoading) {
    return <SplashScreen />
  }

  if (authenticated) { // logged in 
    return <Redirect href="/(protected)/mealsHome" />;
  }

  return <Redirect href="/(auth)/landing" />;
}


