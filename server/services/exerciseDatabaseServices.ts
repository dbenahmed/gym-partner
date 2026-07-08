import * as exerciseDatabaseRepo from "../repositories/exerciseDatabaseRepositories.js";
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
    // 1. Clean up the incoming queries object.
    // The frontend might send query params that are empty strings, null, or undefined (e.g. ?mechanic=&force=static).
    // We filter these out so we don't accidentally execute a query like `WHERE mechanic = ''`.
    // Example after filtering: { force: 'static', level: 'beginner' }
    const filteredQueries = Object.fromEntries(
        Object.entries(queries).filter((v) => v[1] !== "" && v[1] !== undefined && v[1] !== null)
    );

    // If no valid queries remain, we throw an error because returning the entire exercise database
    // might be too large, or we strictly require at least one filter for this API.
    if (Object.keys(filteredQueries).length === 0) {
        throw new BadRequestError("No valid filters provided");
    }

    // These fields are defined as arrays in the Postgres database (e.g., text().array()).
    // We need special SQL logic to search inside them.
    const arrayFields = ['primarymuscles', 'secondarymuscles'];

    // 2. Map the cleaned-up query object into Drizzle SQL condition objects.
    // This turns { force: 'static', name: 'curl' } into [ eq(exercises.force, 'static'), ilike(exercises.name, '%curl%') ]
    const andConditions = Object.entries(filteredQueries).map(([key, value]) => {
        const typedKey = key as keyof typeof exercises._.columns;

        // A) Fuzzy String Matching: 
        // For 'name', we use `ilike` (case-insensitive LIKE) wrapped with `%` wildcards. 
        // This means a search for "curl" will match "Bicep Curls" or "Leg Curl".
        if (key === 'name') {
            if (typeof value !== 'string') {
                return null;
            }
            return ilike(exercises.name, `%${value.trim()}%`);
        }

        // B) Array Overlap Search:
        // For array fields like 'primarymuscles', the user might send a single muscle or multiple.
        // We use the Postgres `&&` operator which means "overlap" (intersection).
        // It checks if ANY item in the provided array exists in the database column array.
        if (arrayFields.includes(key)) {
            if (typeof value === 'string') {
                return sql`${exercises[typedKey]} && ARRAY[${value}]::text[]`;
            } else if (Array.isArray(value)) {
                return sql`${exercises[typedKey]} && ARRAY[${value.join(',')}]::text[]`;
            } else {
                return null;
            }
        }

        // C) Exact Scalar Match:
        // For simple fields like 'force' or 'level', we just do an exact match using `eq`.
        // E.g., WHERE level = 'beginner'
        if (typeof value === 'string' || typeof value === 'number') {
            return eq(exercises[typedKey], value);
        } else {
            return null;
        }
    }).filter((condition): condition is SQL<unknown> => condition !== null); // Filter out any mapping failures

    // 3. Execute the database queries using the dynamically generated conditions.
    const foundExercises = await exerciseDatabaseRepo.getExercises(andConditions, limit, page * limit);
    const count = await exerciseDatabaseRepo.getExercisesCount(andConditions);

    return {
        count,
        exercises: foundExercises
    };
};

export const getExerciseDetailsService = async (exerciseId: number) => {
    const foundExercise = await exerciseDatabaseRepo.getExerciseById(exerciseId);

    if (!foundExercise || foundExercise.length === 0) {
        throw new NotFoundError("Exercise Not Found");
    }

    return foundExercise[0];
};

export const getLatestExerciseStatsService = async (exerciseId: number, userId: number) => {
    const foundStats = await exerciseDatabaseRepo.getLatestExerciseStats(exerciseId, userId);

    if (!foundStats) {
        throw new Error("ERROR: error retreiving latest exercise stats");
    }

    // Map the results to match the original Drizzle relational query builder structure
    return foundStats.map(stat => ({
        ...stat.setsOfSessionsExercises,
        sessions: stat.sessions
    }));
};
