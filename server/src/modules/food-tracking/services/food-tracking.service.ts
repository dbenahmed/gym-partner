import { findLoggedFoodsByDateAndUser, findFoodById, insertFoodLog, findFoodLogById, updateFoodLog, deleteFoodLog } from '@/modules/food-tracking/repositories/food-tracking.repository.js';

export const getUserFoodsByDateService = async (date: string, userId: number) => {
    const foundMeals = await findLoggedFoodsByDateAndUser(date, userId);
    const foundMealsWithFood = await Promise.all(foundMeals.map(async (meal) => {
        const food = await findFoodById(meal.foodId);
        return { ...meal, food };
    }));
    return foundMealsWithFood;
};

export const logUserFoodForDateService = async (date: string, foodId: number, userId: number, description: string | undefined | null, servingSize: number) => {
    const foundFood = await findFoodById(foodId);
    if (!foundFood) {
        throw new Error("Food Id is in valid ( food not found )");
    }

    const desc = description ?? "";
    const inserts = {
        date,
        foodId: foundFood.id,
        userId: userId,
        description: desc,
        servingsizeG: servingSize
    };

    const insertedFood = await insertFoodLog(inserts);
    return insertedFood;
};

export const updateUserLoggedFoodService = async (mealId: number, servingsizeG: number) => {
    const checkTheMeal = await findFoodLogById(mealId);
    if (checkTheMeal.length === 0) {
        throw new Error("the session is not exist verify the id");
    }
    await updateFoodLog(mealId, servingsizeG);
};

export const deleteUserLoggedFoodService = async (mealId: number, userId: number) => {
    const foundFoodArray = await findFoodLogById(mealId);
    const foundFood = foundFoodArray[0];
    
    if (!foundFood) {
        throw new Error("unfound food");
    }

    if (foundFood.userId !== userId) {
        throw new Error("not authorized");
    }

    await deleteFoodLog(mealId);
};
