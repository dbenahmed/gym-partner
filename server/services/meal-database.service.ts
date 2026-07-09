import { findAllAvailableMeals, findMealDetailsById } from '../repositories/meal-database.repository.js';

export const getAllMealsService = async (name: string, userId: number) => {
    return findAllAvailableMeals(name, userId);
};

export const getMealDetailsService = async (mealId: number) => {
    return findMealDetailsById(mealId);
};
