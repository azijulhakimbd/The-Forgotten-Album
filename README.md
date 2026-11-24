# The Forgotten Album — Historical Photography & Storytelling Platform

> **Where forgotten memories come alive.**  
> A distinctive, production-ready digital museum archive and editorial storytelling platform preserving verified historical photographs, ancient civilizations, world history, and pivotal human moments.

---

## 🏛️ Project Identity & Overview

**The Forgotten Album** is built to feel like a premium digital museum archive combined with a modern literary history magazine. Designed with sepia undertones, aged parchment accents, subtle film grain textures, and classical editorial typography.

### Content Focus
- **Historical Photographs**: Preserved from the Library of Congress (LOC), National Archives (NARA), BnF Gallica, and Royal Geographical Society.
- **World History & Conflicts**: Documentary records of frontlines, treaties, and human resilience.
- **Ancient Civilizations & Lost Places**: Archaeological excavations, Petra, Machu Picchu, Angkor Wat, Pompeii, and Alexandria.
- **Historical Figures**: Biographies and portraits of Marie Curie, Nikola Tesla, Abraham Lincoln, Harriet Tubman, Ada Lovelace, and Mahatma Gandhi.
- **Interactive Timeline**: Chronological navigation across human milestones from Kitty Hawk to Apollo 11.
- **Curated Collections**: Themed visual archives (*The World Before Modernity*, *Forgotten Streets*, *Faces of History*, *Life 100 Years Ago*).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript Strict Mode
- **Styling**: Tailwind CSS v4, Custom Museum Design System with Dual Theme Mode (Cinematic Dark Archive & Paper Light Ink)
- **Database & ORM**: Neon Serverless PostgreSQL with Drizzle ORM (24 normalized tables)
- **Authentication & RBAC**: JWT Sessions with `jose`, `bcryptjs`, and Role-Based Access Control (`super_admin`, `admin`, `editor`, `author`, `user`)
- **Icons & Motion**: Lucide React & Framer Motion
- **Validation**: Zod
- **SEO & Provenance**: Dynamic `sitemap.ts`, `robots.ts`, Schema.org JSON-LD (`Article`, `ImageObject`, `Organization`), and provenance tracking

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                     # Cinematic museum homepage
│   │   ├── about/page.tsx               # Curatorial manifesto & mission
│   │   ├── archive/                     # Photo archive & filter controls
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx          # Full-width photo viewer with zoom & provenance
│   │   ├── stories/                     # Historical magazine & photo essays
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx          # Editorial long-form article & table of contents
│   │   ├── categories/                  # 12 Curated categories
│   │   ├── eras/                        # 10 Historical epochs
│   │   ├── personalities/               # Historical biographical figures
│   │   ├── places/                      # Ancient ruins & lost landmarks
│   │   ├── collections/                 # Themed photographic portfolios
│   │   ├── timeline/page.tsx            # Interactive chronological timeline
│   │   ├── search/page.tsx              # Global search engine
│   │   ├── newsletter/page.tsx          # Sunday dispatch subscription
│   │   ├── contact/page.tsx             # Curatorial inquiry desk
│   │   ├── sources/page.tsx             # Archival provenance & public domain policy
│   │   ├── privacy/ & terms/            # Reader privacy & terms of access
│   │   ├── login/ & register/           # Curator authentication portal
│   │   └── sitemap.ts & robots.ts       # Dynamic SEO indexing
│   ├── admin/                           # Protected Curator CMS
│   │   ├── page.tsx                     # Dashboard metrics & publishing pipeline
│   │   ├── photos/                      # Photo CRUD & status management
│   │   ├── stories/                     # Editorial essay CMS
│   │   ├── media/page.tsx               # Media Library with usage tracking
│   │   ├── categories/, eras/, events/  # Taxonomy managers
│   │   ├── personalities/, places/      # Entities management
│   │   ├── collections/page.tsx         # Themed collections manager
│   │   ├── newsletter/page.tsx          # Subscriber lists & CSV export
│   │   ├── comments/page.tsx            # Reader comment moderation
│   │   ├── users/page.tsx               # User roles & RBAC clearance
│   │   ├── settings/page.tsx            # Brand & social media configuration
│   │   └── analytics/page.tsx           # Pageview trends & top artifacts
│   └── api/
│       ├── auth/ (login, register, logout)
│       └── newsletter/
├── components/
│   ├── layout/                          # PublicNavbar, PublicFooter, SearchDialog
│   ├── ui/                              # ThemeProvider, ThemeToggle
│   ├── archive/                         # PhotoCard, PhotoViewer, PhotoFilters, ShareButtons
│   ├── stories/                         # StoryCard
│   ├── content/                         # CategoryCard, EraCard, PersonalityCard, CollectionCard
│   ├── forms/                           # NewsletterForm
│   └── admin/                           # AdminSidebar, AdminHeader
├── db/
│   ├── schema/index.ts                  # Drizzle ORM PostgreSQL schema (24 tables)
│   ├── seed-data.ts                     # Verified historical seed dataset
│   └── seed.ts                          # Executable Drizzle seed script
├── lib/
│   ├── auth/                            # JWT session tokens & RBAC helpers
│   ├── seo/                             # Schema.org JSON-LD generators
│   ├── utils.ts                         # Utility functions & formatting
│   └── data.ts                          # Unified server data access layer
└── middleware.ts                        # Route protection middleware for /admin
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key variables:
- `DATABASE_URL`: Connection string to your Neon serverless PostgreSQL database.
- `AUTH_SECRET`: A secret string used for signing session JWT tokens.
- `NEXT_PUBLIC_SITE_URL`: Your production or local site URL (e.g. `http://localhost:3000`).

*(Note: The platform features a built-in historical data provider that serves full verified sample data even before Neon PostgreSQL credentials are set, allowing immediate review of every public and admin view).*

### 3. Database Migration & Seeding (Neon PostgreSQL)
Generate and push migrations, then run the seed script:
```bash
npx drizzle-kit push
npx tsx src/db/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Curator Demo Access Credentials

To test the Admin CMS immediately:
- **URL**: [http://localhost:3000/login](http://localhost:3000/login)
- **Email**: `curator@theforgottenalbum.org`
- **Password**: `AdminPass123!`
- *(A one-click "Autofill Form" button is provided on the login page for convenience).*

---

## 🛡️ Role-Based Access Control (RBAC)

The application enforces server-side role-based authorization across 5 roles:
- **`super_admin`**: Full system access, users, settings, analytics, audit logs.
- **`admin`**: Content creation, media management, newsletter, moderation.
- **`editor`**: Draft reviewing, editing, publishing.
- **`author`**: Drafting stories and personal contributions.
- **`user`**: Public reader, bookmarking, commenting.

---

## 🚢 Deployment (Vercel + Neon)

1. **Database**: Create a PostgreSQL database on [Neon.tech](https://neon.tech) and copy the connection string.
2. **Git Repository**: Push code to GitHub.
3. **Vercel**: Import the GitHub repository in [Vercel](https://vercel.com).
4. **Environment Variables**: Add `DATABASE_URL` and `AUTH_SECRET` in the Vercel dashboard.
5. **Deploy**: Build runs `next build` with zero type errors and static/dynamic optimization.

---

## 📜 Public Domain & Licensing Policy

All historical photographs cataloged on The Forgotten Album are sourced from verified public domain collections (US Library of Congress, US National Archives, BnF, NASA). Metadata, attribution, photographer records, and source URLs are strictly maintained on every detail page.
