import React, { useEffect, useState, useContext } from "react";
import { defaultUrl } from "@/constants/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "@/components/SplashScreen";
import { handleError } from "@/lib/handleError";
import { Platform } from "react-native";




export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {

    const [userId, setUserId] = useState();
    const [splashLoading, setSplashLoading] = useState(false);

    const register = async (username, password) => {
        try {
            const { data, headers } = await axios.post(`${defaultUrl}/auth/register`, {
                username, password
            })
            if (data.success) {
                return {
                    success: true,
                    message: data.message,
                }
            } else {
                return {
                    success: false,
                    message: data.message,
                }
            }

        } catch (e) {
            const errorResponse = handleError(e);
            return errorResponse
        }
    }
    const login = async (username, password) => {
        try {
            const { data, headers } = await axios.post(`${defaultUrl}/auth/login`, {
                username, password
            }, {
                withCredentials: true
            })
            if (data.success) {
                // settings up the user id and the access token into the cookie ( web ) happens automatically on the backend. or async storage ( mobile )
                if (Platform.OS === 'ios' || Platform.OS === 'android') {
                    await AsyncStorage.setItem('userid', data.data.id);
                    await AsyncStorage.setItem('accesstoken', data.data.accessToken);
                }
                setUserId(data.id)
                return {
                    success: true, message: data.message
                }
            }
        } catch (e) {
            const errorResponse = handleError(e);
            return errorResponse
        }
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


    return (
        <AuthContext.Provider value={{ splashLoading, setSplashLoading, register, login, logout, userId, setUserId }}>{children}</AuthContext.Provider>
    )
}

export default useAuth = () => { return useContext(AuthContext) }