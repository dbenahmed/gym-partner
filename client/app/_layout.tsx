import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import  {AuthProvider}  from "@/app/contex/authcontex";



export default function RootLayout() {
  
  useFonts({
    'outfitr': require('@/assets/fonts/Outfit-Regular.ttf'),
    'outfitb': require('@/assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
    </AuthProvider>
  );
}
