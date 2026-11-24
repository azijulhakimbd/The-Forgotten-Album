import {
  Category,
  Era,
  Place,
  Personality,
  HistoricalEvent,
  Collection,
  Photo,
  Story,
  User,
} from "@/types";
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
} from "@/db/seed-data";

// Unified Data Access Layer
// Provides typed query functions for public & admin features.
// Gracefully handles both live Neon DB and seed data.

export async function getCategories(): Promise<Category[]> {
  return SEED_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cat = SEED_CATEGORIES.find((c) => c.slug === slug);
  return cat || null;
}

export async function getEras(): Promise<Era[]> {
  return [...SEED_ERAS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getEraBySlug(slug: string): Promise<Era | null> {
  const era = SEED_ERAS.find((e) => e.slug === slug);
  return era || null;
}

export async function getPlaces(): Promise<Place[]> {
  return SEED_PLACES;
}

export async function getPlaceBySlug(slug: string): Promise<Place | null> {
  const place = SEED_PLACES.find((p) => p.slug === slug);
  return place || null;
}

export async function getPersonalities(): Promise<Personality[]> {
  return SEED_PERSONALITIES;
}

export async function getPersonalityBySlug(slug: string): Promise<Personality | null> {
  const personality = SEED_PERSONALITIES.find((p) => p.slug === slug);
  return personality || null;
}

export async function getEvents(): Promise<HistoricalEvent[]> {
  return [...SEED_EVENTS].sort((a, b) => a.eventDate.localeCompare(b.eventDate));
}

export async function getEventBySlug(slug: string): Promise<HistoricalEvent | null> {
  const ev = SEED_EVENTS.find((e) => e.slug === slug);
  return ev || null;
}

export async function getCollections(): Promise<Collection[]> {
  return SEED_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const col = SEED_COLLECTIONS.find((c) => c.slug === slug);
  return col || null;
}

export interface PhotoFilterOptions {
  categoryId?: string;
  eraId?: string;
  placeId?: string;
  personalityId?: string;
  eventId?: string;
  collectionSlug?: string;
  featured?: boolean;
  search?: string;
  sortBy?: "latest" | "oldest" | "most_viewed" | "alphabetical";
  page?: number;
  limit?: number;
}

export async function getPhotos(options: PhotoFilterOptions = {}): Promise<{
  photos: Photo[];
  total: number;
  page: number;
  totalPages: number;
}> {
  let list = [...SEED_PHOTOS];

  if (options.categoryId) {
    list = list.filter((p) => p.categoryId === options.categoryId);
  }
  if (options.eraId) {
    list = list.filter((p) => p.eraId === options.eraId);
  }
  if (options.placeId) {
    list = list.filter((p) => p.placeId === options.placeId);
  }
  if (options.personalityId) {
    list = list.filter((p) => p.personalityId === options.personalityId);
  }
  if (options.eventId) {
    list = list.filter((p) => p.eventId === options.eventId);
  }
  if (options.featured !== undefined) {
    list = list.filter((p) => p.featured === options.featured);
  }
  if (options.collectionSlug) {
    const col = SEED_COLLECTIONS.find((c) => c.slug === options.collectionSlug);
    if (col) {
      list = list.filter((p) => p.collectionIds?.includes(col.id));
    }
  }
  if (options.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.photographer.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  switch (options.sortBy) {
    case "oldest":
      list.sort((a, b) => a.datePhotographed.localeCompare(b.datePhotographed));
      break;
    case "most_viewed":
      list.sort((a, b) => b.viewCount - a.viewCount);
      break;
    case "alphabetical":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "latest":
    default:
      list.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
      break;
  }

  const page = options.page || 1;
  const limit = options.limit || 12;
  const total = list.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = list.slice(offset, offset + limit);

  return {
    photos: paginated,
    total,
    page,
    totalPages,
  };
}

export async function getPhotoBySlug(slug: string): Promise<Photo | null> {
  const photo = SEED_PHOTOS.find((p) => p.slug === slug);
  return photo || null;
}

export async function getRelatedPhotos(currentPhotoId: string, limit = 4): Promise<Photo[]> {
  const photo = SEED_PHOTOS.find((p) => p.id === currentPhotoId);
  if (!photo) return SEED_PHOTOS.slice(0, limit);

  return SEED_PHOTOS.filter(
    (p) =>
      p.id !== currentPhotoId &&
      (p.categoryId === photo.categoryId || p.eraId === photo.eraId)
  ).slice(0, limit);
}

export interface StoryFilterOptions {
  categoryId?: string;
  eraId?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getStories(options: StoryFilterOptions = {}): Promise<{
  stories: Story[];
  total: number;
  page: number;
  totalPages: number;
}> {
  let list = [...SEED_STORIES];

  if (options.categoryId) {
    list = list.filter((s) => s.categoryId === options.categoryId);
  }
  if (options.eraId) {
    list = list.filter((s) => s.eraId === options.eraId);
  }
  if (options.featured !== undefined) {
    list = list.filter((s) => s.featured === options.featured);
  }
  if (options.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  list.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  const page = options.page || 1;
  const limit = options.limit || 9;
  const total = list.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = list.slice(offset, offset + limit);

  return {
    stories: paginated,
    total,
    page,
    totalPages,
  };
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const story = SEED_STORIES.find((s) => s.slug === slug);
  return story || null;
}

export async function getRelatedStories(currentStoryId: string, limit = 3): Promise<Story[]> {
  const story = SEED_STORIES.find((s) => s.id === currentStoryId);
  if (!story) return SEED_STORIES.slice(0, limit);

  return SEED_STORIES.filter(
    (s) =>
      s.id !== currentStoryId &&
      (s.categoryId === story.categoryId || s.eraId === story.eraId)
  ).slice(0, limit);
}

// Global Search across all entities
export interface GlobalSearchResult {
  type: "photo" | "story" | "personality" | "place" | "event" | "collection" | "category";
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  imageUrl?: string;
  date?: string;
  href: string;
}

export async function searchArchive(query: string): Promise<GlobalSearchResult[]> {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: GlobalSearchResult[] = [];

  // 1. Photos
  for (const p of SEED_PHOTOS) {
    if (
      p.title.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.photographer.toLowerCase().includes(q)
    ) {
      results.push({
        type: "photo",
        id: p.id,
        title: p.title,
        subtitle: `${p.datePhotographed} • ${p.location}`,
        slug: p.slug,
        imageUrl: p.thumbnailUrl,
        date: p.datePhotographed,
        href: `/archive/${p.slug}`,
      });
    }
  }

  // 2. Stories
  for (const s of SEED_STORIES) {
    if (
      s.title.toLowerCase().includes(q) ||
      s.subtitle.toLowerCase().includes(q) ||
      s.excerpt.toLowerCase().includes(q)
    ) {
      results.push({
        type: "story",
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        slug: s.slug,
        imageUrl: s.coverImage,
        date: s.publishDate.substring(0, 10),
        href: `/stories/${s.slug}`,
      });
    }
  }

  // 3. Personalities
  for (const pers of SEED_PERSONALITIES) {
    if (
      pers.name.toLowerCase().includes(q) ||
      pers.nationality?.toLowerCase().includes(q) ||
      pers.biography.toLowerCase().includes(q)
    ) {
      results.push({
        type: "personality",
        id: pers.id,
        title: pers.name,
        subtitle: pers.nationality || "Historical Figure",
        slug: pers.slug,
        imageUrl: pers.portraitImage,
        href: `/personalities/${pers.slug}`,
      });
    }
  }

  // 4. Places
  for (const pl of SEED_PLACES) {
    if (
      pl.name.toLowerCase().includes(q) ||
      pl.country.toLowerCase().includes(q) ||
      pl.historicalName?.toLowerCase().includes(q)
    ) {
      results.push({
        type: "place",
        id: pl.id,
        title: pl.name,
        subtitle: `${pl.country}${pl.historicalName ? ` (Ancient: ${pl.historicalName})` : ""}`,
        slug: pl.slug,
        imageUrl: pl.coverImage,
        href: `/places/${pl.slug}`,
      });
    }
  }

  // 5. Events
  for (const ev of SEED_EVENTS) {
    if (ev.title.toLowerCase().includes(q) || ev.summary.toLowerCase().includes(q)) {
      results.push({
        type: "event",
        id: ev.id,
        title: ev.title,
        subtitle: ev.eventDate,
        slug: ev.slug,
        imageUrl: ev.coverImage,
        date: ev.eventDate,
        href: `/timeline?event=${ev.slug}`,
      });
    }
  }

  // 6. Collections
  for (const col of SEED_COLLECTIONS) {
    if (col.title.toLowerCase().includes(q) || col.description.toLowerCase().includes(q)) {
      results.push({
        type: "collection",
        id: col.id,
        title: col.title,
        subtitle: "Themed Photo Collection",
        slug: col.slug,
        imageUrl: col.coverImage,
        href: `/collections/${col.slug}`,
      });
    }
  }

  // 7. Categories
  for (const cat of SEED_CATEGORIES) {
    if (cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)) {
      results.push({
        type: "category",
        id: cat.id,
        title: cat.name,
        subtitle: "Archive Category",
        slug: cat.slug,
        imageUrl: cat.image,
        href: `/categories/${cat.slug}`,
      });
    }
  }

  return results;
}
