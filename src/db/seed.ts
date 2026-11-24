import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import {
  SEED_CATEGORIES,
  SEED_ERAS,
  SEED_PLACES,
  SEED_PERSONALITIES,
  SEED_EVENTS,
  SEED_COLLECTIONS,
  SEED_PHOTOS,
  SEED_STORIES,
  SEED_ADMIN_USER,
} from "./seed-data";
import bcrypt from "bcryptjs";

async function runSeed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("No DATABASE_URL environment variable found.");
    process.exit(1);
  }

  console.log("Connecting to Neon PostgreSQL...");
  const sql = neon(connectionString);
  const db = drizzle(sql, { schema });

  console.log("Seeding roles...");
  await db.insert(schema.roles).values([
    { name: "super_admin", description: "Full system and content access" },
    { name: "admin", description: "Content management and moderation" },
    { name: "editor", description: "Editorial review and draft publishing" },
    { name: "author", description: "Story drafting and contribution" },
    { name: "user", description: "Public member and bookmarking" },
  ]).onConflictDoNothing();

  console.log("Seeding admin user...");
  const passwordHash = await bcrypt.hash("AdminPass123!", 10);
  await db.insert(schema.users).values({
    id: SEED_ADMIN_USER.id,
    name: SEED_ADMIN_USER.name,
    email: SEED_ADMIN_USER.email,
    passwordHash,
    role: "super_admin",
    image: SEED_ADMIN_USER.image,
    bio: SEED_ADMIN_USER.bio,
  }).onConflictDoNothing();

  console.log("Seeding categories...");
  for (const cat of SEED_CATEGORIES) {
    await db.insert(schema.categories).values({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
    }).onConflictDoNothing();
  }

  console.log("Seeding eras...");
  for (const era of SEED_ERAS) {
    await db.insert(schema.eras).values({
      name: era.name,
      slug: era.slug,
      startYear: era.startYear,
      endYear: era.endYear,
      description: era.description,
      featuredImage: era.featuredImage,
      sortOrder: era.sortOrder,
    }).onConflictDoNothing();
  }

  console.log("Seeding places...");
  for (const place of SEED_PLACES) {
    await db.insert(schema.places).values({
      id: place.id,
      name: place.name,
      historicalName: place.historicalName || null,
      slug: place.slug,
      country: place.country,
      region: place.region || null,
      latitude: place.latitude || null,
      longitude: place.longitude || null,
      description: place.description,
      coverImage: place.coverImage,
    }).onConflictDoNothing();
  }

  console.log("Seeding seed data complete!");
}

runSeed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
