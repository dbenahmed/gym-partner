import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contex/authcontex";
import { useRouter } from "expo-router";
export default function Home() {
  const { userInsfo, isLoding, logout } = useContext(AuthContext);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Welcome {/*userInsfo.user.name*/}</Text>
      <Button title="logout" color="red" onPress={logout} />
      <Button
        title="meals"
        color="blue"
        onPress={() => router.push("/login/Food/mealsHome")}
      />
      <Button
        title="Profile"
        color="yellow"
        onPress={() => router.push("/login/Profile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});
