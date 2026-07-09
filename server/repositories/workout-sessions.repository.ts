import { and, between, eq, sql } from "drizzle-orm";
import db from "../db/index.js";
import { exercises, sessions, setsOfSessionsExercises } from "../db/schemas/schema.js";

export const findSessionByNameAndDate = async (userId: number, name: string, dateString: string) => {
    return db.query.sessions.findFirst({
        where: and(
            eq(sessions.createdBy, userId),
            eq(sessions.name, name),
            sql`DATE(${sessions.starttime}) = ${dateString}`
        ),
    });
};

export const findSessionsByDateRange = async (userId: number, startOfDay: Date, endOfDay: Date) => {
    return db.select().from(sessions).where(
        and(
            eq(sessions.createdBy, userId),
            between(sessions.starttime, startOfDay, endOfDay)
        )
    );
};

export const findSessionByIdAndUserId = async (sessionId: number, userId: number) => {
    return db.query.sessions.findFirst({
        where: and(
            eq(sessions.createdBy, userId),
            eq(sessions.id, sessionId)
        ),
        with: {
            setsOfSessionsExercises: {
                with: {
                    exercises: true,
                },
            },
        },
    });
};

export const findSessionById = async (sessionId: number) => {
    return db.select().from(sessions).where(eq(sessions.id, sessionId));
};

export const findExerciseById = async (exerciseId: number) => {
    return db.query.exercises.findFirst({
        where: eq(exercises.id, exerciseId),
    });
};

export const updateSessionName = async (sessionId: number, name: string) => {
    return db.update(sessions).set({ name }).where(eq(sessions.id, sessionId));
};

export const replaceSessionExercises = async (sessionId: number, newExercises: any[]) => {
    return db.transaction(async (tx) => {
        await tx.delete(setsOfSessionsExercises).where(eq(setsOfSessionsExercises.sessionId, sessionId));
        for (const ele of newExercises) {
            await tx.insert(setsOfSessionsExercises).values({
                sessionId: sessionId,
                exerciseId: ele.exerciseId,
                creationdate: ele.creationdate,
                order: ele.order,
                weight: ele.weight,
                reps: ele.reps,
                unit: ele.unit || [],
            });
        }
    });
};

export const createWorkoutSessionTransaction = async (sessionData: any, exercisesArray: any[]) => {
    return db.transaction(async (tx) => {
        const createdSessions = await tx
            .insert(sessions)
            .values(sessionData)
            .returning({ id: sessions.id });
        
        const createdSession = createdSessions[0].id;

        const exercisesValidation = await Promise.all(
            exercisesArray.map(async (exo) => {
                const foundExercise = await tx.query.exercises.findFirst({
                    where: eq(exercises.id, exo.id),
                });
                if (!foundExercise) {
                    return { success: false, statusCode: 404, message: "Exercise not found" };
                }

                const weights = exo.sets.map((set: any) => set.weight);
                const units = exo.sets.map((set: any) => set.unit);
                const reps = exo.sets.map((set: any) => set.reps);

                if (weights.length !== units.length || weights.length !== reps.length) {
                    return { success: false, statusCode: 400, message: "The number of weights, units and reps are not the same" };
                }

                return {
                    success: true,
                    data: {
                        id: exo.id,
                        weights,
                        units,
                        reps,
                        order: exo.order,
                    },
                };
            })
        );

        if (!exercisesValidation.every((exo) => exo.success)) {
            const failedExo = exercisesValidation.find(exo => !exo.success);
            return {
                success: false,
                message: failedExo?.message,
                statusCode: failedExo?.statusCode,
            };
        }

        const objects = exercisesValidation.map((exo: any) => ({
            exerciseId: exo.data.id,
            sessionId: createdSession,
            weight: exo.data.weights,
            unit: exo.data.units,
            reps: exo.data.reps,
            order: exo.data.order,
        }));

        const insertedExo = await tx.insert(setsOfSessionsExercises).values(objects).returning();

        return {
            success: true,
            message: "Exercises created successfully",
            statusCode: 200,
            data: insertedExo,
        };
    });
};

export const deleteSessionTransaction = async (sessionId: number) => {
    return db.transaction(async (tx) => {
        await tx.delete(sessions).where(eq(sessions.id, sessionId));
        await tx.delete(setsOfSessionsExercises).where(eq(setsOfSessionsExercises.sessionId, sessionId));
    });
};
