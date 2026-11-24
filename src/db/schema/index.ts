import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  integer,
  boolean,
  jsonb,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Roles
export const roles = pgTable("roles", {
  name: varchar("name", { length: 50 }).primaryKey(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  image: text("image"),
  role: varchar("role", { length: 50 }).default("user").references(() => roles.name),
  bio: text("bio"),
  emailVerified: timestamp("email_verified"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Accounts (for Auth.js / OAuth)
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  id_token: text("id_token"),
  session_state: varchar("session_state", { length: 255 }),
});

// 4. Sessions
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

// 5. Verification Tokens
export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires").notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })]
);

// 6. Categories
export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 150 }).notNull().unique(),
    description: text("description").notNull(),
    image: text("image").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("category_slug_idx").on(table.slug)]
);

// 7. Eras
export const eras = pgTable(
  "eras",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 150 }).notNull().unique(),
    startYear: integer("start_year").notNull(),
    endYear: integer("end_year").notNull(),
    description: text("description").notNull(),
    featuredImage: text("featured_image").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("era_slug_idx").on(table.slug)]
);

// 8. Places
export const places = pgTable(
  "places",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    historicalName: varchar("historical_name", { length: 200 }),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    country: varchar("country", { length: 100 }).notNull(),
    region: varchar("region", { length: 150 }),
    latitude: text("latitude"),
    longitude: text("longitude"),
    description: text("description").notNull(),
    coverImage: text("cover_image").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("place_slug_idx").on(table.slug)]
);

// 9. Personalities
export const personalities = pgTable(
  "personalities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    birthDate: varchar("birth_date", { length: 100 }),
    deathDate: varchar("death_date", { length: 100 }),
    nationality: varchar("nationality", { length: 100 }),
    biography: text("biography").notNull(),
    portraitImage: text("portrait_image").notNull(),
    eraId: uuid("era_id").references(() => eras.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("personality_slug_idx").on(table.slug)]
);

// 10. Historical Events
export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    eventDate: varchar("event_date", { length: 100 }).notNull(),
    datePrecision: varchar("date_precision", { length: 50 }).default("exact").notNull(),
    eraId: uuid("era_id").references(() => eras.id),
    placeId: uuid("place_id").references(() => places.id),
    summary: text("summary").notNull(),
    description: text("description").notNull(),
    coverImage: text("cover_image").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("event_slug_idx").on(table.slug)]
);

// 11. Collections
export const collections = pgTable(
  "collections",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    coverImage: text("cover_image").notNull(),
    featured: boolean("featured").default(false).notNull(),
    status: varchar("status", { length: 50 }).default("published").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("collection_slug_idx").on(table.slug)]
);

// 12. Photographs
export const photos = pgTable(
  "photos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    shortDescription: text("short_description").notNull(),
    caption: text("caption").notNull(),
    imageUrl: text("image_url").notNull(),
    thumbnailUrl: text("thumbnail_url").notNull(),
    altText: text("alt_text").notNull(),
    datePhotographed: varchar("date_photographed", { length: 100 }).notNull(),
    datePrecision: varchar("date_precision", { length: 50 }).default("exact").notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    photographer: varchar("photographer", { length: 200 }).notNull(),
    sourceName: varchar("source_name", { length: 200 }).notNull(),
    sourceUrl: text("source_url").notNull(),
    attribution: text("attribution").notNull(),
    license: varchar("license", { length: 150 }).notNull(),
    copyrightNotes: text("copyright_notes"),
    categoryId: uuid("category_id").notNull().references(() => categories.id),
    eraId: uuid("era_id").notNull().references(() => eras.id),
    placeId: uuid("place_id").references(() => places.id),
    personalityId: uuid("personality_id").references(() => personalities.id),
    eventId: uuid("event_id").references(() => events.id),
    featured: boolean("featured").default(false).notNull(),
    visibility: varchar("visibility", { length: 50 }).default("public").notNull(),
    status: varchar("status", { length: 50 }).default("published").notNull(),
    viewCount: integer("view_count").default(0).notNull(),
    publishDate: timestamp("publish_date").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("photo_slug_idx").on(table.slug),
    index("photo_category_idx").on(table.categoryId),
    index("photo_era_idx").on(table.eraId),
    index("photo_status_idx").on(table.status),
  ]
);

// 13. Collection Photos Join
export const collectionPhotos = pgTable(
  "collection_photos",
  {
    collectionId: uuid("collection_id").notNull().references(() => collections.id, { onDelete: "cascade" }),
    photoId: uuid("photo_id").notNull().references(() => photos.id, { onDelete: "cascade" }),
    sortOrder: integer("sort_order").default(0).notNull(),
  },
  (table) => [primaryKey({ columns: [table.collectionId, table.photoId] })]
);

// 14. Tags
export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 15. Photo Tags Join
export const photoTags = pgTable(
  "photo_tags",
  {
    photoId: uuid("photo_id").notNull().references(() => photos.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.photoId, table.tagId] })]
);

// 16. Stories (Magazine / Long-Form Articles)
export const stories = pgTable(
  "stories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    subtitle: varchar("subtitle", { length: 300 }).notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull(),
    sections: jsonb("sections"),
    coverImage: text("cover_image").notNull(),
    readingTimeMinutes: integer("reading_time_minutes").default(5).notNull(),
    authorId: uuid("author_id").notNull().references(() => users.id),
    categoryId: uuid("category_id").notNull().references(() => categories.id),
    eraId: uuid("era_id").notNull().references(() => eras.id),
    personalityId: uuid("personality_id").references(() => personalities.id),
    placeId: uuid("place_id").references(() => places.id),
    eventId: uuid("event_id").references(() => events.id),
    sources: jsonb("sources"),
    featured: boolean("featured").default(false).notNull(),
    status: varchar("status", { length: 50 }).default("published").notNull(),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    viewCount: integer("view_count").default(0).notNull(),
    publishDate: timestamp("publish_date").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("story_slug_idx").on(table.slug),
    index("story_category_idx").on(table.categoryId),
    index("story_status_idx").on(table.status),
  ]
);

// 17. Story Tags Join
export const storyTags = pgTable(
  "story_tags",
  {
    storyId: uuid("story_id").notNull().references(() => stories.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.storyId, table.tagId] })]
);

// 18. Bookmarks
export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  photoId: uuid("photo_id").references(() => photos.id, { onDelete: "cascade" }),
  storyId: uuid("story_id").references(() => stories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 19. Newsletter Subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  confirmedAt: timestamp("confirmed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 20. Comments
export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  photoId: uuid("photo_id").references(() => photos.id, { onDelete: "cascade" }),
  storyId: uuid("story_id").references(() => stories.id, { onDelete: "cascade" }),
  authorName: varchar("author_name", { length: 150 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }),
  content: text("content").notNull(),
  status: varchar("status", { length: 50 }).default("approved").notNull(),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 21. Media Assets
export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  url: text("url").notNull(),
  publicId: varchar("public_id", { length: 255 }),
  format: varchar("format", { length: 50 }).notNull(),
  size: integer("size").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  altText: text("alt_text"),
  attribution: text("attribution"),
  sourceUrl: text("source_url"),
  uploadedBy: uuid("uploaded_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 22. Page Views (Analytics)
export const pageViews = pgTable(
  "page_views",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    path: varchar("path", { length: 255 }).notNull(),
    entityType: varchar("entity_type", { length: 50 }),
    entityId: varchar("entity_id", { length: 100 }),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    ipHash: varchar("ip_hash", { length: 64 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("page_view_path_idx").on(table.path)]
);

// 23. Audit Logs
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: varchar("entity_id", { length: 100 }).notNull(),
  metadata: text("metadata"),
  ipAddress: varchar("ip_address", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 24. Site Settings
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const photosRelations = relations(photos, ({ one, many }) => ({
  category: one(categories, { fields: [photos.categoryId], references: [categories.id] }),
  era: one(eras, { fields: [photos.eraId], references: [eras.id] }),
  place: one(places, { fields: [photos.placeId], references: [places.id] }),
  personality: one(personalities, { fields: [photos.personalityId], references: [personalities.id] }),
  event: one(events, { fields: [photos.eventId], references: [events.id] }),
  collectionPhotos: many(collectionPhotos),
  photoTags: many(photoTags),
  comments: many(comments),
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
  author: one(users, { fields: [stories.authorId], references: [users.id] }),
  category: one(categories, { fields: [stories.categoryId], references: [categories.id] }),
  era: one(eras, { fields: [stories.eraId], references: [eras.id] }),
  personality: one(personalities, { fields: [stories.personalityId], references: [personalities.id] }),
  place: one(places, { fields: [stories.placeId], references: [places.id] }),
  event: one(events, { fields: [stories.eventId], references: [events.id] }),
  storyTags: many(storyTags),
  comments: many(comments),
}));
