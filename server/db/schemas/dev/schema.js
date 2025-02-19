import {
	check,
	serial,
	varchar,
	text,
	timestamp,
	foreignKey,
	integer,
	boolean,
	unique,
	pgSchema
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


const devSchema = pgSchema("dev")


export const exercises = devSchema.table("exercises", {
	id: integer().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	force: varchar({ length: 10 }).default(sql`NULL`),
	level: varchar({ length: 15 }).notNull(),
	mechanic: varchar({ length: 15 }).default(sql`NULL`),
	equipment: varchar({ length: 30 }).default(sql`NULL`),
	primarymuscles: text().array().notNull(),
	secondarymuscles: text().array(),
	instructions: text().array().notNull(),
	category: varchar({ length: 30 }).notNull(),
	images: text().array().notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	check("exercises_category_check", sql`(category)::text = ANY (ARRAY[('powerlifting'::character varying)::text, ('strength'::character varying)::text, ('stretching'::character varying)::text, ('cardio'::character varying)::text, ('olympic weightlifting'::character varying)::text, ('strongman'::character varying)::text, ('plyometrics'::character varying)::text])`),
	check("exercises_equipment_check", sql`(equipment)::text = ANY (ARRAY[('medicine ball'::character varying)::text, ('dumbbell'::character varying)::text, ('body only'::character varying)::text, ('bands'::character varying)::text, ('kettlebells'::character varying)::text, ('foam roll'::character varying)::text, ('cable'::character varying)::text, ('machine'::character varying)::text, ('barbell'::character varying)::text, ('exercise ball'::character varying)::text, ('e-z curl bar'::character varying)::text, ('other'::character varying)::text])`),
	check("exercises_force_check", sql`(force)::text = ANY (ARRAY[('static'::character varying)::text, ('pull'::character varying)::text, ('push'::character varying)::text])`),
	check("exercises_level_check", sql`(level)::text = ANY (ARRAY[('beginner'::character varying)::text, ('intermediate'::character varying)::text, ('expert'::character varying)::text])`),
	check("exercises_mechanic_check", sql`(mechanic)::text = ANY (ARRAY[('isolation'::character varying)::text, ('compound'::character varying)::text])`),
]);

export const foods = devSchema.table("foods", {
	id: integer().primaryKey().notNull(),
	foodname: varchar({ length: 255 }).notNull(),
	description: text().default(''),
	calories: integer(),
	proteinper100g: integer(),
	carbohydratesper100g: integer(),
	fatper100g: integer(),
	saturatedfatper100g: integer(),
	transfat: integer(),
	fiber: integer(),
	sugar: integer(),
	sodium: integer(),
	cholesterol: integer(),
	brand: varchar({ length: 255 }),
	custom: boolean().default(false),
	createdBy: serial("created_by").notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.id],
			name: "fk_created_by"
		}).onDelete("set null"),
	check("foods_calories_check", sql`calories >= 0`),
	check("foods_carbohydratesper100g_check", sql`carbohydratesper100g >= 0`),
	check("foods_cholesterol_check", sql`cholesterol >= 0`),
	check("foods_fatper100g_check", sql`fatper100g >= 0`),
	check("foods_fiber_check", sql`fiber >= 0`),
	check("foods_foodname_check", sql`length((foodname)::text) > 0`),
	check("foods_proteinper100g_check", sql`proteinper100g >= 0`),
	check("foods_saturatedfatper100g_check", sql`saturatedfatper100g >= 0`),
	check("foods_sodium_check", sql`sodium >= 0`),
	check("foods_sugar_check", sql`sugar >= 0`),
	check("foods_transfat_check", sql`transfat >= 0`),
]);

export const mealsLogs = devSchema.table("meals_logs", {
	id: integer().primaryKey().notNull(),
	mealId: integer("meal_id").notNull(),
	userId: integer("user_id").notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updateddate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	description: text(),
	servingsizeG: integer("servingsize_g"),
}, (table) => [
	foreignKey({
			columns: [table.mealId],
			foreignColumns: [foods.id],
			name: "fk_meal"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_user"
		}).onDelete("cascade"),
	check("meals_logs_servingsize_g_check", sql`servingsize_g >= 0`),
]);

export const plans = devSchema.table("plans", {
	id: integer().primaryKey().notNull(),
	collectionId: integer("collection_id").notNull(),
	title: varchar({ length: 100 }).notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.collectionId],
			foreignColumns: [collections.id],
			name: "plans_collection_id_fkey"
		}).onDelete("cascade"),
	check("plans_title_check", sql`length((title)::text) >= 1`),
]);

export const sessions = devSchema.table("sessions", {
	id: integer().primaryKey().notNull(),
	planId: integer("plan_id"),
	duedate: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	name: varchar({ length: 100 }).notNull(),
	starttime: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	endtime: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	note: text(),
	rating: integer(),
}, (table) => [
	foreignKey({
			columns: [table.planId],
			foreignColumns: [plans.id],
			name: "fk_plan"
		}).onDelete("cascade"),
	check("sessions_name_check", sql`length((name)::text) >= 1`),
	check("sessions_rating_check", sql`(rating >= 0) AND (rating <= 5)`),
]);

export const setsOfSessionsExercises = devSchema.table("sets_of_sessions_exercises", {
	id: integer().primaryKey().notNull(),
	sessionId: integer("session_id").notNull(),
	exerciseId: integer("exercise_id").notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	order: integer().notNull(),
	weight: integer().notNull(),
	unit: varchar({ length: 10 }).notNull(),
	reps: integer().array().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.exerciseId],
			foreignColumns: [exercises.id],
			name: "fk_session_exercise_id"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.sessionId],
			foreignColumns: [sessions.id],
			name: "fk_session_id"
		}).onDelete("cascade"),
	check("sets_of_sessions_exercises_reps_check", sql`array_length(reps, 1) > 0`),
	check("sets_of_sessions_exercises_unit_check", sql`(unit)::text = ANY (ARRAY[('kg'::character varying)::text, ('lbs'::character varying)::text])`),
	check("sets_of_sessions_exercises_weight_check", sql`weight >= 0`),
]);

/*export const sessionsExercises = devSchema.table("sessions_exercises", {
	id: integer().primaryKey().notNull(),
	exerciseId: integer("exercise_id").notNull(),
	sessionId: integer("session_id").notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.sessionId],
			foreignColumns: [sessions.id],
			name: "fk_sesions"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.exerciseId],
			foreignColumns: [exercises.id],
			name: "fk_database"
		}).onDelete("cascade"),
]);*/

export const collections = devSchema.table("collections", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	title: varchar({ length: 100 }).notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "collections_user_id_fkey"
		}).onDelete("cascade"),
	check("collections_title_check", sql`length((title)::text) >= 1`),
]);

export const templatesExercises = devSchema.table("templates_exercises", {
	id: integer().primaryKey().notNull(),
	templateId: integer("template_id").notNull(),
	exerciseId: integer("exercise_id").notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	order: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.exerciseId],
			foreignColumns: [exercises.id],
			name: "fk_exercise"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.templateId],
			foreignColumns: [templates.id],
			name: "fk_template"
		}).onDelete("cascade"),
]);

export const users = devSchema.table("users", {
	id: integer().primaryKey().notNull(),
	username: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 72 }).notNull(),
	salt: varchar({ length: 255 }).notNull(),
	refreshtoken: varchar({ length: 255 }),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	avatar: varchar({ length: 255 }),
	email: varchar({ length: 100 }).notNull(),
	firstname: varchar({ length: 50 }),
	lastname: varchar({ length: 50 }),
}, (table) => [
	unique("users_username_key").on(table.username),
	unique("users_refreshtoken_key").on(table.refreshtoken),
	unique("users_email_key").on(table.email),
	check("users_email_check", sql`(email)::text ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'::text`),
	check("users_username_check", sql`(length((username)::text) > 3) AND ((username)::text ~ '^[a-zA-Z0-9_]+$'::text)`),
]);

export const weightsLogs = devSchema.table("weights_logs", {
	id: integer().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	weight: integer(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	unit: varchar({ length: 3 }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "fk_user"
		}).onDelete("cascade"),
	check("weights_logs_unit_check", sql`(unit)::text = ANY (ARRAY[('kg'::character varying)::text, ('lbs'::character varying)::text])`),
	check("weights_logs_weight_check", sql`weight >= 0`),
]);

export const plansExercises = devSchema.table("plans_exercises", {
	id: integer().primaryKey().notNull(),
	planId: integer("plan_id").notNull(),
	exerciseId: integer("exercise_id").notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	order: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.planId],
			foreignColumns: [plans.id],
			name: "fk_plan"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.exerciseId],
			foreignColumns: [exercises.id],
			name: "fk_exercise"
		}).onDelete("cascade"),
]);

export const templates = devSchema.table("templates", {
	id: integer().primaryKey().notNull(),
	title: varchar({ length: 100 }).notNull(),
	creationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updationdate: timestamp({ withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	check("templates_title_check", sql`length((title)::text) >= 1`),
]);
