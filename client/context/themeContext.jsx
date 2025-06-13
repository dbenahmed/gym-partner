import React, { useContext, useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themeContext = React.createContext();

export const ThemeProvider = ({ children }) => {

    const deviceTheme = useColorScheme();


    const asyncStorageTheme = AsyncStorage.getItem('theme');
    const [theme, setTheme] = React.useState(asyncStorageTheme ? asyncStorageTheme : deviceTheme);


    const toggleTheme = (newTheme) => {
        if (newTheme === "device") {
            setTheme(deviceTheme);
            AsyncStorage.removeItem('theme');
        } else if (newTheme === "light") {
            setTheme("light");
            AsyncStorage.setItem('theme', "light");
        } else if (newTheme === "dark") {
            setTheme("dark");
            AsyncStorage.setItem('theme', "dark");
        }
    };




    const colors = Colors[theme === "device" ? deviceTheme : theme];

    return (
        <themeContext.Provider value={{ deviceTheme, theme, toggleTheme, colors }}>
            {children}
        </themeContext.Provider>
    );
}

export default useThemeContext = () => { return useContext(themeContext); }