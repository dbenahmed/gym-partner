import { relations } from "drizzle-orm/relations";
import { users, collections, foods, foodsLogs, plans, exercises, plansExercises, sessions, setsOfSessionsExercises, templatesExercises, templates, weightsLogs } from "./schema.js";

export const collectionsRelations = relations(collections, ({one, many}) => ({
	users: one(users, {
		fields: [collections.userId],
		references: [users.id]
	}),
	plans: many(plans),
}));

export const usersRelations = relations(users, ({many}) => ({
	collections: many(collections),
	foods: many(foods),
	foodsLogs: many(foodsLogs),
	weightsLogs: many(weightsLogs),
}));

export const foodsRelations = relations(foods, ({one, many}) => ({
	users: one(users, {
		fields: [foods.createdBy],
		references: [users.id]
	}),
	foodsLogs: many(foodsLogs),
}));

export const foodsLogsRelations = relations(foodsLogs, ({one}) => ({
	foods: one(foods, {
		fields: [foodsLogs.foodId],
		references: [foods.id]
	}),
	users: one(users, {
		fields: [foodsLogs.userId],
		references: [users.id]
	}),
}));

export const plansRelations = relations(plans, ({one, many}) => ({
	collections: one(collections, {
		fields: [plans.collectionId],
		references: [collections.id]
	}),
	plansExercises: many(plansExercises),
	sessions: many(sessions),
}));

export const plansExercisesRelations = relations(plansExercises, ({one}) => ({
	exercises: one(exercises, {
		fields: [plansExercises.exerciseId],
		references: [exercises.id]
	}),
	plans: one(plans, {
		fields: [plansExercises.planId],
		references: [plans.id]
	}),
}));

export const exercisesRelations = relations(exercises, ({many}) => ({
	plansExercises: many(plansExercises),
	setsOfSessionsExercises: many(setsOfSessionsExercises),
	templatesExercises: many(templatesExercises),
}));

export const sessionsRelations = relations(sessions, ({one, many}) => ({
	plans: one(plans, {
		fields: [sessions.planId],
		references: [plans.id]
	}),
	setsOfSessionsExercises: many(setsOfSessionsExercises),
}));

export const setsOfSessionsExercisesRelations = relations(setsOfSessionsExercises, ({one}) => ({
	exercises: one(exercises, {
		fields: [setsOfSessionsExercises.exerciseId],
		references: [exercises.id]
	}),
	sessions: one(sessions, {
		fields: [setsOfSessionsExercises.sessionId],
		references: [sessions.id]
	}),
}));

export const templatesExercisesRelations = relations(templatesExercises, ({one}) => ({
	exercises: one(exercises, {
		fields: [templatesExercises.exerciseId],
		references: [exercises.id]
	}),
	templates: one(templates, {
		fields: [templatesExercises.templateId],
		references: [templates.id]
	}),
}));

export const templatesRelations = relations(templates, ({many}) => ({
	templatesExercises: many(templatesExercises),
}));

export const weightsLogsRelations = relations(weightsLogs, ({one}) => ({
	users: one(users, {
		fields: [weightsLogs.userId],
		references: [users.id]
	}),
}));