import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Color from "@/constants/Color";
import { useRouter } from "expo-router";


export default function Face({ navigation }) {
  const router = useRouter();
    
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.first,
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
          backgroundColor: Color.second,
          height: "100%",
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: Color.first,
            fontFamily: "outfitb",
          }}
        >
          Welcome to Gym Partner       
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            color: Color.first,
            marginTop: 20,
            fontFamily: "outfitr",
          }}
        >
          Lorem ipsum dolor sit adipisicing elit.aklsmd alskmda kqjwkj AJSBDKJA
          kajsdbkjbd aksndk snd ,an ,n a
        </Text>
        <TouchableOpacity
          style={styles.botton}
          onPress={() => router.push("/login/signUp")}
        >
          <Text style={[styles.bottonText, { color: Color.second }]}>
            Get Started 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.botton,
            {
              backgroundColor: Color.second,
              borderWidth: 1,
              borderColor: Color.first,
            },
          ]}
          onPress={() => router.push("/login/signIn")}
        >
          <Text style={[styles.bottonText, { color: Color.first }]}>
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
    backgroundColor: Color.first,
    marginTop: 20,
    borderRadius: 10,
  },
  bottonText: {
    textAlign: "center",
    fontSize: 18,
  },
});
