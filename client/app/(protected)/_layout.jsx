import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import useAuth from "@/app/contex/authcontex";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors.ts';
import { Platform } from "react-native";
import TabBarBackground from '@/components/ui/TabBarBackground';


export default function Layout() {

    const { authenticated } = useAuth();





    if (authenticated) // logged in 
    {
        return (
            <Tabs screenOptions={{
                tabBarActiveTintColor: Colors.light.tint,
                headerShown: false,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        height: 60, // reduce height
                        paddingBottom: 5,
                        paddingTop: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderTopWidth: 0,
                    },
                    default: {},
                }),
            }}>
                {/* <Tabs.Screen name="home" options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    tabBarLabel: 'Home',
                }} /> */}
                <Tabs.Screen name="mealsHome" options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food-apple" color={color} size={size} />
                    ),
                    tabBarLabel: 'Meals',
                }} />
                {/* <Tabs.Screen name="Profile" options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                    ),
                    tabBarLabel: 'Profile',
                }} /> */}
                <Tabs.Screen name="Collections" options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-list" color={color} size={size} />
                    ),
                    tabBarLabel: 'Collections',
                }} />
                <Tabs.Screen name="Sessions" options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="history" color={color} size={size} />
                    ),
                    tabBarLabel: 'Sessions',
                }} />
                <Tabs.Screen name="Explore" options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={size} />
                    ),
                    tabBarLabel: 'Explore',
                }} />

            </Tabs>
        )
    }
    else {
        return <Redirect href="/(auth)/landing" />
    }
}
