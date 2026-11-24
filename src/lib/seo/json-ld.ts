import { Photo, Story } from "@/types";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Forgotten Album",
    "url": "https://theforgottenalbum.org",
    "logo": "https://theforgottenalbum.org/favicon.ico",
    "description": "Where forgotten memories come alive. A digital museum archive dedicated to historical photography and storytelling.",
    "sameAs": [
      "https://x.com/forgottenalbum",
      "https://facebook.com/theforgottenalbum",
      "https://youtube.com/@theforgottenalbum"
    ]
  };
}

export function generatePhotoSchema(photo: Photo) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": photo.title,
    "caption": photo.caption,
    "description": photo.shortDescription,
    "contentUrl": photo.imageUrl,
    "thumbnailUrl": photo.thumbnailUrl,
    "dateCreated": photo.datePhotographed,
    "creator": {
      "@type": "Person",
      "name": photo.photographer
    },
    "creditText": photo.attribution,
    "copyrightNotice": photo.license,
    "acquireLicensePage": photo.sourceUrl
  };
}

export function generateStorySchema(story: Story) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "alternativeHeadline": story.subtitle,
    "description": story.excerpt,
    "image": [story.coverImage],
    "datePublished": story.publishDate,
    "dateModified": story.updatedAt,
    "author": {
      "@type": "Person",
      "name": story.authorName || "The Forgotten Album Curatorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Forgotten Album",
      "logo": {
        "@type": "ImageObject",
        "url": "https://theforgottenalbum.org/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://theforgottenalbum.org/stories/${story.slug}`
    }
  };
}
