# MASTER PROJECT PROMPT — THE FORGOTTEN ALBUM

Act as a senior full-stack engineer, UI/UX designer, product architect, database engineer, and creative director. Build a complete, production-ready historical photography and storytelling platform named **The Forgotten Album**.

Do not create a basic blog template. Create a distinctive digital historical archive and editorial storytelling platform with premium visuals, exceptional UX, performance, accessibility, SEO, security, and a powerful CMS-style admin dashboard.

---

## 1. PROJECT IDENTITY

**Brand:** The Forgotten Album  
**Tagline:** Where forgotten memories come alive.  
**Mission:** Preserve history, uncover forgotten stories, and bring the past closer to people through photographs, stories, and visual storytelling.

### Content focus
- Historical photographs
- World history
- Forgotten events
- Famous personalities
- Ancient civilizations
- Historical architecture and landmarks
- Lost cities and places
- Wars and major historical events
- Science and discoveries
- Vintage culture and lifestyle
- Rare photographs and archives
- Before-and-after historical comparisons
- Nostalgia and memories
- Historical timelines
- Photo stories and educational articles

The platform should feel like a premium museum archive combined with a modern history magazine.

---

## 2. TECHNOLOGY STACK

Use the following stack:

### Frontend
- Next.js using App Router
- TypeScript with strict mode
- React
- Tailwind CSS
- shadcn/ui
- Framer Motion for animations
- Lucide React icons
- React Hook Form
- Zod validation
- TanStack Query where client-side server-state management is appropriate

### Backend
- Next.js Server Components
- Server Actions where appropriate
- Route Handlers for REST APIs
- PostgreSQL database
- Neon serverless PostgreSQL
- Drizzle ORM with migrations
- Zod validation for API and server inputs

### Authentication
- Auth.js or a compatible secure authentication system
- Email/password authentication
- Google OAuth optional
- Role-based access control
- Admin and editor roles
- Secure session management
- Protected admin routes
- Password hashing
- Rate limiting for authentication and public endpoints

### Media and storage
- Cloudinary for historical images
- Image upload, optimization, transformations, and delivery
- Support for thumbnails, hero images, OG images, and gallery images
- Store image metadata, attribution, source URLs, copyright status, and usage notes

### Email
- Nodemailer
- SMTP environment configuration
- Contact form notification
- Newsletter confirmation
- Admin notifications

### Deployment
- Vercel
- Neon PostgreSQL
- Cloudinary
- GitHub
- Environment-based configuration

---

## 3. DESIGN DIRECTION

Create an elegant, distinctive, and premium historical archive design.

Avoid generic SaaS dashboard visuals on the public website. Avoid generic AI-generated blog layouts, excessive gradients, excessive rounded cards, and unnecessary animations.

### Brand colors

Use a sophisticated historical palette:

- Archive Black: #12110F
- Deep Charcoal: #1C1915
- Antique Gold: #C5A46D
- Warm Gold: #D6B77A
- Parchment: #E9DFC9
- Vintage Cream: #F4EBDD
- Sepia Brown: #796044
- Muted Gray: #A8A095

### Theme system
- Dark mode: cinematic archive atmosphere
- Light mode: paper, ink, and editorial museum aesthetics
- Persist user theme preferences
- Support system theme

### Typography
Use premium editorial typography:

- Display headings: Playfair Display or Cormorant Garamond
- Body: Inter or Geist
- Metadata: JetBrains Mono or a subtle monospace font

### Visual language
- Historical photography as the primary visual focus
- Film grain used subtly
- Aged paper textures
- Archive-inspired dividers
- Editorial grid layouts
- Elegant typography
- Image hover transitions
- Film strip elements used sparingly
- Vintage date labels
- Fine borders
- Subtle shadows
- Cinematic image overlays
- Newspaper and museum-inspired details

The interface must remain readable, modern, and accessible.

---

## 4. PUBLIC WEBSITE STRUCTURE

Create the following routes:

/
 /about
 /archive
 /archive/[slug]
 /stories
 /stories/[slug]
 /categories
 /categories/[slug]
 /eras
 /eras/[slug]
 /personalities
 /personalities/[slug]
 /places
 /places/[slug]
 /collections
 /collections/[slug]
 /timeline
 /search
 /contact
 /privacy
 /terms
 /sources
 /newsletter

Use proper dynamic routing, metadata, loading states, not-found pages, error boundaries, and responsive layouts.

---

## 5. HOMEPAGE

Build a visually extraordinary homepage.

### A. Navigation
- Brand logo
- The Forgotten Album wordmark
- Home
- Archive
- Stories
- Timeline
- Collections
- About
- Search
- Theme toggle
- Responsive mobile navigation

Navigation should be elegant, minimal, sticky when appropriate, and responsive.

### B. Cinematic hero
Create an immersive hero section featuring:

- A full-width historical photograph
- Dark cinematic overlay
- Main headline:

  **History is never truly forgotten.**

- Supporting text:

  Explore extraordinary photographs, untold stories, and moments that shaped our world.

- Primary CTA: Explore the Archive
- Secondary CTA: Discover Stories

Add subtle Framer Motion animations, but keep the experience fast and accessible.

### C. Featured photograph
Create a featured photograph section with:

- Large historical image
- Historical title
- Date
- Location
- Photographer/source
- Short story
- Explore story button

### D. Today's historical moment
A dynamic section displaying historical events related to today's date.

Include:
- Event date
- Event title
- Image
- Short summary
- Read more

Use curated database content. Do not fabricate historical facts.

### E. Explore the archive
Create visually rich categories:

- World History
- Ancient Civilizations
- Wars & Conflicts
- Historical Figures
- Lost Places
- Architecture
- Science & Discovery
- Vintage Life
- Cultural History

### F. Featured stories
Editorial card layouts featuring:
- Large cover image
- Category
- Title
- Excerpt
- Published date
- Reading time
- Author
- Featured badge where applicable

### G. Explore by era
Build an era-based navigation section:

- Ancient World
- Classical Antiquity
- Medieval Era
- Renaissance
- 17th–18th Century
- 19th Century
- Early 20th Century
- World War Era
- Postwar Era
- Modern History

Use configurable dates and database-driven content.

### H. Historical personalities
Show profiles of notable historical personalities with portraits, names, eras, and short introductions.

### I. Photo collections
Create themed collections such as:

- The World Before Modernity
- Forgotten Streets
- Faces of History
- Life 100 Years Ago
- Cities Through Time
- Moments That Changed the World

### J. Newsletter
Create an elegant newsletter subscription section.

Headline:

**History deserves to be remembered.**

Supporting text:

Receive remarkable photographs and forgotten stories from the past.

Include:
- Email input
- Subscribe button
- Validation
- Success/error feedback
- Duplicate subscription handling
- Database persistence

### K. Footer
Include:
- Brand logo
- Tagline
- About
- Explore links
- Social links
- Newsletter link
- Contact
- Privacy
- Terms
- Copyright
- Back to top

---

## 6. HISTORICAL PHOTO ARCHIVE

Create a powerful archive browsing experience.

Route: /archive

### Features
- Responsive image grid
- Masonry-style or editorial layouts
- Search
- Pagination or infinite scrolling
- Filters
- Sorting
- Image preview
- Quick detail view
- Bookmark/favorite functionality for authenticated users

### Filters
- Category
- Era
- Year
- Country
- Region
- Historical event
- Personality
- Photo type
- Collection

### Sorting
- Latest published
- Oldest photograph
- Most viewed
- Featured
- Alphabetical

### Photo detail page
Route: /archive/[slug]

Include:
- Full-width image viewer
- Image zoom
- Fullscreen support
- Photograph title
- Date taken
- Location
- Photographer
- Historical background
- Detailed caption
- Category
- Era
- Related photographs
- Related stories
- Source
- Attribution
- License/copyright information
- Share buttons
- Copy link
- Bookmark
- Previous and next photo navigation

Photograph source information must be preserved.

---

## 7. STORIES AND EDITORIAL SYSTEM

Route: /stories

Create a professional historical magazine section.

### Story features
- Rich editorial typography
- Cover image
- Title
- Subtitle
- Author
- Published date
- Updated date
- Reading time
- Table of contents
- Featured photographs
- Inline galleries
- Image captions
- Sources and references
- Related stories
- Share functionality
- Bookmark
- Previous/next story

### Story content types
- Long-form historical articles
- Photo essays
- Biography
- Historical event
- Documentary-style storytelling
- List articles
- Timeline stories

Use MDX or a validated rich-text format compatible with the editorial system.

Include SEO-friendly slugs and structured metadata.

---

## 8. SEARCH ENGINE

Create a global search experience.

Search across:
- Photos
- Stories
- Personalities
- Places
- Events
- Categories
- Collections

Features:
- Search overlay
- Keyboard shortcut Ctrl/Cmd + K
- Debounced search
- Search suggestions
- Recent searches
- Empty states
- Search result categories
- Highlighted matches
- Search filters
- Clear search

Implement efficient PostgreSQL search using indexed columns, full-text search, and trigram search where useful.

---

## 9. TIMELINE

Route: /timeline

Build an interactive historical timeline.

Features:
- Year-based navigation
- Century navigation
- Era filtering
- Event cards
- Event photographs
- Short summaries
- Detailed event links
- Horizontal or vertical responsive layout
- Search events
- Jump to year

Timeline content must be database-driven and sortable by date.

---

## 10. CATEGORIES, ERAS, PLACES, AND PERSONALITIES

Each entity should have its own dynamic page.

### Category pages
- Category title
- Description
- Featured image
- Related archive photos
- Related stories
- Pagination

### Era pages
- Era title
- Start/end years
- Historical overview
- Featured events
- Photos
- Stories

### Place pages
- Historical place name
- Modern name
- Country
- Region
- Location information
- Historical description
- Gallery
- Related events
- Related stories

### Personality pages
- Name
- Portrait
- Birth and death dates where applicable
- Nationality or relevant historical context
- Biography
- Timeline
- Related photos
- Related events
- Related stories

All pages should use reusable components and database-driven content.

---

## 11. ADMIN DASHBOARD

Build a complete, secure, professional CMS admin dashboard.

Route group: /admin

Admin routes:

/admin
/admin/photos
/admin/photos/new
/admin/photos/[id]/edit
/admin/stories
/admin/stories/new
/admin/stories/[id]/edit
/admin/categories
/admin/eras
/admin/events
/admin/personalities
/admin/places
/admin/collections
/admin/newsletter
/admin/comments
/admin/users
/admin/media
/admin/settings
/admin/analytics

### Dashboard overview
Display:
- Total photographs
- Total published stories
- Drafts
- Scheduled content
- Categories
- Newsletter subscribers
- Monthly page views
- Popular photos
- Popular stories
- Recent activity
- Content publishing trends

### Admin UI
- Collapsible sidebar
- Responsive mobile sidebar
- Top navbar
- Breadcrumbs
- Profile dropdown
- Theme switcher
- Notification center
- Search
- Dashboard cards
- Charts
- Data tables
- Pagination
- Bulk actions
- Confirmation dialogs
- Toast notifications
- Skeleton loading states

Use shadcn/ui components and Lucide icons.

The dashboard should feel like a premium content management system, not a generic template.

---

## 12. PHOTO MANAGEMENT CMS

Create a complete photo management interface.

### Create/edit photograph
Fields:
- Title
- Slug
- Short description
- Full historical caption
- Image
- Thumbnail
- Image alt text
- Date photographed
- Date precision: exact, approximate, year-only, unknown
- Location
- Country
- Photographer
- Source name
- Source URL
- Attribution
- License
- Copyright notes
- Category
- Era
- Related event
- Related personality
- Related place
- Collection
- Tags
- Featured toggle
- Visibility
- Status
- Publish date

### Photo status
- Draft
- Published
- Scheduled
- Archived

### Photo CMS functionality
- Upload to Cloudinary
- Drag-and-drop upload
- Preview
- Replace image
- Multiple image uploads
- Image crop
- Alt text validation
- SEO metadata
- Save draft
- Preview published page
- Publish
- Schedule
- Archive
- Delete with confirmation
- Bulk publish/archive/delete
- Search and filtering

---

## 13. STORY CMS

Create a rich story editor.

Features:
- Title
- Slug
- Excerpt
- Cover image
- Author
- Rich text content
- Headings
- Paragraphs
- Lists
- Quotes
- Images
- Captions
- Image galleries
- Video embeds
- Sources
- Related content
- SEO title
- SEO description
- Keywords
- Social preview
- Draft saving
- Preview
- Publishing
- Scheduled publishing
- Revision history

Support autosave and prevent content loss.

---

## 14. MEDIA LIBRARY

Create a dedicated media library.

Features:
- Cloudinary media management integration
- Grid/list view
- Image preview
- Search
- Upload
- Delete
- Metadata editing
- File size
- Dimensions
- Alt text
- Attribution
- Source URL
- Usage tracking
- Filtering
- Multi-select

Do not allow deleting media currently used by published content without an explicit confirmation and warning.

---

## 15. DATABASE DESIGN — NEON POSTGRESQL

Use Neon PostgreSQL as the production database.

Use Drizzle ORM with typed schemas and migration files.

Design normalized database tables for:

- users
- accounts
- sessions (if required by auth provider)
- verification_tokens
- roles
- photos
- stories
- categories
- tags
- photo_tags
- story_tags
- eras
- events
- personalities
- places
- collections
- collection_photos
- bookmarks
- newsletter_subscribers
- comments
- media_assets
- page_views
- audit_logs
- site_settings

### Database requirements
- UUID primary keys
- Foreign keys
- Proper indexes
- Unique constraints
- Created and updated timestamps
- Soft deletion where appropriate
- Published content visibility rules
- Efficient pagination
- Search indexes
- Transaction-safe mutations

Use a clean relationship model.

Avoid duplicating category names, author names, or tags in content records unnecessarily.

Create seed scripts for sample categories, eras, events, and demo content.

---

## 16. ROLE-BASED ACCESS CONTROL

Roles:

### Super Admin
- Full access
- Manage users
- Manage roles
- Manage all content
- Site configuration
- Analytics
- Audit logs

### Admin
- Manage content
- Manage photos
- Manage stories
- Manage categories
- Manage events
- Manage media
- Manage comments
- Manage newsletter subscribers

### Editor
- Create and edit content
- Upload photographs
- Manage stories
- Submit drafts
- Publish only if permitted

### Author
- Create stories
- Edit own drafts
- Submit for review

### User
- Browse
- Bookmark
- Subscribe
- Comment where enabled

Implement authorization on the server. Hiding admin buttons in the UI is not security.

---

## 17. ANALYTICS

Create an admin analytics section.

Track:
- Page views
- Photo views
- Story views
- Popular content
- Traffic trends
- Referrer sources
- Top countries where available
- Search keywords
- Newsletter growth
- Content engagement

Create:
- Line chart for views
- Bar chart for top content
- Summary metrics
- Date filters
- CSV export

Respect privacy and avoid collecting unnecessary personal data.

---

## 18. SOCIAL MEDIA INTEGRATION

Brand social accounts can be configured from the admin settings.

### Facebook
- Facebook Page link
- Share photograph/story
- Share URL
- Social preview metadata

### YouTube
- YouTube channel link
- Embedded videos in stories
- Video gallery support

### Instagram
- Instagram profile link
- Social links

Create reusable share controls for:
- Facebook
- X
- Pinterest
- WhatsApp
- Copy link

Do not implement fake integrations. Use official APIs only if actual publishing integrations are configured and authorized.

---

## 19. SEO

Implement complete technical and editorial SEO.

Features:
- Metadata per page
- Canonical URLs
- Open Graph
- Twitter/X cards
- Dynamic sitemap
- robots.txt
- JSON-LD structured data
- Article schema
- Image metadata
- Breadcrumb schema
- Organization schema
- Person schema where appropriate
- Descriptive slugs
- Semantic headings
- Internal linking
- SEO-friendly pagination
- Proper redirects

Every photograph and story should have its own indexable page.

---

## 20. PERFORMANCE

Aim for an excellent Core Web Vitals experience.

Requirements:
- Server Components by default
- Client Components only when needed
- Next.js image optimization
- Cloudinary transformations
- Lazy loading
- Responsive image sizes
- Avoid unnecessary JavaScript
- Avoid layout shifts
- Optimize fonts
- Efficient SQL queries
- Indexed filters
- Pagination
- Cache published content carefully
- Revalidate content after publishing
- Avoid unnecessary database calls

Aim for:
- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## 21. ACCESSIBILITY

Follow WCAG guidelines.

- Keyboard navigation
- Visible focus
- Accessible dialogs
- Semantic HTML
- Screen-reader labels
- Alt text for photographs
- Sufficient contrast
- Reduced motion support
- Accessible forms
- Responsive text
- Accessible mobile navigation

---

## 22. SECURITY

Implement:

- Server-side authentication
- RBAC
- Secure password hashing
- Zod input validation
- Rate limiting
- CSRF protection where required
- Secure cookies
- XSS protection
- SQL injection protection via ORM
- Upload validation
- File size limits
- MIME validation
- Safe image processing
- Admin audit logs
- Secure environment variables
- Protection against unauthorized content mutations
- No exposed database credentials

---

## 23. ANIMATIONS — FRAMER MOTION

Use Framer Motion for subtle, premium motion.

Include:
- Hero fade and reveal
- Text reveal
- Image fade
- Scroll-based reveals
- Staggered card entrance
- Image hover zoom
- Page transitions where appropriate
- Modal transitions
- Mobile navigation transitions
- Timeline animations

Do not overanimate.

Respect `prefers-reduced-motion`.

---

## 24. COMPONENT ARCHITECTURE

Build reusable components:

### Layout
- PublicNavbar
- PublicFooter
- MobileNavigation
- AdminLayout
- AdminSidebar
- AdminHeader
- Breadcrumbs

### Archive
- ArchiveGrid
- ArchiveCard
- PhotoViewer
- PhotoDetail
- PhotoMetadata
- PhotoFilters
- PhotoSearch

### Stories
- StoryCard
- FeaturedStory
- StoryContent
- TableOfContents
- RelatedStories
- StoryShare

### Content
- CategoryCard
- EraCard
- PersonalityCard
- PlaceCard
- EventCard
- CollectionCard

### UI
- ThemeToggle
- SearchDialog
- NewsletterForm
- ShareButtons
- Pagination
- EmptyState
- LoadingSkeleton
- ConfirmDialog
- ErrorState

### Admin
- DashboardStats
- DataTable
- PhotoForm
- StoryEditor
- MediaUploader
- MediaLibrary
- CategoryManager
- TagManager
- UserManagement
- AnalyticsCharts

Use a clean component structure with typed props.

---

## 25. PROJECT STRUCTURE

Create a maintainable folder structure similar to:

src/
  app/
    (public)/
      page.tsx
      about/
      archive/
      stories/
      categories/
      eras/
      personalities/
      places/
      collections/
      timeline/
      search/
      contact/
      newsletter/
    admin/
      layout.tsx
      page.tsx
      photos/
      stories/
      categories/
      eras/
      events/
      personalities/
      places/
      collections/
      media/
      users/
      newsletter/
      analytics/
      settings/
    api/
  components/
    layout/
    archive/
    stories/
    content/
    admin/
    forms/
    ui/
  db/
    schema/
    migrations/
    seed.ts
  lib/
    auth/
    db/
    cloudinary/
    seo/
    validations/
    utils/
    queries/
    actions/
  hooks/
  types/

Also create:
- drizzle.config.ts
- middleware.ts if needed
- env validation
- README.md
- .env.example
- deployment guide

---

## 26. ENVIRONMENT VARIABLES

Create a validated environment configuration.

Include placeholders for:

DATABASE_URL=
DATABASE_URL_UNPOOLED=

AUTH_SECRET=
AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=

NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=

Never commit secrets.

---

## 27. ADMIN CONTENT WORKFLOW

Implement this publishing workflow:

Author creates content
→ Save draft
→ Edit
→ Preview
→ Submit for review (if required)
→ Editor/Admin approval
→ Publish immediately or schedule
→ Public page updates
→ SEO metadata generated
→ Content included in sitemap
→ Analytics track visits

Provide clear status badges and activity logs.

---

## 28. SAMPLE DATA AND CONTENT

Create realistic sample content for development.

Seed:
- 12 categories
- 10 historical eras
- 20 historical events
- 12 personalities
- 15 historical places
- 20 historical photographs
- 8 long-form stories
- 5 collections

Use reliable, verifiable historical information.

Never invent:
- Dates
- Photographers
- Sources
- Locations
- Image licenses
- Historical quotations

For image placeholders, use clearly identified placeholders until verified historical images are added.

---

## 29. TESTING

Implement:

- Unit tests
- Validation tests
- Component tests
- Database integration tests
- Authentication tests
- Authorization tests
- API tests
- Playwright end-to-end tests

Test:
- Public navigation
- Search
- Filtering
- Photo detail
- Story reading
- Newsletter subscription
- Admin login
- Unauthorized access
- Photo creation
- Story publishing
- Upload validation
- Admin role restrictions

---

## 30. DELIVERABLES

Build the actual application, not just a design proposal.

Deliver:

1. Full working Next.js application
2. TypeScript source code
3. Responsive public website
4. Neon PostgreSQL schema
5. Drizzle ORM configuration
6. Migration files
7. Seed scripts
8. Authentication
9. RBAC
10. Admin dashboard
11. Photo management CMS
12. Story editor
13. Media library
14. Search
15. Historical timeline
16. Categories and eras
17. Newsletter
18. Analytics
19. SEO
20. Accessibility
21. Tests
22. README
23. `.env.example`
24. Installation instructions
25. Local development instructions
26. Database setup instructions
27. Cloudinary setup instructions
28. Deployment instructions for Vercel

---

## 31. DEVELOPMENT RULES

- Use TypeScript strictly.
- Do not use `any` unless absolutely necessary and documented.
- Do not create giant monolithic components.
- Use reusable components.
- Follow clean architecture.
- Use server-side database access.
- Do not expose secrets.
- Validate all inputs.
- Add loading, error, empty, and success states.
- Use realistic content.
- Ensure responsive layouts.
- Ensure the website builds successfully.
- Avoid broken imports.
- Avoid placeholder buttons that do nothing.
- Avoid fake analytics.
- Avoid fake authentication.
- Avoid fake integrations.
- Avoid unfinished TODO implementations for core functionality.

When a feature is too large to finish in one phase, implement the current phase completely and provide a clear list of remaining tasks.

---

## 32. BUILD PHASES

### Phase 1 — Foundation
- Project setup
- Design system
- Fonts
- Theme
- Layout
- Database connection
- Schema
- Migrations
- Seed data

### Phase 2 — Public website
- Homepage
- Archive
- Photo detail
- Stories
- Story detail
- Categories
- Eras
- Search
- Timeline
- About

### Phase 3 — Authentication
- Login
- Registration if enabled
- Sessions
- RBAC
- Protected routes

### Phase 4 — Admin CMS
- Dashboard
- Photo CRUD
- Story CRUD
- Media library
- Categories
- Tags
- Eras
- Events
- Personalities
- Places
- Collections

### Phase 5 — Growth features
- Newsletter
- Bookmarks
- Comments
- Analytics
- Social sharing
- SEO

### Phase 6 — Quality
- Responsive audit
- Accessibility audit
- Security audit
- Testing
- Performance optimization
- Production build

Start by generating the architecture and project files, then implement the application in working phases. Do not stop at a homepage mockup. Ensure the core features work end-to-end.

**The final result should be a beautiful, credible, scalable historical photography platform that feels like a premium digital museum and can grow into the official home of The Forgotten Album.**