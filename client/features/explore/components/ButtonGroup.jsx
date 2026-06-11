import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useThemeContext from "@/context/themeContext";

export default function ButtonGroup({ options, selectedValue, onSelect }) {
  const { colors } = useThemeContext();

  return (
    <View style={styles.buttonGroup}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.button,
            selectedValue === option.value || (selectedValue === null && option.value === "any")
              ? [styles.buttonSelected, { backgroundColor: colors.tint }]
              : [styles.buttonUnselected, { backgroundColor: colors.tintLighter }],
          ]}
          onPress={() => onSelect(option.value === "any" ? null : option.value)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedValue === option.value || (selectedValue === null && option.value === "any")
                ? [styles.buttonTextSelected, { color: colors.background }]
                : [styles.buttonTextUnselected, { color: colors.text }],
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 8,
    marginBottom: 8,
  },
  buttonSelected: {
    // Dynamically colored
  },
  buttonUnselected: {
    // Dynamically colored
  },
  buttonText: {
    fontSize: 14,
  },
  buttonTextSelected: {
    fontWeight: "bold",
  },
  buttonTextUnselected: {
  },
});
