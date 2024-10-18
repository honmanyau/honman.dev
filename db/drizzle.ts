import "$std/dotenv/load.ts";
import { drizzle } from "drizzle-orm/postgres-js";

import { getEnvironmentVariable } from "@/utils/environment.ts";

const databaseUrl = getEnvironmentVariable("DATABASE_URL");

export const db = drizzle(databaseUrl);
