import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import useAuth from "@/context/authContext";



export default function Layout() {
    const { authenticated } = useAuth();

    if (authenticated) // logged in 
    {
        return <Redirect href="/(protected)/home" />
    }
    else {
        return <Stack
            initialRouteName="landing" // 👈 this decides which screen to show first
            screenOptions={{ headerShown: false }}
            
        >
            <Stack.Screen name="landing" options={{ headerShown: false }} />
            <Stack.Screen name="signIn" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
        </Stack>
    }

}
