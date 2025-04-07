import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import Color from "@/constants/Color";
import { useRouter } from "expo-router";
import { useState, useContext } from "react";

import { AuthContext } from "@/app/contex/authcontex";
export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isLouding,register } = useContext(AuthContext);


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
        placeholder="Full name"
        value={name}
        style={styles.textInput}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
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
          backgroundColor: Color.second,
          width: "100%",
          marginTop: 20,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Color.first,
            fontSize: 18,
            fontFamily: "outfitb",
          }}
          onPress={() => {
            register(name, email, password);
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
        <Pressable onPress={() => router.push("/login/signIn")}>
          <Text style={{ color: Color.second, fontFamily: "outfitb" }}>
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
