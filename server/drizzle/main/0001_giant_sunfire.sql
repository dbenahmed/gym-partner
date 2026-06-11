

BEGIN;

-- your SQL statements

ALTER TABLE "sessions" ALTER COLUMN "starttime" SET DATA TYPE timestamp with time zone USING duedate::timestamp + COALESCE (starttime::time::interval ,'00:00:00'::interval);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "endtime" SET DATA TYPE timestamp with time zone USING duedate::timestamp + COALESCE (starttime::time::interval ,'00:00:00'::interval);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "starttime" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "duedate";
COMMIT;
