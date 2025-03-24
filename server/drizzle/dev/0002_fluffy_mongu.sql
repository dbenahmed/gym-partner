ALTER TABLE "dev"."meals_logs" RENAME TO "foods_logs";--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" RENAME COLUMN "meal_id" TO "food_id";--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" DROP CONSTRAINT "meals_logs_servingsize_g_check";--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" DROP CONSTRAINT "fk_meal";
--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" DROP CONSTRAINT "fk_user";
--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" ADD CONSTRAINT "fk_food" FOREIGN KEY ("food_id") REFERENCES "dev"."foods"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" ADD CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "dev"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dev"."foods_logs" ADD CONSTRAINT "foods_logs_servingsize_g_check" CHECK (servingsize_g >= 0);