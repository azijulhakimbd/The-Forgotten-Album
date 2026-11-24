export type Role = "super_admin" | "admin" | "editor" | "author" | "user";

export type ContentStatus = "draft" | "published" | "scheduled" | "archived";

export type DatePrecision = "exact" | "approximate" | "year_only" | "unknown";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  photoCount?: number;
  storyCount?: number;
}

export interface Era {
  id: string;
  name: string;
  slug: string;
  startYear: number;
  endYear: number;
  description: string;
  featuredImage: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Place {
  id: string;
  name: string;
  historicalName?: string | null;
  slug: string;
  country: string;
  region?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  description: string;
  coverImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Personality {
  id: string;
  name: string;
  slug: string;
  birthDate?: string | null;
  deathDate?: string | null;
  nationality?: string | null;
  biography: string;
  portraitImage: string;
  eraId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  datePrecision: DatePrecision;
  eraId?: string | null;
  placeId?: string | null;
  summary: string;
  description: string;
  coverImage: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  featured: boolean;
  status: ContentStatus;
  photoCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Photo {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  caption: string;
  imageUrl: string;
  thumbnailUrl: string;
  altText: string;
  datePhotographed: string;
  datePrecision: DatePrecision;
  location: string;
  country: string;
  photographer: string;
  sourceName: string;
  sourceUrl: string;
  attribution: string;
  license: string;
  copyrightNotes?: string | null;
  categoryId: string;
  eraId: string;
  placeId?: string | null;
  personalityId?: string | null;
  eventId?: string | null;
  collectionIds?: string[];
  tags?: string[];
  featured: boolean;
  visibility: "public" | "unlisted" | "private";
  status: ContentStatus;
  viewCount: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface StorySection {
  heading?: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  sections?: StorySection[];
  coverImage: string;
  readingTimeMinutes: number;
  authorId: string;
  authorName?: string;
  categoryId: string;
  eraId: string;
  personalityId?: string | null;
  placeId?: string | null;
  eventId?: string | null;
  tags?: string[];
  sources?: { title: string; url?: string }[];
  status: ContentStatus;
  featured: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  viewCount: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  photoId?: string | null;
  storyId?: string | null;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId?: string | null;
  photoId?: string | null;
  storyId?: string | null;
  authorName: string;
  authorEmail?: string | null;
  content: string;
  status: "pending" | "approved" | "rejected";
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: "active" | "unsubscribed" | "pending";
  confirmedAt?: string | null;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  publicId?: string | null;
  format: string;
  size: number;
  width: number;
  height: number;
  altText?: string | null;
  attribution?: string | null;
  sourceUrl?: string | null;
  uploadedBy?: string | null;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName?: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  heroHeadline: string;
  heroSubtitle: string;
  featuredPhotoId?: string;
  contactEmail: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  allowComments: boolean;
  allowRegistration: boolean;
}
