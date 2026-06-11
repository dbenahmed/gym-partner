import { Text, View } from "react-native";

import { router } from "expo-router"
import routesLink from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import AnimatedCard from "@/components/ui/AnimatedCard";
import useThemeContext from "@/context/themeContext";
import Colors from "@/constants/Colors";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");








export default function Index() {

   const { colors } = useThemeContext();


   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

         <View style={{ flex: 1 }}>

            <AnimatedCard
               title="Gym Planner"
               subtitle="GO TO collections"
               backgroundColor={colors.tintLighter}
               textColor={colors.text}
               width={width * 0.9}
               height={120}
               enableFloating={true}
               floatingDuration={3000}
               onPress={
                  () => {
                     router.push(routesLink.PROTECTED_COLLECTIONS);
                  }
               }
            />

            <AnimatedCard
               title="Sessions Tracking"
               subtitle="GO TO sessions"
               backgroundColor={colors.tintLighter}
               textColor={colors.text}
               width={width * 0.9}
               height={120}
               enableFloating={true}
               floatingDuration={3000}

               onPress={() => {
                  router.push(routesLink.PROTECTED_SESSIONS);
               }}

            />

         </View>

      </View>
   )
}