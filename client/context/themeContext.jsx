import React, { useContext, useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
const themeContext = React.createContext();

export const ThemeProvider = ({ children }) => {

    const deviceTheme = useColorScheme();


    const asyncStorageTheme = AsyncStorage.getItem('theme');
    const [theme, setTheme] = React.useState((asyncStorageTheme && ["light", "dark"].includes(asyncStorageTheme)) ? asyncStorageTheme : deviceTheme);


    const toggleTheme = (newTheme) => {
        console.log('newTheme', newTheme)
        if (newTheme === "device") {
            console.log("settings new theme")
            setTheme(newTheme);
            AsyncStorage.removeItem('theme');
        } else if (newTheme === "light" || newTheme === "dark") {
            setTheme(newTheme);
            AsyncStorage.setItem('theme', newTheme);
        }
    };




    const colors = Colors[`${theme === "device" ? deviceTheme : theme}`];

    return (
        <themeContext.Provider value={{ deviceTheme, theme, toggleTheme, colors }}>
            {children}
        </themeContext.Provider>
    );
}

export default function useThemeContext() { return useContext(themeContext); }