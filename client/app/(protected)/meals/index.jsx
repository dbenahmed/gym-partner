import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import Meal from "@/features/meal-tracking/components/meal";
import { fetchUserMealsOnDate, fetchUpdateMeal, fetchDeleteMeal } from "@/features/meal-tracking/api/mealsApi";
import Button from "@/components/ui/Button";
import useAuth from "@/context/authContext";
import SplashScreen from "@/components/ui/SplashScreen";
import useThemeContext from "@/context/themeContext";

// Import the newly extracted components
import NutritionSummary from "@/features/meal-tracking/components/NutritionSummary";
import DateNavigator from "@/features/meal-tracking/components/DateNavigator";
import FoodSearchModal from "@/features/meal-tracking/components/FoodSearchModal";
import FoodAdditionModal from "@/features/meal-tracking/components/FoodAdditionModal";

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

  const [meals, setMeals] = useState([]);
  const { authenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [modalVisible, setModalVisible] = useState(false);
  const [additionModalVisible, setAdditionModalVisible] = useState(false);
  const [selectedAdditionFoodItem, setSelectedAdditionFoodItem] = useState(null);

  const renderUserMealsOnDate = async () => {
    try {
      setLoading(true);
      const dateStr = new Date(currentDate).toISOString().split("T")[0];
      const result = await fetchUserMealsOnDate(authenticated, dateStr);

      if (!result.success) {
        Alert.alert("Error", result.message || "Failed to fetch meals");
        setError(true);
      } else {
        setMeals(result.data);
        setError(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      Alert.alert("Error", "Failed to fetch meals");
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const run = async () => {
      await renderUserMealsOnDate();
    };
    run();
  }, [currentDate]);

  // Calculate totals
  const prot = meals ? parseFloat(meals.reduce((sum, meal) => sum + (meal.servingsizeG * meal.food.proteinper100g) / 100, 0).toFixed(0)) : 0;
  const kcal = meals ? parseFloat(meals.reduce((sum, meal) => sum + (meal.servingsizeG * meal.food.calories) / 100, 0).toFixed(0)) : 0;
  const carb = meals ? parseFloat(meals.reduce((sum, meal) => sum + (meal.servingsizeG * meal.food.carbohydratesper100g) / 100, 0).toFixed(0)) : 0;
  const fats = meals ? parseFloat(meals.reduce((sum, meal) => sum + (meal.servingsizeG * meal.food.fatper100g) / 100, 0).toFixed(0)) : 0;

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextDateMidnight = new Date(newDate);
    nextDateMidnight.setHours(0, 0, 0, 0);

    if (nextDateMidnight.getTime() > today.getTime()) {
      Alert.alert("Cannot view future dates", "You can only view today and past meals.");
      return;
    }
    setCurrentDate(newDate);
  };

  const updateMeal = async (id, body) => {
    const result = await fetchUpdateMeal(authenticated, id, body);
    if (!result.success) {
      Alert.alert("Error", result.message || "Failed to update meal");
      return;
    }
    renderUserMealsOnDate();
  };

  const delateMeal = async (id) => {
    const result = await fetchDeleteMeal(authenticated, id);
    if (!result.success) {
      Alert.alert("Error", result.message || "Failed to delete meal");
      return;
    }
    setMeals(meals.filter((meal) => meal.id !== id));
  };

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
            {meals && meals.map((e) => (
              <Meal key={e.id} data={e} onDelete={delateMeal} onUpdate={updateMeal} />
            ))}
            <Button
              text="Add New Meal"
              type="outline"
              onClick={() => setModalVisible(true)}
              icon="plus"
              styles={{ flex: 1, marginTop: 10 }}
            />
          </ScrollView>
        </View>
      )}

      {/* Modals extracted into features directory */}
      <FoodSearchModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onFoodSelect={(item) => {
          setSelectedAdditionFoodItem(item);
          setAdditionModalVisible(true);
        }}
      />

      <FoodAdditionModal
        isVisible={additionModalVisible}
        onClose={() => {
          setAdditionModalVisible(false);
          setSelectedAdditionFoodItem(null);
        }}
        foodItem={selectedAdditionFoodItem}
        currentDate={currentDate}
        onFoodAdded={() => {
          setAdditionModalVisible(false);
          setSelectedAdditionFoodItem(null);
          renderUserMealsOnDate();
        }}
      />
    </View>
  );
}
