import * as repo from '../repositories/workout-plans.repository.js';

export const getWorkoutCollectionsService = async (userId: number) => {
    return repo.findCollectionsByUserId(userId);
};

export const createWorkoutCollectionService = async (title: string, description: string | undefined, userId: number) => {
    const exists = await repo.findCollectionByTitleAndUserId(title, userId);
    if (exists.length > 0) {
        throw new Error("Collection title already used");
    }
    const inserted = await repo.createCollection(title, description, userId);
    return inserted[0];
};

export const updateWorkoutCollectionService = async (collectionId: number, userId: number, title?: string, description?: string) => {
    const collectionExists = await repo.findCollectionByIdAndUserId(collectionId, userId);
    if (collectionExists.length === 0) {
        throw new Error("Collection does not exist");
    }

    const newData = Object.fromEntries(Object.entries({ title, description }).filter(([, v]) => v != null));

    const updated = await repo.updateCollection(collectionId, userId, newData);
    return updated[0];
};

export const deleteWorkoutCollectionService = async (collectionId: number, userId: number) => {
    const collectionExists = await repo.findCollectionByIdAndUserId(collectionId, userId);
    if (collectionExists.length === 0) {
        throw new Error("Collection does not exist or user is unauthorized");
    }
    await repo.deleteCollection(collectionId, userId);
};

export const getWorkoutPlansService = async (collectionId: number, userId: number) => {
    const foundCollections = await repo.findCollectionByIdAndUserId(collectionId, userId);
    if (foundCollections.length === 0) {
        throw new Error("Collection does not exist or user is unauthorized");
    }
    return repo.findPlansByCollectionId(collectionId);
};

export const createWorkoutPlanService = async (title: string, collectionId: number, userId: number) => {
    const collectionsFound = await repo.findCollectionByIdAndUserId(collectionId, userId);
    if (collectionsFound.length === 0) {
        throw new Error("Collection does not exist or user is not authorized");
    }

    const foundPlans = await repo.findPlanByTitleAndCollectionId(title, collectionId);
    if (foundPlans.length > 0) {
        throw new Error("plan name already used before");
    }

    const inserted = await repo.createPlan(title, collectionId);
    return inserted[0];
};

export const updateWorkoutPlanService = async (planId: number, title: string, userId: number) => {
    const authorized = await repo.findPlanWithOwnership(userId, planId);
    if (authorized.length === 0) {
        throw new Error("User not authorized or plan does not exist");
    }
    const updated = await repo.updatePlan(planId, { title });
    return updated[0];
};

export const deleteWorkoutPlanService = async (planId: number, userId: number) => {
    const authorized = await repo.findPlanWithOwnership(userId, planId);
    if (authorized.length === 0) {
        throw new Error("User unauthorized or plan does not exist");
    }
    await repo.deletePlan(planId);
};

export const addExerciseToPlanService = async (planId: number, exercisesIds: number[], userId: number) => {
    const foundPlans = await repo.findPlanWithCollection(planId, userId);
    const plan = foundPlans[0];
    if (!plan) {
        throw new Error("Plan does not exist or user is not authorized");
    }

    const foundExercises = await repo.findExercisesByIds(exercisesIds);
    if (foundExercises.length !== exercisesIds.length) {
        const missingExercises = exercisesIds.filter(id => !foundExercises.some(e => e.id === id));
        const error = new Error("One or more exercises do not exist");
        (error as any).data = { missingExercises };
        throw error;
    }

    if (foundExercises.length === 0) {
        throw new Error("Exercise does not exist");
    }

    for (const exercise of foundExercises) {
        const exerciseNotAlreadyAdded = await repo.findExerciseInPlan(planId, exercise.id);
        if (exerciseNotAlreadyAdded.length > 0) {
            throw new Error("Exercise already exists in this plan");
        }
    }

    for (const exercise of foundExercises) {
        await repo.createPlanExercise(planId, exercise.id, 0);
    }
};

export const removeExerciseFromPlanService = async (planId: number, exerciseId: number, userId: number) => {
    const foundPlans = await repo.findPlanWithCollection(planId, userId);
    const plan = foundPlans[0];
    if (!plan) {
        throw new Error("Plan does not exist or user is not authorized");
    }

    const exerciseNotAlreadyAdded = await repo.findExerciseInPlan(planId, exerciseId);
    if (exerciseNotAlreadyAdded.length === 0) {
        throw new Error("Exercise does not exist in this plan");
    }

    await repo.deletePlanExercise(planId, exerciseId);
};

export const getExercisesForPlanService = async (planId: number, userId: number) => {
    const foundPlan = await repo.findPlanWithCollection(planId, userId);
    const plan = foundPlan[0];
    if (!plan) {
        throw new Error("Plan does not exist or user is not authorized");
    }
    return repo.findExercisesForPlan(planId);
};
