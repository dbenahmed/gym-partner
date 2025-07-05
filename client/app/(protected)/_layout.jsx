import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import useAuth from "@/context/authContext";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors.ts";
import { Platform, View } from "react-native";
import useThemeContext from "@/context/themeContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from "react";
import { BlurView } from 'expo-blur';
import routesLinks from "@/constants/routes";


export default function Layout() {

  const { authenticated, theme } = useAuth();

  const darkenHex = useCallback((hexColor, factor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return `#${((r * factor) | 0).toString(16)}${((g * factor) | 0).toString(16)}${((b * factor) | 0).toString(16)}`;
  }, []);

  const { colors } = useThemeContext();

  if (authenticated) {
    // logged in
    return (

      <Tabs
        screenOptions={{
          lazy: false, // Load all tabs at once when the app starts instead of on first access
          tabBarActiveTintColor: colors.tint,
          headerShown: false,
          animation: "shift",
          tabBarBackground: () => (
            <LinearGradient
              colors={[colors.background, darkenHex(colors.tint, 0.2), colors.background]} // dark blue → dark gray
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              locations={[0, 0.5, 1]}
              style={{ flex: 1 }}
            />
          ),
          tabBarStyle: Platform.select({
            ios: {
              height: 60, // reduce height
              paddingBottom: 5,
              paddingTop: 5,
              borderTopWidth: 0,
              backgroundColor: colors.background,
            },
            android: {
              // Use a solid background on Android
              height: 60, // reduce height
              paddingBottom: 5,
              paddingTop: 5,
              backgroundColor: colors.background, // solid white
              borderTopColor: "transparent", // remove border
              borderTopWidth: 0,
            },
            default: {},
          }),
        }}
      >

        <Tabs.Screen name="home/index" options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: "Home",

        }} />


        <Tabs.Screen
          name="mealsHome"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="food-apple"
                color={color}
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
                color={color}
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
                color={color}
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
                color={color}
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
