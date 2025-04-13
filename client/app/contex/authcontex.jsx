import React, { useEffect, useState, useContext } from "react";
import { defaultUrl } from "@/constants/constants";
import axios from "axios";
import { handleError } from "@/lib/handleError";
import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';



export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {

    const [userId, setUserId] = useState();
    const [splashLoading, setSplashLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(null);

    const getTokenMobile = async () => {
        const token = await SecureStore.getItemAsync('access-token');
        return token;
    }

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
                    await SecureStore.setItemAsync('user-id', JSON.stringify(data.data.id));
                    await SecureStore.setItemAsync('access-token', data.data.accessToken);
                }
                setUserId(data.id)
                setAuthenticated(data.data.accessToken);
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
        try {
            let header = {}
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                const token = await getTokenMobile();
                if (!token) {
                    return {
                        success: false,
                        message: "No token found",
                    };
                }
                header = {
                    Authorization: `Bearer ${token}`
                }
            }
            console.log('sending')
            const { data } = await axios.post(`${defaultUrl}/auth/check`, {}, {
                withCredentials: true,
                headers: header
            })
            console.log('sent')
            if (data.success) {
                let userId = await parseInt(await SecureStore.getItemAsync('user-id'));
                setUserId(userId);
                setAuthenticated(data.accessToken);
                return {
                    success: true,
                    message: data.message,
                };
            }
        } catch (e) {
            const errorResponse = handleError(e);
            return errorResponse
        }
    }


    useEffect(() => {
        const run = async () => {
            const log = await isLoggedIn();
        }
        run();
    }, []);



    return (
        <AuthContext.Provider value={{ splashLoading, authenticated, setAuthenticated, setSplashLoading, register, login, isLoggedIn, logout, userId, setUserId }}>{children}</AuthContext.Provider>
    )
}

export default useAuth = () => { return useContext(AuthContext) }