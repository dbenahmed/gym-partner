import { Stack } from "expo-router";
import { Redirect } from "expo-router";
export default function Layout() {




    if (false) // logged in 
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
