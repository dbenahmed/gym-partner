import React, { useMemo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useThemeContext from "@/context/themeContext";

export default function PageButton({ onPress = () => { console.warn("PageButton onPress not defined") }, title = "No Title", icon = undefined as any }) {
  const { colors, deviceTheme, theme } = useThemeContext();

  const styles = useMemo(() => {
    return StyleSheet.create({
      editButton: {
        backgroundColor: colors.tint,
        width: '100%',
        height: 45,
        paddingHorizontal: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
        borderRadius: 25,
      },
      editButtonText: {
        color: colors.background,
        fontSize: 16,
        fontWeight: '500',
      },
    });
  }, [colors]);

  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}>
      {icon && <MaterialCommunityIcons
        name={icon}
        size={24}
        color={colors.background}
        style={{ marginRight: 10 }}
      />}
      <Text style={styles.editButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}
