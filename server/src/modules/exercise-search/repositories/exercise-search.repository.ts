import db from "@/db/index.js";
import { exercises, sessions, setsOfSessionsExercises } from "@/db/schemas/schema.js";
import { and, eq, desc, SQL } from "drizzle-orm";

export const getExercises = async (andConditions: (SQL<unknown> | undefined)[], limit: number, offset: number) => {
    return db.select()
        .from(exercises)
        .where(andConditions.length > 0 ? and(...andConditions) : undefined)
        .limit(limit)
        .offset(offset);
};

export const getExercisesCount = async (andConditions: (SQL<unknown> | undefined)[]) => {
    return db.$count(exercises, andConditions.length > 0 ? and(...andConditions) : undefined);
};

export const getExerciseById = async (exerciseId: number) => {
    return db.select()
        .from(exercises)
        .where(eq(exercises.id, exerciseId))
        .limit(1);
};

export const getLatestExerciseStats = async (exerciseId: number, userId: number) => {
    return db.select({
        setsOfSessionsExercises: setsOfSessionsExercises,
        sessions: sessions
    })
    .from(setsOfSessionsExercises)
    .innerJoin(sessions, eq(setsOfSessionsExercises.sessionId, sessions.id))
    .where(
        and(
            eq(setsOfSessionsExercises.exerciseId, exerciseId),
            eq(sessions.createdBy, userId)
        )
    )
    .orderBy(desc(setsOfSessionsExercises.creationdate));
};
