import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Face from "@/app/login/Face";
import Home from "@/app/login/home";
import Splash from "@/app/login/splash";
import { AuthContext } from "./contex/authcontex";
import { useContext } from "react";
export default function HomeScreen() {
  const { userInfo, splashLouding } = useContext(AuthContext);
  return (
    <>
      {/*{splashLouding ? (
        <Splash />
      ) : userInfo.accsess_token ? (
        <Home />
      ) : (
        <Face />
      )}
      */}
      <Home/>
    </>
  );
}
