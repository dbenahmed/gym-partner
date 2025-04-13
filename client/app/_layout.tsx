import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { AuthProvider } from "@/app/contex/authcontex";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  useFonts({
    outfitr: require("@/assets/fonts/Outfit-Regular.ttf"),
    outfitb: require("@/assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SafeAreaView>
  );
}
