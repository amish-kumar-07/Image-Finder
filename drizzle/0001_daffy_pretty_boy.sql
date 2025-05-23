ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_url_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdat" SET DEFAULT now();