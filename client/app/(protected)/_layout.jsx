import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import useAuth from "@/context/authContext";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import useThemeContext from "@/context/themeContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from "react";
import { BlurView } from 'expo-blur';
import routesLinks from "@/constants/routes";
import { useSharedValue } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";


export default function Layout() {


  const { authenticated, theme } = useAuth();


  const { colors } = useThemeContext();
  if (authenticated) {
    // logged in
    return (

      <Tabs
        screenOptions={{
          lazy: false, // Load all tabs at once when the app starts instead of on first access
          tabBarActiveTintColor: colors.tint,
          headerShown: false,
          // this animation makes a bug in the the tabs navigation
          //animation: "shift", 
          /* tabBarBackground: () => {
            return (
              <View style={{ backgroundColor: "red" }} />
            )
          }, */



          tabBarStyle: Platform.select({
            ios: {
              height: 60, // reduce height
              paddingBottom: 5,
              paddingTop: 5,
              borderTopWidth: 0,
              marginLeft: 20,
              marginRight: 20,
              backgroundColor: colors.tintLighter,
              borderRadius: 20,
            },
            android: {
              // Use a solid background on Android
              height: 60, // reduce height
              paddingBottom: 5,
              paddingTop: 5,
              backgroundColor: "transparent", // solid white
              borderTopColor: "transparent", // remove border
              borderTopWidth: 0,
            },
            default: {},
          }),
        }}
      >

        <Tabs.Screen name="home" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={colors.icon} size={size} />
          ),
          tabBarLabel: "Home",
        }} />


        <Tabs.Screen
          name="mealsHome"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="food-apple"
                color={colors.icon}
                size={size}
              />
            ),
            tabBarLabel: "Meals",
          }}
        />




        <Tabs.Screen
          name="training"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="dumbbell"
                color={colors.icon}
                size={size}
              />
            ),
            tabBarLabel: "Training",
          }}
        />

        <Tabs.Screen
          name="Explore"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={colors.icon}
                size={size}
              />
            ),
            tabBarLabel: "Explore",
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={colors.icon}
                size={size}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
    );
  } else {
    return <Redirect href={routesLinks.LANDING} />;
  }
}
