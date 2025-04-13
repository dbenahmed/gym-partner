// app/index.js
import { Redirect } from "expo-router";





export default function Index() {
  if (false) { // logged in 
    return <Redirect href="/(protected)/home" />;
  }

  return <Redirect href="/(auth)/landing" />;
}


