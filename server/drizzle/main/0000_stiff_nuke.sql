-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(72) NOT NULL,
	"salt" varchar(255),
	"refreshtoken" varchar(255),
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"avatar" varchar(255),
	"email" varchar(100),
	"firstname" varchar(50),
	"lastname" varchar(50),
	CONSTRAINT "users_username_key" UNIQUE("username"),
	CONSTRAINT "users_refreshtoken_key" UNIQUE("refreshtoken"),
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_email_check" CHECK ((email)::text ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'::text),
	CONSTRAINT "users_username_check" CHECK ((length((username)::text) > 3) AND ((username)::text ~ '^[a-zA-Z0-9_]+$'::text))
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(100) NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"description" text,
	CONSTRAINT "collections_title_check" CHECK (length((title)::text) >= 1)
);
--> statement-breakpoint
CREATE TABLE "foods" (
	"id" serial PRIMARY KEY NOT NULL,
	"foodname" varchar(255) NOT NULL,
	"description" text DEFAULT '',
	"calories" integer,
	"proteinper100g" integer,
	"carbohydratesper100g" integer,
	"fatper100g" integer,
	"saturatedfatper100g" integer,
	"transfat" integer,
	"fiber" integer,
	"sugar" integer,
	"sodium" integer,
	"cholesterol" integer,
	"brand" varchar(255),
	"custom" boolean DEFAULT false,
	"created_by" integer,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"likes" integer DEFAULT 0,
	"dislikes" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'pending',
	CONSTRAINT "foods_calories_check" CHECK (calories >= 0),
	CONSTRAINT "foods_carbohydratesper100g_check" CHECK (carbohydratesper100g >= 0),
	CONSTRAINT "foods_cholesterol_check" CHECK (cholesterol >= 0),
	CONSTRAINT "foods_fatper100g_check" CHECK (fatper100g >= 0),
	CONSTRAINT "foods_fiber_check" CHECK (fiber >= 0),
	CONSTRAINT "foods_foodname_check" CHECK (length((foodname)::text) > 0),
	CONSTRAINT "foods_proteinper100g_check" CHECK (proteinper100g >= 0),
	CONSTRAINT "foods_saturatedfatper100g_check" CHECK (saturatedfatper100g >= 0),
	CONSTRAINT "foods_sodium_check" CHECK (sodium >= 0),
	CONSTRAINT "foods_sugar_check" CHECK (sugar >= 0),
	CONSTRAINT "foods_transfat_check" CHECK (transfat >= 0),
	CONSTRAINT "foods_status_check" CHECK ((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('verified'::character varying)::text, ('refused'::character varying)::text]))
);
--> statement-breakpoint
CREATE TABLE "foods_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"food_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updateddate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"description" text,
	"servingsize_g" integer,
	"date" date NOT NULL,
	CONSTRAINT "foods_logs_servingsize_g_check" CHECK (servingsize_g >= 0)
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection_id" integer NOT NULL,
	"title" varchar(100) NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "plans_title_check" CHECK (length((title)::text) >= 1)
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"force" varchar(10) DEFAULT NULL,
	"level" varchar(15) NOT NULL,
	"mechanic" varchar(15) DEFAULT NULL,
	"equipment" varchar(30) DEFAULT NULL,
	"primarymuscles" text[] NOT NULL,
	"secondarymuscles" text[],
	"instructions" text[] NOT NULL,
	"category" varchar(30) NOT NULL,
	"images" text[] NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "exercises_category_check" CHECK ((category)::text = ANY (ARRAY[('powerlifting'::character varying)::text, ('strength'::character varying)::text, ('stretching'::character varying)::text, ('cardio'::character varying)::text, ('olympic weightlifting'::character varying)::text, ('strongman'::character varying)::text, ('plyometrics'::character varying)::text])),
	CONSTRAINT "exercises_equipment_check" CHECK ((equipment)::text = ANY (ARRAY[('medicine ball'::character varying)::text, ('dumbbell'::character varying)::text, ('body only'::character varying)::text, ('bands'::character varying)::text, ('kettlebells'::character varying)::text, ('foam roll'::character varying)::text, ('cable'::character varying)::text, ('machine'::character varying)::text, ('barbell'::character varying)::text, ('exercise ball'::character varying)::text, ('e-z curl bar'::character varying)::text, ('other'::character varying)::text])),
	CONSTRAINT "exercises_force_check" CHECK ((force)::text = ANY (ARRAY[('static'::character varying)::text, ('pull'::character varying)::text, ('push'::character varying)::text])),
	CONSTRAINT "exercises_level_check" CHECK ((level)::text = ANY (ARRAY[('beginner'::character varying)::text, ('intermediate'::character varying)::text, ('expert'::character varying)::text])),
	CONSTRAINT "exercises_mechanic_check" CHECK ((mechanic)::text = ANY (ARRAY[('isolation'::character varying)::text, ('compound'::character varying)::text]))
);
--> statement-breakpoint
CREATE TABLE "plans_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer,
	"duedate" date NOT NULL,
	"name" varchar(100) NOT NULL,
	"starttime" time,
	"endtime" time,
	"note" text,
	"rating" integer,
	"created_by" integer NOT NULL,
	CONSTRAINT "sessions_name_check" CHECK (length((name)::text) >= 1),
	CONSTRAINT "sessions_rating_check" CHECK ((rating >= 0) AND (rating <= 5))
);
--> statement-breakpoint
CREATE TABLE "sets_of_sessions_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"order" integer NOT NULL,
	"weight" integer[] NOT NULL,
	"unit" varchar(10)[] NOT NULL,
	"reps" integer[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates_exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"template_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "templates_title_check" CHECK (length((title)::text) >= 1)
);
--> statement-breakpoint
CREATE TABLE "weights_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"weight" integer,
	"creationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updationdate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"unit" varchar(3),
	CONSTRAINT "weights_logs_unit_check" CHECK ((unit)::text = ANY (ARRAY[('kg'::character varying)::text, ('lbs'::character varying)::text])),
	CONSTRAINT "weights_logs_weight_check" CHECK (weight >= 0)
);
--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "fk_created_by" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods_logs" ADD CONSTRAINT "fk_food" FOREIGN KEY ("food_id") REFERENCES "public"."foods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foods_logs" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans" ADD CONSTRAINT "plans_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans_exercises" ADD CONSTRAINT "fk_exercise" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans_exercises" ADD CONSTRAINT "fk_plan" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "fk_plan" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "fk_created_by" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sets_of_sessions_exercises" ADD CONSTRAINT "fk_session_exercise_id" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sets_of_sessions_exercises" ADD CONSTRAINT "fk_session_id" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates_exercises" ADD CONSTRAINT "fk_exercise" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "templates_exercises" ADD CONSTRAINT "fk_template" FOREIGN KEY ("template_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weights_logs" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
*/