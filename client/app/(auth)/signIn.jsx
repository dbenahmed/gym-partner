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
import { useRouter } from "expo-router";
import { useState, useContext, useMemo } from "react";
import useAuth from "@/context/authContext";
import SplashScreen from "@/components/ui/SplashScreen";
import { Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import useThemeContext from "@/context/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function TabTwoScreen() {




  const { colors } = useThemeContext();


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
  }), [colors]);

  const router = useRouter();
  const [password, setPassword] = useState("password1");
  const [username, setUsername] = useState("djilaliben");
  const { login, splashLoading, setSplashLoading } = useAuth();

  const handleLogin = async () => {
    setSplashLoading(true);
    const res = await login(username, password);
    if (res.success) {
      router.replace("/(protected)/meals"); //todo :  should use REDIRECT
    } else {
      Alert.alert("Error", res.message);
    }
    setSplashLoading(false);
  };

  if (splashLoading) {
    return <View backgroundColor={colors.background} style={{ flex: 1 }}>
      <SplashScreen />
    </View>;
  }

  return (
    <ImageBackground
      source={require("@/assets/images/manLog.jpg")}
      style={styles.backgroundLog}
    >
      <LinearGradient
        colors={["black", "transparent"]}
        locations={[0, 1]}
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
          <MaterialCommunityIcons
            name="account"
            size={24}
            color={colors.tint}
            style={styles.icon}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.text}

            value={username}
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
            placeholder="password"
            placeholderTextColor={colors.text}
            value={password}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
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
            <Text style={{ color: colors.tint, fontFamily: "outfitb" }}>
              sign Up Here
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
