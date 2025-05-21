import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Color from "@/constants/Colors.ts";
import { useRouter } from "expo-router";
import CheckBox from "react-native-check-box";
import { useState } from "react";
import { Alert } from "react-native";

export default function Landing({ navigation }) {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <ImageBackground
      source={require("@/assets/images/manLog.jpg")}
      style={styles.backgroundLog}
    >
      <Text
        style={{
          color: "#F0B294",
          fontSize: 13,
          fontWeight: "700",
          fontSize: 32,
          width: "48%",
          position: "absolute",
          left: 5,
          top: "35%",
          lineHeight: 40,
          textAlign: "center",
        }}
      >
        TRACK YOUR MEALS IMPROVE YOUR WORKOUT
      </Text>

      <View
        style={{
          padding: 25,
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          height: "25%",
          marginTop: "auto",
        }}
      >
        <TouchableOpacity
          style={[
            styles.botton,
            {
              backgroundColor: "#CF8765",
              borderWidth: 1,
              borderColor: Color.light.tint,
              marginBottom: "8",
            },
          ]}
          onPress={() => {
            if (isChecked) {
              router.push("/(auth)/signIn");
            } else {
              Alert.alert("Error", "Please Accept Terms of Service");
            }
          }}
        >
          <Text style={[styles.bottonText, { color: Color.light.background }]}>
            Get Started
          </Text>
        </TouchableOpacity>

        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          rightText={
            <Text style={{ color: "#FFFFFF", fontSize: 13, fontWeight: "400" }}>
              I read and agreed to the Terms and Conditions.
            </Text>
          }
          rightTextStyle={{ color: "#000" }}
          checkBoxColor="#CF8765"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  botton: {
    padding: 20,
    backgroundColor: Color.light.tint,
    marginTop: 20,
    borderRadius: 50,
  },
  bottonText: {
    textAlign: "center",
    fontSize: 24,
    color: Color.light.background,
    fontWeight: 800,
  },
  backgroundLog: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
});
