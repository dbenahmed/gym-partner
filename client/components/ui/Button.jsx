import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useThemeContext from "@/context/themeContext";



export default function Button({ children = null, styles = {}, onClick, text, icon = undefined, type = 'primary', disabled = false, iconSize = 20 }) {

    const { colors, theme } = useThemeContext();


    if (!type) {
        console.warn("Button type is not defined. Defaulting to 'primary'.");
    }


    switch (type) {
        case 'primary':
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.tint,
                        flexDirection: 'row',
                        gap: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        borderRadius: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        ...styles,
                    }}
                    onPress={onClick}
                    disabled={disabled}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={iconSize} color="#fff" />}
                    {text && <Text style={{
                        color: '#fff',
                        fontWeight: 'bold',
                    }}>{text}</Text>}
                </TouchableOpacity>
            );
        case 'secondary':
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ccc',
                        padding: 12,
                        borderRadius: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        ...styles,
                    }}
                    onPress={onClick}
                    disabled={disabled}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={iconSize} color="#fff" />}
                    {text && <Text style={{
                        color: '#fff',
                        fontWeight: 'bold',
                    }}>{text}</Text>}
                </TouchableOpacity>
            );
        case 'outline':
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: colors.tint,
                        borderWidth: 1,
                        padding: 12,
                        borderRadius: 8,
                        ...styles,
                    }}
                    onPress={onClick}
                    disabled={disabled}
                >
                    {icon && <MaterialCommunityIcons name={icon} size={iconSize} color={colors.tint} />}
                    {text && <Text style={{
                        color: colors.tint,
                        fontWeight: 'bold',
                    }}>{text}</Text>}
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
                    {icon && <MaterialCommunityIcons name={icon} size={iconSize} color="#fff" />}
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
                    {icon && <MaterialCommunityIcons name={icon} size={iconSize} color="#ccc" />}
                    <Text style={[styles.buttonDisabledText, { color: colors.text }]}>{text}</Text>
                </TouchableOpacity>
            ); */
    }
}