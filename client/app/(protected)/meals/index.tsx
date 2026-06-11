import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import useAuth from "@/context/authContext";
import SplashScreen from "@/components/ui/SplashScreen";
import useThemeContext from "@/context/themeContext";

// Import the newly extracted components
import {
  NutritionSummary,
  DateNavigator,
  FoodSearchModal,
  FoodAdditionModal,
  CustomFoodModal,
  Meal,
  fetchUserMealsOnDate,
  fetchDeleteMeal,
  useMealsData
} from "@/features/meal-tracking";

export default function Index() {
  const { colors } = useThemeContext();

  const styles = useMemo(() => {
    return StyleSheet.create({
      header: {
        alignItems: "flex-start",
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
      },
    });
  }, [colors]);

  const {
    meals,
    loading,
    error,
    currentDate,
    goToPreviousDay,
    goToNextDay,
    updateMeal,
    deleteMeal,
    refreshMeals,
  } = useMealsData();

  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [additionModalVisible, setAdditionModalVisible] = useState(false);
  const [customFoodModalVisible, setCustomFoodModalVisible] = useState(false);
  const [selectedAdditionFoodItem, setSelectedAdditionFoodItem] = useState<any>(null);

  // Calculate totals
  const prot = meals ? parseFloat(meals.reduce((sum: number, meal: any) => sum + (meal.servingsizeG * meal.food.proteinper100g) / 100, 0).toFixed(0)) : 0;
  const kcal = meals ? parseFloat(meals.reduce((sum: number, meal: any) => sum + (meal.servingsizeG * meal.food.calories) / 100, 0).toFixed(0)) : 0;
  const carb = meals ? parseFloat(meals.reduce((sum: number, meal: any) => sum + (meal.servingsizeG * meal.food.carbohydratesper100g) / 100, 0).toFixed(0)) : 0;
  const fats = meals ? parseFloat(meals.reduce((sum: number, meal: any) => sum + (meal.servingsizeG * meal.food.fatper100g) / 100, 0).toFixed(0)) : 0;



  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error loading meals</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: 10, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <NutritionSummary prot={prot} kcal={kcal} carb={carb} fats={fats} />
      </View>

      <DateNavigator
        currentDate={currentDate}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
      />

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <SplashScreen>
            <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text, marginBottom: 15 }}>
              Loading your meals...
            </Text>
          </SplashScreen>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <ScrollView style={{ width: "90%" }}>
            {meals && meals.map((e: any) => (
              <Meal key={e.id} data={e} onDelete={deleteMeal} onUpdate={updateMeal} />
            ))}
            <Button
              text="Add New Meal"
              type="outline"
              onClick={() => setSearchModalVisible(true)}
              icon="plus"
              styles={{ flex: 1, marginTop: 10 }}
            />
          </ScrollView>
        </View>
      )}

      <FoodSearchModal
        isVisible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onCustomFoodPress={() => {
          setSearchModalVisible(false);
          // Wait for modal to close before opening the next
          setTimeout(() => setCustomFoodModalVisible(true), 100);
        }}
        onFoodSelect={(item: any) => {
          setSearchModalVisible(false);
          setSelectedAdditionFoodItem(item);
          // Wait for modal to close before opening the next
          setTimeout(() => setAdditionModalVisible(true), 100);
        }}
      />

      <CustomFoodModal
        isVisible={customFoodModalVisible}
        onClose={() => {
          setCustomFoodModalVisible(false);
          setTimeout(() => setSearchModalVisible(true), 100);
        }}
        onFoodCreated={() => {
          setCustomFoodModalVisible(false);
          setTimeout(() => setSearchModalVisible(true), 100);
        }}
      />

      <FoodAdditionModal
        isVisible={additionModalVisible}
        onClose={() => {
          setAdditionModalVisible(false);
          setSelectedAdditionFoodItem(null);
          setTimeout(() => setSearchModalVisible(true), 100);
        }}
        foodItem={selectedAdditionFoodItem}
        currentDate={currentDate}
        onFoodAdded={() => {
          setAdditionModalVisible(false);
          setSelectedAdditionFoodItem(null);
          refreshMeals();
        }}
      />
    </View>
  );
}
