import { SignJWT, jwtVerify } from "jose";
import { Role } from "@/types";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "the-forgotten-album-secure-fallback-curator-jwt-secret-key-32-chars-minimum"
);

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

export async function signSessionToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifySessionToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}
