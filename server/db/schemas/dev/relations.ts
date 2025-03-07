import { relations } from "drizzle-orm/relations";
import { usersInDev, collectionsInDev, foodsInDev, mealsLogsInDev, plansInDev, exercisesInDev, plansExercisesInDev, sessionsInDev, setsOfSessionsExercisesInDev, templatesExercisesInDev, templatesInDev, weightsLogsInDev } from "./schema";

export const collectionsInDevRelations = relations(collectionsInDev, ({one, many}) => ({
	usersInDev: one(usersInDev, {
		fields: [collectionsInDev.userId],
		references: [usersInDev.id]
	}),
	plansInDevs: many(plansInDev),
}));

export const usersInDevRelations = relations(usersInDev, ({many}) => ({
	collectionsInDevs: many(collectionsInDev),
	foodsInDevs: many(foodsInDev),
	mealsLogsInDevs: many(mealsLogsInDev),
	weightsLogsInDevs: many(weightsLogsInDev),
}));

export const foodsInDevRelations = relations(foodsInDev, ({one, many}) => ({
	usersInDev: one(usersInDev, {
		fields: [foodsInDev.createdBy],
		references: [usersInDev.id]
	}),
	mealsLogsInDevs: many(mealsLogsInDev),
}));

export const mealsLogsInDevRelations = relations(mealsLogsInDev, ({one}) => ({
	foodsInDev: one(foodsInDev, {
		fields: [mealsLogsInDev.mealId],
		references: [foodsInDev.id]
	}),
	usersInDev: one(usersInDev, {
		fields: [mealsLogsInDev.userId],
		references: [usersInDev.id]
	}),
}));

export const plansInDevRelations = relations(plansInDev, ({one, many}) => ({
	collectionsInDev: one(collectionsInDev, {
		fields: [plansInDev.collectionId],
		references: [collectionsInDev.id]
	}),
	plansExercisesInDevs: many(plansExercisesInDev),
	sessionsInDevs: many(sessionsInDev),
}));

export const plansExercisesInDevRelations = relations(plansExercisesInDev, ({one}) => ({
	exercisesInDev: one(exercisesInDev, {
		fields: [plansExercisesInDev.exerciseId],
		references: [exercisesInDev.id]
	}),
	plansInDev: one(plansInDev, {
		fields: [plansExercisesInDev.planId],
		references: [plansInDev.id]
	}),
}));

export const exercisesInDevRelations = relations(exercisesInDev, ({many}) => ({
	plansExercisesInDevs: many(plansExercisesInDev),
	setsOfSessionsExercisesInDevs: many(setsOfSessionsExercisesInDev),
	templatesExercisesInDevs: many(templatesExercisesInDev),
}));

export const sessionsInDevRelations = relations(sessionsInDev, ({one, many}) => ({
	plansInDev: one(plansInDev, {
		fields: [sessionsInDev.planId],
		references: [plansInDev.id]
	}),
	setsOfSessionsExercisesInDevs: many(setsOfSessionsExercisesInDev),
}));

export const setsOfSessionsExercisesInDevRelations = relations(setsOfSessionsExercisesInDev, ({one}) => ({
	exercisesInDev: one(exercisesInDev, {
		fields: [setsOfSessionsExercisesInDev.exerciseId],
		references: [exercisesInDev.id]
	}),
	sessionsInDev: one(sessionsInDev, {
		fields: [setsOfSessionsExercisesInDev.sessionId],
		references: [sessionsInDev.id]
	}),
}));

export const templatesExercisesInDevRelations = relations(templatesExercisesInDev, ({one}) => ({
	exercisesInDev: one(exercisesInDev, {
		fields: [templatesExercisesInDev.exerciseId],
		references: [exercisesInDev.id]
	}),
	templatesInDev: one(templatesInDev, {
		fields: [templatesExercisesInDev.templateId],
		references: [templatesInDev.id]
	}),
}));

export const templatesInDevRelations = relations(templatesInDev, ({many}) => ({
	templatesExercisesInDevs: many(templatesExercisesInDev),
}));

export const weightsLogsInDevRelations = relations(weightsLogsInDev, ({one}) => ({
	usersInDev: one(usersInDev, {
		fields: [weightsLogsInDev.userId],
		references: [usersInDev.id]
	}),
}));