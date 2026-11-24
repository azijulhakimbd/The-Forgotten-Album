import { NextResponse } from "next/server";
import { z } from "zod";
import { db, isDbConfigured } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { eq } from "drizzle-orm";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// In-memory set for duplicate tracking when database is in demo/fallback mode
const registeredEmails = new Set<string>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = newsletterSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: parse.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    const email = parse.data.email.toLowerCase().trim();

    // Live Database persistence if configured
    if (isDbConfigured && db) {
      const existing = await db
        .select()
        .from(newsletterSubscribers)
        .where(eq(newsletterSubscribers.email, email))
        .limit(1);

      if (existing.length > 0) {
        return NextResponse.json(
          { message: "You are already subscribed to The Forgotten Album dispatch." },
          { status: 200 }
        );
      }

      await db.insert(newsletterSubscribers).values({
        email,
        status: "active",
        confirmedAt: new Date(),
      });
    } else {
      // Graceful fallback for local development / demo mode
      if (registeredEmails.has(email)) {
        return NextResponse.json(
          { message: "You are already subscribed to The Forgotten Album dispatch." },
          { status: 200 }
        );
      }
      registeredEmails.add(email);
    }

    return NextResponse.json(
      { message: "Welcome to The Forgotten Album. You will receive our historical dispatch." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
