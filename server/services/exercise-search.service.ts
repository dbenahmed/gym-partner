import * as exerciseSearchRepo from "../repositories/exercise-search.repository.js";
import { exercises } from "../db/schemas/schema.js";
import { and, eq, ilike, sql, SQL } from "drizzle-orm";
import { BadRequestError, NotFoundError } from "../errors/errors.js";

interface GetExercisesQueries {
    name?: string;
    force?: string;
    level?: string;
    mechanic?: string;
    equipment?: string;
    primarymuscles?: string | string[];
    secondarymuscles?: string | string[];
    category?: string;
}

export const getAllExercisesService = async (queries: GetExercisesQueries, page: number, limit: number) => {
    const filteredQueries = Object.fromEntries(
        Object.entries(queries).filter((v) => v[1] !== "" && v[1] !== undefined && v[1] !== null)
    );

    if (Object.keys(filteredQueries).length === 0) {
        throw new BadRequestError("No valid filters provided");
    }

    const arrayFields = ['primarymuscles', 'secondarymuscles'];

    const andConditions = Object.entries(filteredQueries).map(([key, value]) => {
        const typedKey = key as keyof typeof exercises._.columns;

        if (key === 'name') {
            if (typeof value !== 'string') {
                return null;
            }
            return ilike(exercises.name, `%${value.trim()}%`);
        }

        if (arrayFields.includes(key)) {
            if (typeof value === 'string') {
                return sql`${exercises[typedKey]} && ARRAY[${value}]::text[]`;
            } else if (Array.isArray(value)) {
                return sql`${exercises[typedKey]} && ARRAY[${value.join(',')}]::text[]`;
            } else {
                return null;
            }
        }

        if (typeof value === 'string' || typeof value === 'number') {
            return eq(exercises[typedKey], value);
        } else {
            return null;
        }
    }).filter((condition): condition is SQL<unknown> => condition !== null);

    const foundExercises = await exerciseSearchRepo.getExercises(andConditions, limit, page * limit);
    const count = await exerciseSearchRepo.getExercisesCount(andConditions);

    return {
        count,
        exercises: foundExercises
    };
};

export const getExerciseDetailsService = async (exerciseId: number) => {
    const foundExercise = await exerciseSearchRepo.getExerciseById(exerciseId);

    if (!foundExercise || foundExercise.length === 0) {
        throw new NotFoundError("Exercise Not Found");
    }

    return foundExercise[0];
};

export const getLatestExerciseStatsService = async (exerciseId: number, userId: number) => {
    const foundStats = await exerciseSearchRepo.getLatestExerciseStats(exerciseId, userId);

    if (!foundStats) {
        throw new Error("ERROR: error retreiving latest exercise stats");
    }

    return foundStats.map(stat => ({
        ...stat.setsOfSessionsExercises,
        sessions: stat.sessions
    }));
};
