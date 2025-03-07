import { relations } from "drizzle-orm/relations";
import { usersInMain, collectionsInMain, foodsInMain, mealsLogsInMain, plansInMain, exercisesInMain, plansExercisesInMain, sessionsInMain, setsOfSessionsExercisesInMain, templatesExercisesInMain, templatesInMain, weightsLogsInMain } from "./schema";

export const collectionsInMainRelations = relations(collectionsInMain, ({one, many}) => ({
	usersInMain: one(usersInMain, {
		fields: [collectionsInMain.userId],
		references: [usersInMain.id]
	}),
	plansInMains: many(plansInMain),
}));

export const usersInMainRelations = relations(usersInMain, ({many}) => ({
	collectionsInMains: many(collectionsInMain),
	foodsInMains: many(foodsInMain),
	mealsLogsInMains: many(mealsLogsInMain),
	weightsLogsInMains: many(weightsLogsInMain),
}));

export const foodsInMainRelations = relations(foodsInMain, ({one, many}) => ({
	usersInMain: one(usersInMain, {
		fields: [foodsInMain.createdBy],
		references: [usersInMain.id]
	}),
	mealsLogsInMains: many(mealsLogsInMain),
}));

export const mealsLogsInMainRelations = relations(mealsLogsInMain, ({one}) => ({
	foodsInMain: one(foodsInMain, {
		fields: [mealsLogsInMain.mealId],
		references: [foodsInMain.id]
	}),
	usersInMain: one(usersInMain, {
		fields: [mealsLogsInMain.userId],
		references: [usersInMain.id]
	}),
}));

export const plansInMainRelations = relations(plansInMain, ({one, many}) => ({
	collectionsInMain: one(collectionsInMain, {
		fields: [plansInMain.collectionId],
		references: [collectionsInMain.id]
	}),
	plansExercisesInMains: many(plansExercisesInMain),
	sessionsInMains: many(sessionsInMain),
}));

export const plansExercisesInMainRelations = relations(plansExercisesInMain, ({one}) => ({
	exercisesInMain: one(exercisesInMain, {
		fields: [plansExercisesInMain.exerciseId],
		references: [exercisesInMain.id]
	}),
	plansInMain: one(plansInMain, {
		fields: [plansExercisesInMain.planId],
		references: [plansInMain.id]
	}),
}));

export const exercisesInMainRelations = relations(exercisesInMain, ({many}) => ({
	plansExercisesInMains: many(plansExercisesInMain),
	setsOfSessionsExercisesInMains: many(setsOfSessionsExercisesInMain),
	templatesExercisesInMains: many(templatesExercisesInMain),
}));

export const sessionsInMainRelations = relations(sessionsInMain, ({one, many}) => ({
	plansInMain: one(plansInMain, {
		fields: [sessionsInMain.planId],
		references: [plansInMain.id]
	}),
	setsOfSessionsExercisesInMains: many(setsOfSessionsExercisesInMain),
}));

export const setsOfSessionsExercisesInMainRelations = relations(setsOfSessionsExercisesInMain, ({one}) => ({
	exercisesInMain: one(exercisesInMain, {
		fields: [setsOfSessionsExercisesInMain.exerciseId],
		references: [exercisesInMain.id]
	}),
	sessionsInMain: one(sessionsInMain, {
		fields: [setsOfSessionsExercisesInMain.sessionId],
		references: [sessionsInMain.id]
	}),
}));

export const templatesExercisesInMainRelations = relations(templatesExercisesInMain, ({one}) => ({
	exercisesInMain: one(exercisesInMain, {
		fields: [templatesExercisesInMain.exerciseId],
		references: [exercisesInMain.id]
	}),
	templatesInMain: one(templatesInMain, {
		fields: [templatesExercisesInMain.templateId],
		references: [templatesInMain.id]
	}),
}));

export const templatesInMainRelations = relations(templatesInMain, ({many}) => ({
	templatesExercisesInMains: many(templatesExercisesInMain),
}));

export const weightsLogsInMainRelations = relations(weightsLogsInMain, ({one}) => ({
	usersInMain: one(usersInMain, {
		fields: [weightsLogsInMain.userId],
		references: [usersInMain.id]
	}),
}));