// app/index.js
import { Redirect } from "expo-router";
import { useEffect } from "react";
import useAuth from "@/app/contex/authcontex";
import SplashScreen from "@/components/SplashScreen";


export default function Index() {

  const { authenticated, splashLoading } = useAuth();

  if (splashLoading) {
    return <SplashScreen />
  }

  if (authenticated) { // logged in 
    return <Redirect href="/(protected)/mealsHome" />;
  }

  return <Redirect href="/(auth)/landing" />;
}


