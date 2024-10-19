import { pgTable, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const oauthProvider = pgEnum("oauth_provider", ['github'])




