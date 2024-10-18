ALTER TABLE "user" DROP CONSTRAINT "username_check";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "username_check" CHECK (username ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$');