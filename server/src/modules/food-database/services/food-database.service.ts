import { findAllAvailableFoods, findFoodDetailsById } from '@/modules/food-database/repositories/food-database.repository.js';

export const getAllFoodsByQueriesService = async (name: string, userId: number) => {
    return findAllAvailableFoods(name, userId);
};

export const getFoodDetailsByIdService = async (mealId: number) => {
    return findFoodDetailsById(mealId);
};
