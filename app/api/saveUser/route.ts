// app/api/saveUser/route.ts
import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { usersTable } from "../../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function POST(request: Request) {
  try {
    const { name, email, url } = await request.json();
    console.log("Received:", { name, email, url });

    if (!name || !email || !url) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Insert new record
    const result = await db
      .insert(usersTable)
      .values({
        name,
        email,
        url,
        createdat: new Date(), // Pass Date object, not string
      })
      .returning(); // This will return the inserted row

    console.log("Insert result:", result);

    if (result.length > 0) {
      return NextResponse.json({ 
        success: true, 
        data: result[0],
        message: "Image saved successfully" 
      });
    } else {
      throw new Error("No rows were inserted");
    }

  } catch (error) {
    console.error("Failed to save user:", error);
    
    // More detailed error handling
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        return NextResponse.json({ 
          error: "Image already saved or duplicate entry" 
        }, { status: 409 });
      }
    }
    
    return NextResponse.json({ 
      error: "Failed to save user",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}