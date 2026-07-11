import * as customFoodTrackingRepo from "@/modules/custom-food-tracking/repositories/custom-food-tracking.repository.js";
import { BadRequestError, NotFoundError } from "@/core/errors/errors.js";

export interface CreateCustomMealRequest {
    foodname: string;
    calories: number;
    proteinper100g: number;
    carbohydratesper100g: number;
    fatper100g: number;
}

export const createUserCustomFoodService = async (data: CreateCustomMealRequest, userId: number) => {
    const existMeal = await customFoodTrackingRepo.findCustomFoodByNameAndUser(data.foodname, userId);
    
    if (existMeal.length > 0) {
        throw new BadRequestError("this meals is already exist");
    }

    const result = await customFoodTrackingRepo.createCustomFood({
        ...data,
        custom: true,
        createdBy: userId,
    });

    return result[0];
};

export const getUserCustomFoodService = async (mealId: number) => {
    const existFood = await customFoodTrackingRepo.findCustomFoodById(mealId);
    
    if (existFood.length === 0) {
        throw new NotFoundError("this meal is not exist");
    }

    return existFood[0];
};

export const getAllCustomMealsService = async (userId: number) => {
    return customFoodTrackingRepo.findAllCustomFoodsByUser(userId);
};

export const deleteUserCustomFoodService = async (mealId: number, userId: number) => {
    const existFood = await customFoodTrackingRepo.findCustomFoodByIdAndUser(mealId, userId);
    
    if (existFood.length === 0) {
        throw new NotFoundError("this meal is not exist");
    }

    await customFoodTrackingRepo.deleteCustomFoodByIdAndUser(mealId, userId);
};
