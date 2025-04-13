import { Stack } from "expo-router";
import { Redirect } from "expo-router";
import useAuth from "@/app/contex/authcontex";

export default function Layout() {

    const { authenticated } = useAuth();


    if (authenticated) // logged in 
    {
        return <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="mealsHome" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
    }
    else {
        return <Redirect href="/(auth)/landing" />
    }
}
