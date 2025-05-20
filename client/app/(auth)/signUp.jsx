import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import Color from "@/constants/Colors.ts";
import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { AuthContext } from "@/app/contex/authcontex";
import useAuth from "@/app/contex/authcontex";
import SplashScreen from "@/components/SplashScreen";
import { Alert } from "react-native";
import { validatePassword, validateUsername } from "@/utils/validation";


export default function SignUp() {
  const router = useRouter();
  const [password, setPassword] = useState("password1");
  const [username, setUsername] = useState("user1");
  const { register, splashLoading, setSplashLoading } = useAuth()


  const handleRegister = async () => {

    console.log(username)
    if (validateUsername(username).success === false) {
      Alert.alert("Error", validateUsername(username).message)
      return
    } else if (validatePassword(password).success === false) {
      Alert.alert("Error", validatePassword(password).message)
      return
    }

    setSplashLoading(true)
    const res = await register(username, password)
    if (res.success) {
      Alert.alert("Success", res.message)
      router.push("/(auth)/signIn")
    } else {
      Alert.alert("Error", res.message)
    }
    setSplashLoading(false)
  };





  if (splashLoading) {
    return <SplashScreen />
  }
  return (
    <View
      style={{
        Color: "white",
        display: "flex",
        alignItems: "center",
        padding: 20,
      }}
    >

      <Image
        source={require("@/assets/images/logo.jpg")}
        style={{ width: 180, height: 180, margin: 50 }}
      />
      <Text
        style={{ fontSize: 25, textAlign: "center", fontFamily: "outfitb" }}
      >
        Create new account
      </Text>

      <TextInput
        placeholder="username"
        value={username}
        style={styles.textInput}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={password}
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Color.light.background,
          width: "100%",
          marginTop: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Color.light.tint,
            fontSize: 18,
            fontFamily: "outfitb",
          }}
          onPress={() => {
            handleRegister()
          }}
        >
          Create account
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
        <Text>Already have an account?</Text>
        <Pressable onPress={() => router.push("/(auth)/signIn")}>
          <Text style={{ color: Color.light.background, fontFamily: "outfitb" }}>
            sign In Here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    borderRadius: 15,
    fontSize: 18,
    marginTop: 20,
  },
});
