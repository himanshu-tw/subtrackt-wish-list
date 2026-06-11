import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

let db: NeonHttpDatabase | null = null;

export function getDb() {
  if (!db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set");
    }
    db = drizzle(neon(url));
  }
  return db;
}
