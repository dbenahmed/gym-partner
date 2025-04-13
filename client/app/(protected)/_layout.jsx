import { Stack } from "expo-router";
import { Redirect } from "expo-router";
export default function Layout() {




    if (false) // logged in 
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
