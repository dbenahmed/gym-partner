import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import useThemeContext from "@/context/themeContext";

export default function ExploreResultItem({ title, subtitle, onPress }) {
  const { colors } = useThemeContext();

  return (
    <TouchableOpacity
      style={[styles.resultItem, { backgroundColor: colors.tintLighter }]}
      onPress={onPress}
    >
      <Text style={[styles.resultTitle, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.resultSubtitle, { color: colors.text }]}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});
