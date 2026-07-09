import db from "@/db/index.js";
import { collections, exercises, plans, plansExercises, users } from "@/db/schemas/schema.js";
import { and, eq, inArray } from "drizzle-orm";

export const findRoutineWithOwnership = async (userId: number, planId: number) => {
    return db.select()
        .from(plans)
        .innerJoin(collections, eq(collections.id, plans.collectionId))
        .innerJoin(users, eq(collections.userId, users.id))
        .where(and(eq(plans.id, planId), eq(users.id, userId)))
        .limit(1);
};

export const findCollectionsByUserId = async (userId: number) => {
    return db.select({
        collectionId: collections.id,
        description: collections.description,
        title: collections.title
    }).from(collections).where(eq(collections.userId, userId));
};

export const findCollectionByTitleAndUserId = async (title: string, userId: number) => {
    return db.select().from(collections).where(
        and(eq(collections.title, title), eq(collections.userId, userId))
    ).limit(1);
};

export const createCollection = async (title: string, description: string | undefined, userId: number) => {
    return db.insert(collections).values({ title, description, userId }).returning({
        id: collections.id, title: collections.title, description: collections.description, userId: collections.userId
    });
};

export const findCollectionByIdAndUserId = async (collectionId: number, userId: number) => {
    return db.select().from(collections).where(
        and(eq(collections.id, collectionId), eq(collections.userId, userId))
    ).limit(1);
};

export const updateCollection = async (collectionId: number, userId: number, newData: Partial<{ title: string; description: string }>) => {
    return db.update(collections).set(newData)
        .where(and(eq(collections.id, collectionId), eq(collections.userId, userId)))
        .returning({
            id: collections.id,
            title: collections.title,
            description: collections.description
        });
};

export const deleteCollection = async (collectionId: number, userId: number) => {
    return db.delete(collections).where(
        and(eq(collections.id, collectionId), eq(collections.userId, userId))
    );
};

export const findRoutinesByCollectionId = async (collectionId: number) => {
    return db.select({
        id: plans.id,
        collectionId: plans.collectionId,
        title: plans.title
    }).from(plans).where(eq(plans.collectionId, collectionId));
};

export const findRoutineByTitleAndCollectionId = async (title: string, collectionId: number) => {
    return db.select().from(plans).where(
        and(eq(plans.title, title), eq(plans.collectionId, collectionId))
    );
};

export const createRoutine = async (title: string, collectionId: number) => {
    return db.insert(plans).values({ title, collectionId }).returning({
        id: plans.id,
        title: plans.title,
        collectionId: plans.collectionId
    });
};

export const updateRoutine = async (planId: number, newData: Partial<{ title: string }>) => {
    return db.update(plans).set(newData).where(eq(plans.id, planId)).returning({
        id: plans.id,
        title: plans.title,
        collectionId: plans.collectionId
    });
};

export const deleteRoutine = async (planId: number) => {
    return db.delete(plans).where(eq(plans.id, planId));
};

export const findRoutineWithCollection = async (planId: number, userId: number) => {
    return db.select().from(plans).where(eq(plans.id, planId))
        .innerJoin(collections, and(eq(plans.collectionId, collections.id), eq(collections.userId, userId)));
};

export const findExercisesByIds = async (exercisesIds: number[]) => {
    return db.select().from(exercises).where(inArray(exercises.id, exercisesIds));
};

export const findExerciseInRoutine = async (planId: number, exerciseId: number) => {
    return db.select().from(plansExercises).where(
        and(eq(plansExercises.planId, planId), eq(plansExercises.exerciseId, exerciseId))
    ).limit(1);
};

export const createRoutineExercise = async (planId: number, exerciseId: number, order: number) => {
    return db.insert(plansExercises).values({
        planId,
        exerciseId,
        order
    });
};

export const deleteRoutineExercise = async (planId: number, exerciseId: number) => {
    return db.delete(plansExercises).where(
        and(eq(plansExercises.planId, planId), eq(plansExercises.exerciseId, exerciseId))
    );
};

export const findExercisesForPlan = async (planId: number) => {
    return db.select().from(plansExercises).where(eq(plansExercises.planId, planId))
        .innerJoin(exercises, eq(plansExercises.exerciseId, exercises.id)).orderBy(plansExercises.order);
};
