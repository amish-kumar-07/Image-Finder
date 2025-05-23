import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { usersTable } from "../../db/schema";
import { eq, and } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function DELETE(request: Request) {
  try {
    const { email, url } = await request.json();

    if (!email || !url) {
      return NextResponse.json({ error: "Missing email or URL" }, { status: 400 });
    }

    const deletedRows = await db
      .delete(usersTable)
      .where(and(eq(usersTable.email, email), eq(usersTable.url, url)))
      .returning();

    if (deletedRows.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Image deleted successfully",
        data: deletedRows,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "No matching image found to delete",
      }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to delete image:", error);
    return NextResponse.json({
      error: "Failed to delete image",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
