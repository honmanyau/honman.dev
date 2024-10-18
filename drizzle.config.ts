import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import process from "node:process";

export default defineConfig({
    out: "./drizzle",
    schema: "./db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
