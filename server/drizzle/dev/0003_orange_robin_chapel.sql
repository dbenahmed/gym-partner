ALTER TABLE "dev"."sessions" ALTER COLUMN "duedate" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "dev"."sessions" ALTER COLUMN "starttime" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "dev"."sessions" ALTER COLUMN "starttime" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dev"."sessions" ALTER COLUMN "endtime" SET DATA TYPE time;--> statement-breakpoint
ALTER TABLE "dev"."sessions" ALTER COLUMN "endtime" DROP NOT NULL;