# annalise — Personal Marketing Website

## Project Info
- **Developer**: Mona
- **Goal Launch Date**: March 31st
- **Client**: Annalise Hart
- **Reference site**: https://altura-marketing-website.vercel.app/

## Project Overview
Build a personal marketing portfolio website for **Annalise**, a marketing major. The site is a React application with client-side routing. All content is editable by Annalise through a secret admin panel — no backend required at launch. Data persists via browser `localStorage`.

---

## Tech Stack
- **React** (with hooks) + **React Router** for client-side routing
- **Tailwind CSS** for styling
- **localStorage** for persistent content storage (migratable to a backend later)
- **Vite** for local development (`npm run dev` → `http://localhost:5173`)
- **Vercel** for hosting (free tier)
- Single repo, no separate backend

---

## Build Order — Start With Homepage First
Build and perfect the homepage before moving to other pages. The homepage is the priority for launch. Other pages (Blog, Portfolio detail, Services detail, About) come after.

---

## Pages & Routing

| Route | Page | Public? |
|---|---|---|
| `/` | Home | ✅ |
| `/portfolio` | Portfolio | ✅ |
| `/portfolio/:slug` | Individual case study | ✅ |
| `/blog` | Blog index | ✅ |
| `/blog/:slug` | Individual blog post | ✅ |
| `/services` | Services | ✅ |
| `/about` | About Me | ✅ |
| `/admin` | Secret login page | 🔒 Hidden — not linked anywhere |
| `/admin/dashboard` | Admin dashboard | 🔒 Password protected |

The `/admin` route must **never** appear in the navbar or anywhere on the public site. Annalise accesses it by typing the URL directly.

---

## Navbar (Header)
Appears on all public pages. Logo/wordmark "Annalise" in the top left corner.

Nav links (right side):
- Services
- Portfolio
- About Me
- Blog
- **Let's Chat** (styled as a CTA button, links to contact form)

### Navbar Background Behavior
The navbar background is a **solid block** (no gradient, no blur mask) at `rgba(13,13,13,X)` where `X` fades from `0` → `~0.55` based on scroll position. The block fades in over the back half of the current page's hero section, so the navbar starts fully transparent on top of the hero and is fully visible by the time the user scrolls into the content below.

**Implementation:** A `NavbarContext` lets each page register its hero element ref on mount. The `Navbar` reads the hero's `getBoundingClientRect()` and computes opacity from scroll progress through the back half of that element. Pages that do not register a hero get a solid navbar by default (safe for readability).

### Page Heroes — Required on Every Public Page
Because the navbar fade depends on a dark hero band sitting underneath it, **every public page must open with a dark hero/header section** and register it via `NavbarContext`. Without this, the transparent navbar would float over light content and become unreadable.

**Hero heights vary per page** — the `NavbarContext` reads each hero's actual `getBoundingClientRect()`, so the fade adapts automatically. Vary heights intentionally to create pacing across the site:

- **Home** — full-bleed (100vh). It's the front door and deserves the biggest moment.
- **Portfolio detail / Blog post** — taller (70–80vh). The cover image is part of the storytelling.
- **About** — medium (~60vh). Personal but not loud.
- **Services / Portfolio index / Blog index** — shorter (45–55vh). Users came to scan; get them to content faster.
- **Minimum: ~40vh.** Below that the fade window is too short and the navbar snaps from transparent to solid abruptly.

**Typographic system stays constant even when heights vary** — same display serif for the title, same subhead treatment, same vertical rhythm. Consistent type makes varied heights read as intentional pacing rather than inconsistency.

- **Detail pages** (`/portfolio/:slug`, `/blog/:slug`) — hero uses the project/post cover image with the title (and date for blog posts) on top.
- Every page hero must be registered with `NavbarContext` on mount so the navbar fade lines up with the actual hero, not a viewport-height guess.

### Route-Change Scroll Reset
On every route change, scroll position must reset to top — otherwise a fresh page navigation would land mid-faded with the navbar in an inconsistent state.

---

## Homepage Sections (Build in This Order)

### 1. Hero
- **Image**: `hero-walking.jpg` (from `/public/assets/images/`)
- **Headline**: "Where Strategy Meets Creative That Converts"
- **Subheading**: "Altura Marketing is a growth-focused marketing studio specializing in paid advertising and organic social strategy. We help brands turn attention into measurable results through intentional creative and data-driven execution."
- **CTA Button**: "Let's Chat" → links to contact form section or `/contact`

### 2. Unique Selling Proposition (USP)
- **Image**: `computer.jpg` (from `/public/assets/images/`)
- **Headline**: "It's about understanding people... not just platforms."
- **Body Text**: "I focus on uncovering what your audience actually cares about, then shaping creative and messaging that feels natural, emotional, and aligned with how they think and buy. When strategy leads, performance follows."
- **CTA Button**: "See My Portfolio" → links to `/portfolio`

### 3. Video Ad Showcase
- **Headline**: "See the Creative Strategy Come to Life"
- **Subheading**: "These static ads are real examples of how insight, intention, and execution come together. Each piece is designed to speak to a specific audience, highlight what matters most, and make the message feel natural, not forced."
- **Images**: Pull from `/public/assets/portfolio/videos` — display as a grid or horizontal scroll of video ad images

### 4. Testimonials
- Sliding carousel of testimonial cards
- Each card: quote, name, title/company, optional avatar image
- Use placeholder testimonials for now — Annalise will supply real ones via admin panel
- Carousel should auto-scroll and be manually swipeable/clickable

### 5. Services Preview
- **Intro text**: "Altura Marketing offers strategic marketing support for brands that want clarity, stronger creative, and measurable growth."
- Five services, each with a number, title, description, and "Learn More" CTA linking to `/services`:

  **01 — Creative Strategist Consultant**
  For teams that already have execution covered but need sharper thinking behind the creative. I partner with in-house designers and media buyers to uncover insights, refine messaging, and generate ideas that actually resonate and perform.

  **02 — Paid Media Consultant**
  Campaign strategy and management across Meta, Pinterest, and TikTok. I approach paid media through a creative-first lens, helping brands make smarter decisions, improve performance, and scale with intention.

  **03 — Organic Social Consultant**
  Organic social strategy focused on clarity, consistency, and connection. From content direction to messaging frameworks, I help brands show up in a way that feels natural, aligned, and worth engaging with.

  **04 — Graphic Design**
  Strategic, conversion-focused design that supports your marketing goals. Every deliverable is created with clarity, consistency, and performance in mind. Design isn't just about looking good, it's about communicating quickly and effectively.

  **05 — Brand Design**
  Intentional brand identities built to position you clearly and confidently in your market. From visual identity systems and typography to color palettes and foundational brand elements, we create brands that feel cohesive, elevated, and built for long-term growth. This is more than a logo, it's a strategic foundation for everything that follows.

### 7. Footer
- Logo/wordmark left
- Nav links
- Social media icons
- Copyright: "© 2025 Annalise. All rights reserved."

---

## Contact Form → SMS Notification
When Annalise's contact form is submitted, she receives a **text message** with the submission details.

**Implementation**: Vercel Serverless Function + Twilio API
- Create `/api/contact.js` as a Vercel serverless function
- On form submit, POST to `/api/contact`
- The function calls Twilio's API to text Annalise's phone number
- Store all Twilio credentials as **Vercel environment variables** — never hardcode them:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_FROM_NUMBER`
  - `TWILIO_TO_NUMBER`
- Cost: ~$0.0075 per text

---

## Blog
- Blog exists primarily for SEO purposes
- Public can read posts — no login required
- No likes, no comments
- Posts have: optional cover image, title, date, body text
- Annalise has blog topics planned through July — she writes and publishes via the admin panel

---

## Admin Panel

### Login (`/admin`)
- Simple centered login form — password only, no username
- **Password**: `annalise!123`
- On success: redirect to `/admin/dashboard`
- On failure: show inline error message
- Clean minimal design — does not need to match the public site aesthetic
- **Critical**: The admin UI must be as simple and non-technical as possible. Annalise is not a developer and previously struggled with Webflow's complexity. Think clean forms, clear labels, big obvious buttons. No jargon. She should log in and immediately know what to do.

### Dashboard (`/admin/dashboard`)
Sidebar navigation with these sections:

- **Home Content** — edit hero headline, hero subheading, hero image, USP headline, USP body, USP image
- **About Me** — edit photo, bio text
- **Services** — edit each of the 5 services (title + description); fixed set, no add/delete needed
- **Portfolio** — add / edit / delete projects. Each project has:
  - Title
  - Slug (auto-generated from title, editable)
  - Short description (shown on card)
  - Main image (file upload)
  - Tagline / hook (bold pull quote on case study page)
  - Strategy bullets ("The WHY Behind the Strategy" — editable bullet list)
- **Blog** — add / edit / delete posts. Each post has:
  - Title
  - Slug (auto-generated)
  - Date
  - Cover image (optional file upload)
  - Body text (simple rich text editor — bold, italic, paragraphs, headings minimum)
- **Testimonials** — add / edit / delete. Each has:
  - Name
  - Title / Company
  - Quote
  - Avatar image (optional file upload)
- **Logout** button always visible in sidebar

---

## Asset Structure

Organise all assets as follows:

```
/public
  /assets
    /images        ← hero, USP, about, general images
    /portfolio     ← static ad images for showcase and portfolio cards
    /videos        ← video ad files
    /fonts         ← all custom font files (.ttf)
```

### Fonts
annalise has provided custom font files in **TTF format** from her brand guidelines. Declare them using `@font-face` in the global CSS:

```css
@font-face {
  font-family: 'FontNameHere';
  src: url('/assets/fonts/FontNameHere.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
```

Add a separate `@font-face` block for each weight (Regular, Bold, Light, Italic, etc.).
**Update font family names once the actual filenames from the Google Drive download are confirmed.**

---

## Data Model (localStorage)

Abstract all storage behind `src/utils/storage.js`:

```js
export const getData = () => JSON.parse(localStorage.getItem('annalise_site_data')) || defaultData;
export const setData = (data) => localStorage.setItem('annalise_site_data', JSON.stringify(data));
```

This makes swapping localStorage for a backend (Supabase, Firebase, etc.) later a clean, isolated change.

Full data shape:

```json
{
  "home": {
    "heroHeadline": "Where Strategy Meets Creative That Converts",
    "heroSubheadline": "Altura Marketing is a growth-focused marketing studio specializing in paid advertising and organic social strategy. We help brands turn attention into measurable results through intentional creative and data-driven execution.",
    "heroCTAText": "Let's Chat",
    "heroImage": "/assets/images/hero-walking.jpg",
    "uspHeadline": "It's about understanding people... not just platforms.",
    "uspBody": "I focus on uncovering what your audience actually cares about, then shaping creative and messaging that feels natural, emotional, and aligned with how they think and buy. When strategy leads, performance follows.",
    "uspImage": "/assets/images/computer.jpg",
    "staticShowcaseHeadline": "See the Creative Strategy Come to Life",
    "staticShowcaseSubheading": "These static ads are real examples of how insight, intention, and execution come together. Each piece is designed to speak to a specific audience, highlight what matters most, and make the message feel natural, not forced.",
    "videoShowcaseHeadline": "",
    "videoShowcaseSubheading": "Sometimes the UGC comes back less than ideal. Sometimes all you have are still images from a recent shoot. This portfolio highlights how creative strategy and thoughtful editing can transform what you have into video ads that actually work."
  },
  "about": {
    "photo": "/assets/images/about-photo.jpg",
    "bio": ""
  },
  "services": [
    { "id": "1", "title": "Creative Strategist Consultant", "description": "For teams that already have execution covered but need sharper thinking behind the creative..." },
    { "id": "2", "title": "Paid Media Consultant", "description": "Campaign strategy and management across Meta, Pinterest, and TikTok..." },
    { "id": "3", "title": "Organic Social Consultant", "description": "Organic social strategy focused on clarity, consistency, and connection..." },
    { "id": "4", "title": "Graphic Design", "description": "Strategic, conversion-focused design that supports your marketing goals..." },
    { "id": "5", "title": "Brand Design", "description": "Intentional brand identities built to position you clearly and confidently..." }
  ],
  "portfolio": [
    {
      "id": "...",
      "slug": "...",
      "title": "...",
      "shortDescription": "...",
      "image": "...",
      "tagline": "...",
      "strategyBullets": ["...", "..."]
    }
  ],
  "blog": [
    {
      "id": "...",
      "slug": "...",
      "title": "...",
      "date": "...",
      "coverImage": "...",
      "body": "..."
    }
  ],
  "testimonials": [
    {
      "id": "...",
      "name": "...",
      "titleCompany": "...",
      "quote": "...",
      "avatar": ""
    }
  ]
}
```

On first load, if no localStorage data exists, seed the app with the real homepage copy above plus placeholder portfolio items, blog posts, and testimonials so the site looks complete immediately.

---

## Aesthetic & Design Direction

### Colors
- **Cream (light sections)**: `#F5EFE6` — warm linen tone, used for light backgrounds
- **Dark (hero, footer, dark sections)**: `#0D0D0D` or similar near-black
- **Accent**: warm gold or terracotta — pick one and commit, use sparingly for CTAs and highlights
- Define all as CSS variables: `--color-cream`, `--color-dark`, `--color-accent`

### Typography
- Use annalise's **custom TTF font files exclusively** — update names once filenames are confirmed
- Pair a **serif display font** for headlines with a **clean sans-serif** for body text
- Headline sizes should be large and editorial — think magazine, not SaaS
- **Never use**: Inter, Roboto, Arial, or any generic system font

### Layout & Feel
- Alternating dark/cream sections (dark hero → cream USP → dark showcase → cream testimonials → dark footer)
- Generous whitespace — let everything breathe
- Numbered items in portfolio and services (01, 02, 03...)
- Strong typographic hierarchy — headlines carry the visual weight
- Subtle scroll-triggered animations: fade + slide up on section entry
- Smooth hover states on all cards and buttons
- No purple gradients, no generic SaaS layouts, no cookie-cutter AI aesthetics

---

## Key Constraints
- `/admin` is **never linked** anywhere public — annalise types the URL directly
- Password-only login — no username, no sign-up flow
- Blog is read-only to the public — no comments, no likes (SEO only)
- Admin UI must be extremely simple — annalise is non-technical and previously struggled with Webflow
- All Twilio credentials must live in Vercel environment variables — never in source code
- `storage.js` abstraction must be in place from day one for clean future backend migration