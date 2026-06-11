import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useThemeContext from "@/context/themeContext";

export default function NutritionSummary({ prot, kcal, carb, fats }: any) {
  const { colors } = useThemeContext();

  const styles = StyleSheet.create({
    headerRight: {
      alignItems: "center",
      minWidth: 160,
    },
    totalLabel: {
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1,
      color: colors.text,
      opacity: 0.6,
      marginBottom: 12,
      textAlign: "center",
    },
    nutritionSummary: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      justifyContent: "center",
    },
    nutritionItem: {
      minWidth: 70,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    nutritionValue: {
      fontSize: 14,
      fontWeight: "700",
      color: "white",
      marginBottom: 2,
      textAlign: "center",
    },
    nutritionLabel: {
      fontSize: 9,
      fontWeight: "600",
      color: "white",
      opacity: 0.9,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.headerRight}>
      <Text style={styles.totalLabel}>TODAY'S TOTAL</Text>

      <View style={styles.nutritionSummary}>
        {[
          { value: prot, label: "Protein", unit: "g", color: colors.proteinBg },
          { value: kcal, label: "Calories", unit: "", color: colors.caloriesBg },
          { value: carb, label: "Carbs", unit: "g", color: colors.carbsBg },
          { value: fats, label: "Fat", unit: "g", color: colors.fatBg },
        ].map((nutrient) => (
          <View
            key={nutrient.label}
            style={[styles.nutritionItem, { backgroundColor: nutrient.color }]}
          >
            <Text style={styles.nutritionValue}>
              {nutrient.value}
              {nutrient.unit}
            </Text>
            <Text style={styles.nutritionLabel}>{nutrient.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
