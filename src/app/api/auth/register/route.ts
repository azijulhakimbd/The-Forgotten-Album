import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db, isDbConfigured } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { signSessionToken } from "@/lib/auth/jwt";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parse = registerSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { error: parse.error.issues[0]?.message || "Invalid registration data" },
        { status: 400 }
      );
    }

    const { name, email, password } = parse.data;
    const cleanEmail = email.toLowerCase().trim();

    if (isDbConfigured && db) {
      const existing = await db.select().from(users).where(eq(users.email, cleanEmail)).limit(1);
      if (existing.length > 0) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const inserted = await db
        .insert(users)
        .values({
          name,
          email: cleanEmail,
          passwordHash,
          role: "user",
        })
        .returning();

      const newUser = inserted[0];
      const token = await signSessionToken({
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: "user",
      });

      const response = NextResponse.json({
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: "user" },
      });

      response.cookies.set("tfa_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } else {
      // Demo mock registration
      const mockId = `u-${Date.now()}`;
      const token = await signSessionToken({
        userId: mockId,
        email: cleanEmail,
        name,
        role: "user",
      });

      const response = NextResponse.json({
        success: true,
        user: { id: mockId, name, email: cleanEmail, role: "user" },
      });

      response.cookies.set("tfa_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
