import * as repo from '@/modules/workout-routines/repositories/workout-routines.repository.js';

export const getUserWorkoutCollectionsService = async (userId: number) => {
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

export const getWorkoutRoutinesForCollectionService = async (collectionId: number, userId: number) => {
    const foundCollections = await repo.findCollectionByIdAndUserId(collectionId, userId);
    if (foundCollections.length === 0) {
        throw new Error("Collection does not exist or user is unauthorized");
    }
    return repo.findRoutinesByCollectionId(collectionId);
};

export const createWorkoutRoutineService = async (title: string, collectionId: number, userId: number) => {
    const collectionsFound = await repo.findCollectionByIdAndUserId(collectionId, userId);
    if (collectionsFound.length === 0) {
        throw new Error("Collection does not exist or user is not authorized");
    }

    const foundPlans = await repo.findRoutineByTitleAndCollectionId(title, collectionId);
    if (foundPlans.length > 0) {
        throw new Error("plan name already used before");
    }

    const inserted = await repo.createRoutine(title, collectionId);
    return inserted[0];
};

export const updateWorkoutRoutineService = async (planId: number, title: string, userId: number) => {
    const authorized = await repo.findRoutineWithOwnership(userId, planId);
    if (authorized.length === 0) {
        throw new Error("User not authorized or plan does not exist");
    }
    const updated = await repo.updateRoutine(planId, { title });
    return updated[0];
};

export const deleteWorkoutRoutineService = async (planId: number, userId: number) => {
    const authorized = await repo.findRoutineWithOwnership(userId, planId);
    if (authorized.length === 0) {
        throw new Error("User unauthorized or plan does not exist");
    }
    await repo.deleteRoutine(planId);
};

export const addExerciseToRoutineService = async (planId: number, exercisesIds: number[], userId: number) => {
    const foundPlans = await repo.findRoutineWithCollection(planId, userId);
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
        const exerciseNotAlreadyAdded = await repo.findExerciseInRoutine(planId, exercise.id);
        if (exerciseNotAlreadyAdded.length > 0) {
            throw new Error("Exercise already exists in this plan");
        }
    }

    for (const exercise of foundExercises) {
        await repo.createRoutineExercise(planId, exercise.id, 0);
    }
};

export const removeExerciseFromRoutineService = async (planId: number, exerciseId: number, userId: number) => {
    const foundPlans = await repo.findRoutineWithCollection(planId, userId);
    const plan = foundPlans[0];
    if (!plan) {
        throw new Error("Plan does not exist or user is not authorized");
    }

    const exerciseNotAlreadyAdded = await repo.findExerciseInRoutine(planId, exerciseId);
    if (exerciseNotAlreadyAdded.length === 0) {
        throw new Error("Exercise does not exist in this plan");
    }

    await repo.deleteRoutineExercise(planId, exerciseId);
};

export const getExercisesForRoutineService = async (planId: number, userId: number) => {
    const foundPlan = await repo.findRoutineWithCollection(planId, userId);
    const plan = foundPlan[0];
    if (!plan) {
        throw new Error("Plan does not exist or user is not authorized");
    }
    return repo.findExercisesForPlan(planId);
};
