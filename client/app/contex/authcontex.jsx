import React, { useEffect, useState, useContext } from "react";
import { defaultUrl } from "@/constants/constants";
import axios from "axios";
import { handleError } from "@/lib/handleError";
import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';





export const AuthContext = React.createContext();


export const getTokenMobile = async () => {
    const token = await SecureStore.getItemAsync('access-token');
    if (token) {
        return token;
    } else {
        return null;
    }
}

export const AuthProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);
    const [splashLoading, setSplashLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(null);



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
            console.log('logging in')
            console.log(defaultUrl)
            const { data, headers } = await axios.post(`${defaultUrl}/auth/login`, {
                username, password
            }, {
                withCredentials: true
            })
            console.log('logged')
            if (data.success) {
                // settings up the user id and the access token into the cookie ( web ) happens automatically on the backend. or async storage ( mobile )
                if (Platform.OS === 'ios' || Platform.OS === 'android') {
                    await SecureStore.setItemAsync('user-id', JSON.stringify(data.data.id));
                    await SecureStore.setItemAsync('access-token', data.data.accessToken);
                }
                console.log('settings user id to ',data.data.id)
                setUserId(data.data.id)
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
    const logout = async () => {
        try {
            const token = await getTokenMobile();
            console.log('logging out')
            const { data } = await axios.post(
                `${defaultUrl}/auth/logout`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            console.log('logged out')
            if (data.success) {
                console.log('clearing')
                setAuthenticated(null);
                setUserId(null);
                if (Platform.OS === 'ios' || Platform.OS === 'android') {
                    await SecureStore.deleteItemAsync('user-id');
                    await SecureStore.deleteItemAsync('access-token');
                }
                console.log('cleared')
            }
        } catch (e) {
            const errorResponse = handleError(e);
            return errorResponse
        }
    }
    const isLoggedIn = async () => {
        try {
            let header = {}
            let token = null;
            if (Platform.OS === 'ios' || Platform.OS === 'android') {
                token = await getTokenMobile();
                console.log('token', token)
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
            const { data } = await axios.get(`${defaultUrl}/auth/check`, {}, {
                withCredentials: true,
                headers: header
            })
            console.log('sent')
            console.log('data', data)
            if (data.success) {
                let userId = await parseInt(await SecureStore.getItemAsync('user-id'));
                console.log('validation',userId)
                setUserId(userId);
                setAuthenticated(token);
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
            const loggedIn = await isLoggedIn();
            setSplashLoading(false);
        }
        run();
    }, []);



    return (
        <AuthContext.Provider value={{ splashLoading, authenticated, setAuthenticated, setSplashLoading, register, login, isLoggedIn, logout, userId, setUserId }}>{children}</AuthContext.Provider>
    )
}

export default useAuth = () => { return useContext(AuthContext) }