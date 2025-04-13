import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  FlatList,
  Alert,
  Button,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Color from "@/constants/Colors.ts";
import { useContext } from "react";
import { AuthContext } from "../contex/authcontex";

export default function Profile() {
  const { userInsfo, isLoding, logout } = useContext(AuthContext);

  const modification = () => {
    if (username.length == 0 || email.length == 0 || fullName.length ==0 || phone.length == 0 || address.length == 0 || height.length == 0 || weight.length == 0) {
      Alert.alert('there empty input')
    }else{
      setVisible(false);
      setUserInfo({
        username:username,
        email:email,
        fullName: fullName,
        phone: phone,
    address: address,
    height: height, 
    weight: weight, 
    avatarUrl: `https://robohash.org/${username}.png`,
      })
    }
  }

  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    fullName: "John Doe",
    phone: "123456789",
    address: "123 Main St, City, Country",
    bio: "Fitness enthusiast and bodybuilder.",
    avatarUrl: "https://robohash.org/lf.png",
    height: "180 cm", // User height
    weight: "75 kg", // User weight});
  });

  const [vatarUrl,setvatarUrl] = useState("https://robohash.org/lf.png");
  const [visible, setVisible] = useState(false);
  const [username, setusername] = useState("JohnDoe");
  const [fullName, setfullName] = useState("John Doe");
  const [email, setemail] = useState("johndoe@example.com");
  const [phone, setphone] = useState("123456789");
  const [address, setaddress] = useState("123 Main St, City, Country");
  const [weight, setweight] = useState("75 kg");
  const [height, setheight] = useState("180 cm");
  return (
    <>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <View style={styles.avatarpare}>
          <Image
            source={{ uri: userInfo.avatarUrl }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
        <Text
          style={{
            fontSize: 30,
            color: Color.light.tint,
            fontWeight: "900",
            letterSpacing: 2,
            marginTop: 30,
          }}
        >
          {fullName} Profile
        </Text>
        <View
          style={{
            backgroundColor: Color.light.tint,
            width: "100%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: "100%",
          }}
        >
          <Text
            style={{
              color: Color.light.background,
              textAlign: "center",
              margin: 10,
              fontSize: 40,
              fontWeight: "500",
              borderBottomWidth: 2,
              borderColor: Color.light.background,
            }}
          >
            {" "}
            user info
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              gap: 40,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: Color.light.background,
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 1,
                padding: 12,
              }}
            >
              USER NANE :
            </Text>
            <Text
              style={{
                color: Color.light.background,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {userInfo.username}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              gap: 40,
            }}
          >
            <Text
              style={{
                color: Color.light.background,
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 1,
                padding: 10,
              }}
            >
              EMAIL :
            </Text>
            <Text
              style={{
                color: Color.light.background,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {userInfo.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              gap: 40,
            }}
          >
            <Text
              style={{
                color: Color.light.background,
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 1,
                padding: 10,
              }}
            >
              PHONE :
            </Text>
            <Text
              style={{
                color: Color.light.background,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {userInfo.phone}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              gap: 40,
            }}
          >
            <Text
              style={{
                color: Color.light.background,
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 1,
                padding: 10,
              }}
            >
              ADDRESS :
            </Text>
            <Text
              style={{
                color: Color.light.background,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {userInfo.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              gap: 40,
            }}
          >
            <Text
              style={{
                color: Color.light.background,
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 1,
                padding: 10,
              }}
            >
              HEIGHT :
            </Text>
            <Text
              style={{
                color: Color.light.background,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {userInfo.height}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 10,
              gap: 40,
            }}
          >
            <Text
              style={{
                color: Color.light.background,
                fontSize: 18,
                fontWeight: "500",
                letterSpacing: 1,
                padding: 10,
              }}
            >
              WEIGHT :
            </Text>
            <Text
              style={{
                color: Color.light.background,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {userInfo.weight}
            </Text>
          </View>
          <View style={{ alignItems: "center", padding: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Color.light.background,
                width: 200,
                borderRadius: 10,
              }}
              onPress={() => setVisible(true)}
            >
              <Text
                style={{
                  color: Color.light.tint,
                  fontSize: 20,
                  fontWeight: "500",
                  letterSpacing: 1,
                  padding: 10,
                  textAlign: "center",
                }}
              >
                Modification
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            width: 60,
            marginTop: 20,
            position: "absolute",
            top: 0,
            right: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Text
            style={{
              color: Color.light.background,
              fontSize: 10,
              fontWeight: "500",
              letterSpacing: 1,
              padding: 10,
              textAlign: "center",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modeleContent}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: Color.light.background,
                fontWeight: "600",
                letterSpacing: 2,
              }}
            >
              YOUR NEW INFO
            </Text>
            <TextInput
              placeholder="user name"
              style={styles.InfoInput}
              value={username}
              onChangeText={(e) => setusername(e)}
            />
            <TextInput
              placeholder="Full name"
              style={styles.InfoInput}
              value={fullName}
              onChangeText={(e) => setfullName(e)}
            />
            <TextInput
              placeholder="email"
              style={styles.InfoInput}
              value={email}
              onChangeText={(e) => setemail(e)}
            />
            <TextInput
              placeholder="phone"
              style={styles.InfoInput}
              value={phone}
              onChangeText={(e) => setphone(e)}
            />
            <TextInput
              placeholder="adress"
              style={styles.InfoInput}
              value={address}
              onChangeText={(e) => setaddress(e)}
            />
            <TextInput
              placeholder="height"
              style={styles.InfoInput}
              value={height}
              onChangeText={(e) => setheight(e)}
            />
            <TextInput
              placeholder="weight"
              style={styles.InfoInput}
              value={weight}
              onChangeText={(e) => setweight(e)}
            />
            <View style={{ alignItems: "center", padding: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Color.light.background,
                  width: 200,
                  borderRadius: 10,
                }}
                onPress={()=>modification()}
              >
                <Text
                  style={{
                    color: Color.light.tint,
                    fontSize: 20,
                    fontWeight: "500",
                    letterSpacing: 1,
                    padding: 10,
                    textAlign: "center",
                  }}
                  
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
//  <Button title="logout" color="red" onPress={logout} />

const styles = StyleSheet.create({
  avatarpare: {
    width: "40%",
    height: 100,
    borderRadius: "50%",
    borderColor: Color.light.tint,
    borderWidth: 3,
    overflow: "hidden",
    marginTop: 30,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: (70, 30),
    justifyContent: "center",
  },
  modeleContent: {
    padding: 20,
    backgroundColor: Color.light.tint,
    borderRadius: 20,
  },
  InfoInput: {
    backgroundColor: Color.light.background,
    marginTop: 10,
    borderRadius: 4,
  },
});
