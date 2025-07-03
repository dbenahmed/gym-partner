import { ActivityIndicator } from "react-native";
import useThemeContext from '@/context/themeContext';

export default function Spinner({ visible, size }) {

    const { colors } = useThemeContext();

    if (!visible) {
        return null;
    }
    return (
        <ActivityIndicator size={size} color={colors.tint} />
    )
}