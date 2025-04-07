ALTER TABLE "dev"."foods" ADD COLUMN "likes" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "dev"."foods" ADD COLUMN "dislikes" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "dev"."foods" ADD COLUMN "status" varchar(50) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "dev"."foods" ADD CONSTRAINT "foods_status_check" CHECK ((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('verified'::character varying)::text, ('refused'::character varying)::text]));