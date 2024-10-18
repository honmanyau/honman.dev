CREATE TYPE "public"."oauth_provider" AS ENUM('github');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"updated" timestamp DEFAULT now() NOT NULL,
	"oauthId" varchar(255) NOT NULL,
	"oauthProvider" "oauth_provider" NOT NULL,
	"username" varchar(32) NOT NULL,
	"displayName" varchar(255),
	"email" varchar(255),
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "username_check" CHECK (LENGTH("user"."username") > 2)
);
