import React from "react";
import { ActivityIndicator, View } from "react-native";



const SplashScreen = ()=> {
    return(
        <View style={{flex:1,justifyContent:'center',backgroundColor:"green"}}>
            <ActivityIndicator size="large" color="red"/>
        </View>
    )
}



    export default SplashScreen;