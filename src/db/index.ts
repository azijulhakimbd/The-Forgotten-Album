import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

export const isDbConfigured = Boolean(connectionString && !connectionString.includes("user:password"));

// Lazy-loaded or safely initialized Neon client
const sql = isDbConfigured && connectionString ? neon(connectionString) : null;

export const db = sql ? drizzle(sql, { schema }) : null;

export * from "./schema";
