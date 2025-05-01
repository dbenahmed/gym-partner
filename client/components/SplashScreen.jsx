import React from "react";
import { ActivityIndicator, View } from "react-native";
import Color from "@/constants/Colors.ts";



const SplashScreen = ({backgroundColor, loadingCircleColor}) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: backgroundColor ? backgroundColor : Color.light.background }}>
            <ActivityIndicator size="large" color={loadingCircleColor ? loadingCircleColor : Color.light.tint} />
        </View>
    )
}



export default SplashScreen;