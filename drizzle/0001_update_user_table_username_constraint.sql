ALTER TABLE "user" DROP CONSTRAINT "username_check";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "username_check" CHECK (LENGTH("user"."username") > 2 AND username ~ '^[a-z0-9-]*$');