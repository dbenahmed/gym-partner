import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Color from "@/constants/Colors.ts";
import { useRouter } from "expo-router";


export default function Landing({ navigation }) {
  const router = useRouter();
    
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.light.background,
      }}
    >
      <Image
        source={require("@/assets/images/man.jpg")}
        style={{
          width: "100%",
          height: 300,
        }}
      />
      <View
        style={{
          padding: 25,
          backgroundColor: Color.light.background,
          height: "100%",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: Color.light.tint,
            fontFamily: "outfitb",
          }}
        >
          Welcome to Gym Partner       
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: Color.light.tint,
            marginTop: 20,
            fontFamily: "outfitr",
          }}
        >
          Lorem ipsum dolor sit adipisicing elit.aklsmd alskmda kqjwkj AJSBDKJA
          kajsdbkjbd aksndk snd ,an ,n a
        </Text>
        <TouchableOpacity
          style={styles.botton}
          onPress={() => router.push("/(auth)/signUp")}
        >
          <Text style={[styles.bottonText]}>
            Get Started 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.botton,
            {
              backgroundColor: Color.light.tint,
              borderWidth: 1,
              borderColor: Color.light.tint,
            },
          ]}
          onPress={() => router.push("/(auth)/signIn")}
        >
          <Text style={[styles.bottonText, { color: Color.light.background }]}>
            already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botton: {
    padding: 20,
    backgroundColor: Color.light.tint,
    marginTop: 20,
    borderRadius: 10,
  },
  bottonText: {
    textAlign: "center",
    fontSize: 18,
    color: Color.light.background,
  },
});
