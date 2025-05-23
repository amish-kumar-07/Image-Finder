import { timestamp, pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  createdat: timestamp('createdat').defaultNow().notNull(),
});