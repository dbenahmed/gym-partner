import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import useAuth from "@/context/authContext";
import SplashScreen from "@/components/ui/SplashScreen";
import { Alert } from "react-native";
import { validatePassword, validateUsername, validateName } from "@/utils/validation";
import { ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeContext from "@/context/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignUp() {


  const { colors, theme } = useThemeContext();


  const styles = useMemo(() => StyleSheet.create({
    textInput: {
      borderWidth: 2,
      width: "100%",
      padding: 15,
      borderRadius: 50,
      fontSize: 16,
      marginTop: 20,
      borderColor: colors.tint,
      color: colors.text,
      paddingLeft: 60,
    },
    backgroundLog: {
      flex: 1,
      width: "100%",
      height: "100%",
      position: "relative",
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
  }), [theme]);

  const router = useRouter();
  const [confpasword, setconfpasword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { register, splashLoading, setSplashLoading } = useAuth();

  const handleRegister = async () => {
    console.log(username);

    if (validateUsername(username).success === false) {
      Alert.alert("Error", validateUsername(username).message);
      return;
    } else if (validateName(firstName).success === false) {
      Alert.alert("Error", validatePassword(password).message);
      return;
    } else if (validateName(lastName).success === false) {
      Alert.alert("Error", validatePassword(confpasword).message);
      return;
    }
    if (!(confpasword === password)) {
      Alert.alert("Error", "Passwords Do Not Match");
      return;
    }

    setSplashLoading(true);
    const res = await register(username, password, firstName, lastName);
    console.log("res", res);
    if (res.success) {
      Alert.alert("Success", res.message);
      router.push("/(auth)/signIn");
      setSplashLoading(false)
    } else {
      Alert.alert("Error", res.message);
      setSplashLoading(false);
    }
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
          height: "80%",
        }}
      >

        <View style={styles.inputContainer}>

          <MaterialCommunityIcons
            name="account-edit-outline"
            size={24}
            color={colors.tint}
            style={styles.icon}
          />
          <TextInput
            placeholder="First Name"
            value={firstName}
            placeholderTextColor={colors.text}
            style={styles.textInput}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View style={styles.inputContainer}>

          <MaterialCommunityIcons
            name="account-edit-outline"
            size={24}
            color={colors.tint}
            style={styles.icon}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            placeholderTextColor={"#fffaf0"}
            style={styles.textInput}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={colors.tint}
            style={styles.icon}
          />
          <TextInput
            placeholder="Username"
            value={username}
            placeholderTextColor={"#fffaf0"}
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="key"
            size={24}
            color={colors.tint}
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor={"#fffaf0"}
            value={password}
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="key"
            size={24}
            color={colors.tint}
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor={"#fffaf0"}
            value={confpasword}
            style={styles.textInput}
            onChangeText={(text) => setconfpasword(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: colors.tint,
            width: "100%",
            marginTop: 20,
            borderRadius: 50,
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
            onPress={() => {
              handleRegister();
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
          <Text style={{ color: "#FFFFFF" }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/(auth)/signIn")}>
            <Text style={{ color: colors.tint, fontFamily: "outfitb" }}>
              sign In Here
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
