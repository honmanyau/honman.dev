ALTER TYPE "public"."oauth_provider" ADD VALUE 'facebook' BEFORE 'github';--> statement-breakpoint
ALTER TYPE "public"."oauth_provider" ADD VALUE 'google';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created" SET DATA TYPE timestamp (6) with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated" SET DATA TYPE timestamp (6) with time zone;