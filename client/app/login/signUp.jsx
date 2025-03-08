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
export default function SignUp() {
  const router = useRouter();
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
      <TextInput placeholder="Full name" style={styles.textInput} />
      <TextInput placeholder="Email" style={styles.textInput} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        style={styles.textInput}
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
