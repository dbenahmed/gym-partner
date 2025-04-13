// app/index.js
import { Redirect } from "expo-router";
import { useEffect } from "react";
import useAuth from "@/app/contex/authcontex";



export default function Index() {

  const { authenticated } = useAuth();
  if (authenticated) { // logged in 
    return <Redirect href="/(protected)/home" />;
  }

  return <Redirect href="/(auth)/landing" />;
}


