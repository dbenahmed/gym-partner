import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors.ts';


const themeContext = React.createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = React.useState(useColorScheme() || "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const colors = Colors[theme];

    return (
        <themeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </themeContext.Provider>
    );
}

export default useThemeContext = () => { return useContext(themeContext); }