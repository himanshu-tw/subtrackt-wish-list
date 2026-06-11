import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
