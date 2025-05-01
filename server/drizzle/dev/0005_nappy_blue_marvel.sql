ALTER TABLE "dev"."sets_of_sessions_exercises" DROP CONSTRAINT "sets_of_sessions_exercises_reps_check";--> statement-breakpoint
ALTER TABLE "dev"."sets_of_sessions_exercises" ALTER COLUMN "weight" SET DATA TYPE integer[] USING array["weight"];--> statement-breakpoint
ALTER TABLE "dev"."sets_of_sessions_exercises" ALTER COLUMN "unit" SET DATA TYPE varchar(10)[] USING array["unit"];--> statement-breakpoint
