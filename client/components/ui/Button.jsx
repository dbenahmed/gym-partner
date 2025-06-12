import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useThemeContext from "@/context/themeContext";



export default function Button({ children = null, styles = {}, onClick, text, icon = undefined, type = 'primary', disabled = false }) {

    const { colors, theme } = useThemeContext();


    if (!type) {
        console.warn("Button type is not defined. Defaulting to 'primary'.");
    }


    switch (type) {
        case 'primary':
            return (
                <TouchableOpacity
                    style={{
                        ...styles,
                        backgroundColor: colors.tint,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                    }}
                    onPress={onClick}
                    disabled={disabled}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={20} color="#fff" />}
                    <Text style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginLeft: 8,
                    }}>{text}</Text>
                </TouchableOpacity>
            );
        case 'secondary':
            return (
                <TouchableOpacity
                    style={{
                        ...styles,
                        backgroundColor: colors.secondary,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 20,
                    }}
                    onPress={onClick}
                    disabled={disabled}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={20} color="#fff" />}
                    <Text style={{}}>{text}</Text>
                </TouchableOpacity>
            );
        /* case 'tertiary':
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: colors.tertiary,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 20,
                    }}
                    onPress={onClick}
                    disabled={disabled}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={20} color="#fff" />}
                    <Text style={[styles.buttonTertiaryText, { color: colors.text }]}>{text}</Text>
                </TouchableOpacity>
            );
        case 'disabled':
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: colors.disabled,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 20,
                    }}
                    onPress={onClick}
                    disabled={true}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={20} color="#ccc" />}
                    <Text style={[styles.buttonDisabledText, { color: colors.text }]}>{text}</Text>
                </TouchableOpacity>
            ); */
    }
}