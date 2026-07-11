import * as repo from '@/modules/workout-sessions/repositories/workout-sessions.repository.js';
import verifyPlanCreatedByUser from "@/core/utils/verifyPlanWasCreatedByUser.js";
import Errors from "@/core/errors/errors.js";

export const createWorkoutSessionService = async (userId: number, planId: number | undefined, name: string, note: string | undefined, rating: number | undefined, startTime: Date, endTime: Date | undefined, exercisesArray: any[]) => {
    const dateString = startTime.toISOString().split('T')[0];
    const nameExists = await repo.findSessionByNameAndDate(userId, name, dateString);
    
    if (nameExists) {
        const error = new Error("This name already used on that day");
        (error as any).statusCode = 201;
        throw error;
    }

    if (planId) {
        const authorized = await verifyPlanCreatedByUser(planId, userId);
        if (!authorized) {
            const error = new Error("You are not authorized to use this plan");
            (error as any).statusCode = 401;
            throw error;
        }
    }

    const sessionData = {
        planId: planId ? planId : null,
        name: name,
        starttime: startTime,
        endtime: endTime ? endTime : null,
        note: note ? note : null,
        rating: rating ? rating : null,
        createdBy: userId,
    };

    const finished = await repo.createWorkoutSessionTransaction(sessionData, exercisesArray);
    
    if (!finished.success) {
        const error = new Error(finished.message);
        (error as any).statusCode = finished.statusCode || 500;
        throw error;
    }
    
    return finished.data;
};

export const getUserWorkoutSessionsByDateService = async (userId: number, startTime: Date) => {
    const dateStringDayStart = new Date(startTime.setHours(0, 0, 0, 0));
    const dateStringDayEnd = new Date(startTime.setHours(23, 59, 59, 999));
    const foundSessions = await repo.findSessionsByDateRange(userId, dateStringDayStart, dateStringDayEnd);
    if (!foundSessions) {
        throw new Errors.InternalServerError("ERROR: SERVER ERROR WHILE GETTING WORKOUT SESSIONS");
    }
    return foundSessions;
};

export const getWorkoutSessionDetailsService = async (sessionId: number, userId: number) => {
    const foundSession = await repo.findSessionByIdAndUserId(sessionId, userId);
    if (!foundSession) {
        throw new Errors.NotFoundError("Session not found");
    }

    const responseSessions = {
        id: foundSession.id,
        name: foundSession.name,
        starttime: foundSession.starttime.toISOString(),
        endtime: foundSession.endtime ? foundSession.endtime.toISOString() : null,
        note: foundSession.note,
        rating: foundSession.rating,
        createdBy: foundSession.createdBy,
    };
    
    const responseExercises = foundSession.setsOfSessionsExercises.map((exercise: any) => ({
        id: exercise.id,
        exerciseId: exercise.exerciseId,
        sessionsId: exercise.sessionId,
        creationDate: exercise.creationdate.toISOString(),
        order: exercise.order,
        weight: exercise.weight,
        unit: exercise.unit,
        reps: exercise.reps,
        exercise: exercise.exercises,
    }));

    return { session: responseSessions, exercises: responseExercises };
};

export const updateWorkoutSessionService = async (sessionId: number, newSessionName: string | undefined, newExercises: any[]) => {
    const checkTheSession = await repo.findSessionById(sessionId);
    if (checkTheSession.length === 0) {
        throw new Errors.BadRequestError("the session is not exist verify the id !");
    }

    if (newSessionName) {
        await repo.updateSessionName(sessionId, newSessionName);
    }
    if (newExercises) {
        await repo.replaceSessionExercises(sessionId, newExercises);
    }
};

export const deleteWorkoutSessionService = async (sessionId: number) => {
    const checkTheSession = await repo.findSessionById(sessionId);
    if (checkTheSession.length === 0) {
        throw new Errors.BadRequestError("the session is not deleted verify the id !");
    }
    await repo.deleteSessionTransaction(sessionId);
};
