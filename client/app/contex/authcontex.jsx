import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/app/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "@/components/SplashScreen";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {

    const [userId, setUserId] = useState();
    const [splashLoading, setSplashLoading] = useState(false);

    const register = (name, email, pasword) => {
        /* axios
    .post(`${BASE_URL}/register`,{
        name,email,pasword
    })
    .then(
        res=>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInsfo',JSON.stringify(userInfo));
            setIsLoading(false)
            console.log(userInfo);
        })
        .catch(
            e=>{
                console.log(`register error ${e}`)
                setIsLoading(false)
            }) */
    }
    const login = (email, pasword) => {
        /* setIsLoading(true);
        axios
            .post(`${BASE_URL}/login`, {
                email, pasword,
            })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo);
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            }).catch(e => {
                console.log(`login ereer ${e}`);
                setIsLoading(false);
            }) */
    }
    const logout = () => {
        /* setIsLoading(true);
        axios
            .post(
                `${BASE_URL}/logout`,
                {},
                {
                    headers: { Authorization: `Bearer ${userInfo.access_token}` },
                },
            )
            .then(res => {
                console.log(res.data);
                AsyncStorage.removeItem('userInfo');
                setUserInfo({})
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login ereer ${e}`);
                setIsLoading(false);
            }) */
    }
    const isLoggedIn = async () => {
        /* try {
            setSplachLouding(true)
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                setUserInfo(userInfo);
            }
            setSplachLouding(false)
        } catch (e) {
            console.log(`is logged in errer ${e}`)
            setSplachLouding(false)
        } */
    }

    if (splashLoading) {
        return <SplashScreen />
    }
    
    return (
        <AuthContext.Provider value={{ splashLoading, setSplashLoading, register, login, logout }}>{children}</AuthContext.Provider>
    )
}