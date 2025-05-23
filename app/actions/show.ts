"use server";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { usersTable } from "../db/schema"; // Assume you have this table defined
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function getSavedImages(userEmail: string | null) {
  if (!userEmail) return [];

  const savedImages = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, userEmail));

  // Return exactly the fields we want, or just return as-is and map on client
  return savedImages;
}
