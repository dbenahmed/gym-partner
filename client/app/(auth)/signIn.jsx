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
export default function TabTwoScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isLouding, login } = useContext(AuthContext);

  const handleLogin = async () => {
    login(email, password)

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
        Welcome Back
      </Text>

      <TextInput placeholder="Email" value={email} style={styles.textInput} onChangeText={text => setEmail(text)} />
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
