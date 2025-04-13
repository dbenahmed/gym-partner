import React, { useEffect, useState, useContext } from "react";
import { defaultUrl } from "@/constants/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "@/components/SplashScreen";
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
            if (e.name === 'AxiosError') {
                return {
                    success: false,
                    message: e.response.data.message,
                }
            } else {
                console.error(`register error ${e}`)
                return {
                    success: false,
                    message: e.message,
                }
            }
        }
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


    return (
        <AuthContext.Provider value={{ splashLoading, setSplashLoading, register, login, logout }}>{children}</AuthContext.Provider>
    )
}

export default useAuth = () => { return useContext(AuthContext) }