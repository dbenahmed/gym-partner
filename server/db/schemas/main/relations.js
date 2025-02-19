import { relations } from "drizzle-orm/relations";
import { users, foods, mealsLogs, collections, plans, sessions, exercises, setsOfSessionsExercises, tasks, templatesExercises, templates, weightsLogs, plansExercises } from "./schema.js";

export const foodsRelations = relations(foods, ({one, many}) => ({
	user: one(users, {
		fields: [foods.createdBy],
		references: [users.id]
	}),
	mealsLogs: many(mealsLogs),
}));

export const usersRelations = relations(users, ({many}) => ({
	foods: many(foods),
	mealsLogs: many(mealsLogs),
	collections: many(collections),
	weightsLogs: many(weightsLogs),
}));

export const mealsLogsRelations = relations(mealsLogs, ({one}) => ({
	food: one(foods, {
		fields: [mealsLogs.mealId],
		references: [foods.id]
	}),
	user: one(users, {
		fields: [mealsLogs.userId],
		references: [users.id]
	}),
}));

export const plansRelations = relations(plans, ({one, many}) => ({
	collection: one(collections, {
		fields: [plans.collectionId],
		references: [collections.id]
	}),
	sessions: many(sessions),
	plansExercises: many(plansExercises),
}));

export const collectionsRelations = relations(collections, ({one, many}) => ({
	plans: many(plans),
	user: one(users, {
		fields: [collections.userId],
		references: [users.id]
	}),
}));

export const sessionsRelations = relations(sessions, ({one, many}) => ({
	plan: one(plans, {
		fields: [sessions.planId],
		references: [plans.id]
	}),
	setsOfSessionsExercises: many(setsOfSessionsExercises),
	tasks: many(tasks),
}));

export const setsOfSessionsExercisesRelations = relations(setsOfSessionsExercises, ({one}) => ({
	exercise: one(exercises, {
		fields: [setsOfSessionsExercises.exerciseId],
		references: [exercises.id]
	}),
	session: one(sessions, {
		fields: [setsOfSessionsExercises.sessionId],
		references: [sessions.id]
	}),
}));

export const exercisesRelations = relations(exercises, ({many}) => ({
	setsOfSessionsExercises: many(setsOfSessionsExercises),
	tasks: many(tasks),
	templatesExercises: many(templatesExercises),
	plansExercises: many(plansExercises),
}));

export const tasksRelations = relations(tasks, ({one}) => ({
	session: one(sessions, {
		fields: [tasks.sessionId],
		references: [sessions.id]
	}),
	exercise: one(exercises, {
		fields: [tasks.exerciseId],
		references: [exercises.id]
	}),
}));

export const templatesExercisesRelations = relations(templatesExercises, ({one}) => ({
	exercise: one(exercises, {
		fields: [templatesExercises.exerciseId],
		references: [exercises.id]
	}),
	template: one(templates, {
		fields: [templatesExercises.templateId],
		references: [templates.id]
	}),
}));

export const templatesRelations = relations(templates, ({many}) => ({
	templatesExercises: many(templatesExercises),
}));

export const weightsLogsRelations = relations(weightsLogs, ({one}) => ({
	user: one(users, {
		fields: [weightsLogs.userId],
		references: [users.id]
	}),
}));

export const plansExercisesRelations = relations(plansExercises, ({one}) => ({
	plan: one(plans, {
		fields: [plansExercises.planId],
		references: [plans.id]
	}),
	exercise: one(exercises, {
		fields: [plansExercises.exerciseId],
		references: [exercises.id]
	}),
}));