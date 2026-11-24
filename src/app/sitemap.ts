import { MetadataRoute } from "next";
import {
  getPhotos,
  getStories,
  getCategories,
  getEras,
  getPlaces,
  getPersonalities,
  getCollections,
} from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theforgottenalbum.org";

  const [
    photoData,
    storyData,
    categories,
    eras,
    places,
    personalities,
    collections,
  ] = await Promise.all([
    getPhotos({ limit: 100 }),
    getStories({ limit: 100 }),
    getCategories(),
    getEras(),
    getPlaces(),
    getPersonalities(),
    getCollections(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/archive`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/stories`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/timeline`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/eras`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/places`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personalities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/sources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const photoRoutes: MetadataRoute.Sitemap = photoData.photos.map((p) => ({
    url: `${baseUrl}/archive/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const storyRoutes: MetadataRoute.Sitemap = storyData.stories.map((s) => ({
    url: `${baseUrl}/stories/${s.slug}`,
    lastModified: new Date(s.updatedAt || s.createdAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const eraRoutes: MetadataRoute.Sitemap = eras.map((e) => ({
    url: `${baseUrl}/eras/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const placeRoutes: MetadataRoute.Sitemap = places.map((pl) => ({
    url: `${baseUrl}/places/${pl.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const personalityRoutes: MetadataRoute.Sitemap = personalities.map((pers) => ({
    url: `${baseUrl}/personalities/${pers.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((col) => ({
    url: `${baseUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...photoRoutes,
    ...storyRoutes,
    ...categoryRoutes,
    ...eraRoutes,
    ...placeRoutes,
    ...personalityRoutes,
    ...collectionRoutes,
  ];
}
