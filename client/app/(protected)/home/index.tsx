import { View, Text } from "react-native";
import AnimatedCard from "@/components/ui/AnimatedCard";
import useThemeContext from "@/context/themeContext";

export default function Home() {
    const { colors } = useThemeContext();
    console.log("homepage");
    
    return (
        <View style={{ flex: 1 }}>
            {/* horizontal view with two cards horizontally */}
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <AnimatedCard title="" onPress={() => {}} style={{ flex: 1, backgroundColor: colors.tintLighter }}>
                    <Text>Today's Calories</Text>
                    <Text>1000</Text>
                </AnimatedCard>
                <AnimatedCard title="" onPress={() => {}} style={{ flex: 1, backgroundColor: colors.tintLighter }}>
                    <Text>Today's Steps</Text>
                    <Text>1000</Text>
                </AnimatedCard>
            </View>
        </View>
    );
}
