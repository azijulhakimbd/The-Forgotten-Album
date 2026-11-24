import { cookies } from "next/headers";
import { verifySessionToken, TokenPayload } from "./jwt";
import { SEED_ADMIN_USER } from "@/db/seed-data";
import { User, Role } from "@/types";
import { db, isDbConfigured } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tfa_session")?.value;

    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload) return null;

    // Check DB if configured, otherwise check demo curator
    if (isDbConfigured && db) {
      const dbUsers = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
      const found = dbUsers[0];
      if (found) {
        return {
          id: found.id,
          name: found.name,
          email: found.email,
          role: (found.role as Role) || "user",
          image: found.image,
          bio: found.bio,
          createdAt: found.createdAt.toISOString(),
          updatedAt: found.updatedAt.toISOString(),
        };
      }
    }

    // Fallback match with seed curator if demo session
    if (payload.userId === SEED_ADMIN_USER.id || payload.email === SEED_ADMIN_USER.email) {
      return SEED_ADMIN_USER;
    }

    return {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Session lookup error:", err);
    return null;
  }
}

export function hasPermission(userRole: Role, minimumRole: Role): boolean {
  const hierarchy: Record<Role, number> = {
    super_admin: 5,
    admin: 4,
    editor: 3,
    author: 2,
    user: 1,
  };

  return hierarchy[userRole] >= hierarchy[minimumRole];
}
