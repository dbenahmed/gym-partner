import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import {
  fetchUserMealsOnDate,
  fetchUpdateMeal,
  fetchDeleteMeal,
} from "../api/mealsApi";
import useAuth from "@/context/authContext";

export function useMealsData() {
  const { authenticated } = useAuth();
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderUserMealsOnDate = useCallback(async () => {
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
    } catch (err) {
      console.error("Error fetching meals:", err);
      Alert.alert("Error", "Failed to fetch meals");
      setLoading(false);
      setError(true);
    }
  }, [authenticated, currentDate]);

  useEffect(() => {
    renderUserMealsOnDate();
  }, [renderUserMealsOnDate]);

  const updateMeal = async (id: string, body: any) => {
    const result = await fetchUpdateMeal(authenticated, id, body);
    if (!result.success) {
      Alert.alert("Error", result.message || "Failed to update meal");
      return;
    }
    await renderUserMealsOnDate();
  };

  const deleteMeal = async (id: string) => {
    const result = await fetchDeleteMeal(authenticated, id);
    if (!result.success) {
      Alert.alert("Error", result.message || "Failed to delete meal");
      return;
    }
    setMeals((prevMeals) => prevMeals.filter((meal: any) => meal.id !== id));
  };

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

  return {
    meals,
    loading,
    error,
    currentDate,
    goToPreviousDay,
    goToNextDay,
    updateMeal,
    deleteMeal,
    refreshMeals: renderUserMealsOnDate,
  };
}
