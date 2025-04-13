import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { AuthContext } from "@/app/contex/authcontex";
import { useRouter } from "expo-router";
import Color from "@/constants/Colors.ts";
import { useState, useContext } from "react";
import SplashScreen from "@/components/SplashScreen";
import { Alert } from "react-native";



export default function TabTwoScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("password1");
  const [username, setUsername] = useState("user1");
  const { login, splashLoading, setSplashLoading } = useContext(AuthContext);

  const handleLogin = async () => {
    setSplashLoading(true)
    const res = await login(username, password)
    if (res.success) {
      router.push("/(protected)/home") // should use REDIRECT
    } else {
      Alert.alert('Error', res.message)
    }
    setSplashLoading(false)
  }


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
        Sign In Page
      </Text>

      <TextInput placeholder="username" value={username} style={styles.textInput} onChangeText={text => setUsername(text)} />
      <TextInput
        placeholder="password"
        value={password}
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Color.light.background,
          width: "100%",
          marginTop: 20,
          borderRadius: 15,
        }}
        onPress={() => { handleLogin() }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Color.light.tint,
            fontSize: 18,
            fontFamily: "outfitb",
          }}
        >
          Log In
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
        <Text>Don't have an account?</Text>
        <Pressable onPress={() => router.push("/(auth)/signUp")}>
          <Text style={{ color: Color.light.background, fontFamily: "outfitb" }}>
            sign Up Here
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
