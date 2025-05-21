import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import { AuthContext } from "@/app/contex/authcontex";
import { useRouter } from "expo-router";
import Color from "@/constants/Colors.ts";
import { useState, useContext } from "react";
import SplashScreen from "@/components/SplashScreen";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function TabTwoScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("password1");
  const [username, setUsername] = useState("user1");
  const { login, splashLoading, setSplashLoading } = useContext(AuthContext);

  const handleLogin = async () => {
    setSplashLoading(true);
    const res = await login(username, password);
    if (res.success) {
      router.push("/(protected)/mealsHome"); // should use REDIRECT
    } else {
      Alert.alert("Error", res.message);
    }
    setSplashLoading(false);
  };

  if (splashLoading) {
    return <SplashScreen />;
  }

  return (
    <ImageBackground
      source={require("@/assets/images/manLog.jpg")}
      style={styles.backgroundLog}
    >
      <LinearGradient
        colors={[
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgb(0, 0, 0)",
          "rgba(93, 91, 91, 0.11)",
          "rgba(98, 96, 96, 0)",
        ]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{
          Color: "white",
          alignItems: "center",
          padding: 20,
          marginTop: "auto",
          height: "50%",
        }}
      >
        <View style={styles.inputContainer}>
          <Image
            source={require("@/assets/images/people.png")}
            style={styles.icon}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor={"#fffaf0"}
            value={username}
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("@/assets/images/key.png")}
            style={styles.icon}
            placeholderTextColor={"#fffaf0"}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor={"#fffaf0"}
            value={password}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: "#CF8765",
            width: "100%",
            marginTop: 20,
            borderRadius: 50,
          }}
          onPress={() => {
            handleLogin();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: 20,
              fontFamily: "outfitb",
              fontWeight: "600",
            }}
          >
            Welcom Back
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            gap: 10,
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/(auth)/signUp")}>
            <Text style={{ color: "#CF8765", fontFamily: "outfitb" }}>
              sign Up Here
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 3,
    width: "100%",
    padding: 15,
    borderRadius: 50,
    fontSize: 16,
    marginTop: 20,
    borderColor: "#CF8765",
    color: "#CF8765",
    paddingLeft: 60,
  },
  backgroundLog: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "transparent",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "19",
  },
});
