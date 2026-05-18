# Web Audit Report: Altura Marketing (http://localhost:5177)

**Tested:** 2026-05-05
**Viewports:** 375x812 (mobile), 768x1024 (tablet), 1440x900 (desktop)
**Pages tested:** Home `/`, Portfolio `/portfolio`, About `/about`, Services `/services`, Blog `/blog`, Blog Post `/blog/:slug`

---

## Critical Issues (must fix)

- [ ] **Responsive**: Blog page is severely broken on mobile (375px) — massive empty whitespace gaps between blog posts, broken thumbnail layout, and the second/third blog post cards are nearly invisible with huge blank areas below them
  - **How to fix**: In `src/pages/Blog.jsx`, ensure blog card images/thumbnails have proper responsive sizing (`width: 100%`, `max-width: 100%`) and the grid layout uses single-column on mobile. Check that thumbnail image paths are valid and the images are rendering — the February 2026 section appears to have missing or zero-height images.

- [ ] **Responsive**: Mobile navigation (375px) has no hamburger menu — all 6 nav links + logo are crammed horizontally into a single row, causing text to be truncated ("PORTFOLIO" barely fits). The Altura logo disappears entirely on mobile.
  - **How to fix**: In `src/components/Navbar.jsx`, add a hamburger menu toggle for screens below ~768px. Hide the nav link list by default on mobile and show it when the hamburger is tapped. Ensure the logo remains visible at all breakpoints.

- [ ] **Responsive**: Homepage hero section on mobile — the heading "TAKING YOUR BUSINESS TO NEW HEIGHTS" is partially clipped/cut off on the left side, and the hero paragraph text is not visible at all on mobile.
  - **How to fix**: In `src/components/Hero.jsx`, add responsive styles so the hero text container has proper padding on mobile (`padding: 0 1rem`) and the heading font-size scales down for small screens (e.g., `font-size: clamp(1.5rem, 5vw, 3.5rem)`).

- [ ] **Accessibility**: Footer social links (@e28, @e29 on homepage) have **no accessible name** — screen readers will announce them as just "link" with no indication of destination (LinkedIn, Instagram, etc.)
  - **How to fix**: In `src/components/Footer.jsx`, add `aria-label` attributes to each social link, e.g., `<a href="..." aria-label="LinkedIn"><img ... /></a>` and `<a href="..." aria-label="Instagram"><img ... /></a>`.

- [ ] **Accessibility**: Testimonial carousel buttons (@e38, @e39 on homepage) and blog article buttons (@e25-@e27 on blog page) have **no accessible names** — screen readers can't distinguish them
  - **How to fix**: Add `aria-label` to carousel buttons: `aria-label="Previous testimonial"` and `aria-label="Next testimonial"`. For blog buttons, add descriptive labels like `aria-label="Share article"` or appropriate description matching their function.

---

## Major Issues (should fix)

- [ ] **Functional**: Contact form on `/services` shows **no success or error feedback** after submission — after filling required fields and clicking SUBMIT, the page stays identical with no confirmation message, toast, or redirect. Users won't know if their inquiry was sent.
  - **How to fix**: In the form submission handler in `src/pages/Services.jsx` (or the contact form component), add a success state that renders a confirmation message like "Thank you! We'll be in touch soon." after successful submission. Also add error handling that displays validation errors inline.

- [ ] **Responsive**: Portfolio page on mobile — brand buttons (BoostedSafe, Kaxi, SALT, etc.) span full width and look like section headers rather than interactive filters. The ad gallery images are not properly responsive.
  - **How to fix**: In `src/pages/Portfolio.jsx`, style the brand filter buttons as a horizontally-scrollable row on mobile (`display: flex; overflow-x: auto; gap: 0.5rem`), and ensure gallery images use `max-width: 100%; height: auto`.

- [ ] **Visual**: Blog page desktop (1440px) — the blog post cards appear to show placeholder "BLOG" text overlaid on dark backgrounds instead of actual feature images for some posts. The third blog post (Importance of Creative Strategy) appears completely empty/blank.
  - **How to fix**: Verify that all blog posts in the data source have valid `thumbnail` or `image` paths. In `src/pages/Blog.jsx`, add a fallback image for posts missing thumbnails.

- [ ] **Accessibility**: Six identical "LEARN MORE" links on the homepage services section — screen readers cannot distinguish which service each link refers to
  - **How to fix**: Add `aria-label` to each link, e.g., `aria-label="Learn more about Creative Strategist Consultant"`, or use visually-hidden text `<span className="sr-only">about Creative Strategist Consultant</span>`.

- [ ] **Accessibility**: No skip-to-content link on any page — keyboard users must tab through all navigation links on every page load before reaching main content
  - **How to fix**: Add a visually-hidden-until-focused skip link as the first element in the body: `<a href="#main-content" className="skip-link">Skip to content</a>` with CSS that positions it off-screen until `:focus`. Add `id="main-content"` to the main content area.

- [ ] **SEO/Accessibility**: Heading hierarchy issues — footer uses `<h4>` for "CONNECT" and "SOCIALS" across all pages, skipping `<h3>`. The About page uses `<h1>` for "ALTURA" (the pronunciation section) and `<h2>` for "ABOUT US", which inverts the expected hierarchy.
  - **How to fix**: Change footer headings to styled `<p>` or `<span>` elements (they're not real section headings). On the About page, make "ABOUT US" the `<h1>` and demote "ALTURA" to a styled paragraph or `<h2>`.

---

## Minor Issues (nice to fix)

- [ ] **UX**: React Grab dev toolbar is visible in the bottom-right corner on all pages — this should be removed or hidden for production builds
  - **How to fix**: Conditionally render the React Grab component only in development: wrap it with `{import.meta.env.DEV && <ReactGrab />}` or remove it before deploying.

- [ ] **Performance**: Console shows React Router v6 future flag warnings (`v7_startTransition`, `v7_relativeSplatPath`) — these should be addressed before upgrading to React Router v7
  - **How to fix**: In `src/App.jsx` or wherever `<BrowserRouter>` is created, add the future flags: `<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>`.

- [ ] **Visual**: Dark mode has no dedicated styles — when `prefers-color-scheme: dark` is active, the site looks identical to light mode. This is fine if intentional, but the light backgrounds can be harsh in dark environments.
  - **How to fix**: If dark mode support is desired, add a `@media (prefers-color-scheme: dark)` block in `src/index.css` with inverted background/text colors for key sections.

- [ ] **SEO**: Page title is "Annalise — Marketing Strategist" on all pages — it doesn't mention "Altura Marketing" and doesn't change per page
  - **How to fix**: Update `<title>` dynamically per route. Homepage: "Altura Marketing — Growth-Focused Marketing Studio", About: "About | Altura Marketing", etc. Use `document.title` in a `useEffect` or add `react-helmet`.

- [ ] **Accessibility**: The homepage outer wrapper `<div>` (@e1) has an `onclick` handler making the entire page technically "clickable" — this is semantically misleading for assistive technology
  - **How to fix**: Identify what the root `onclick` is doing (likely from React Grab) and ensure it doesn't apply to the main page wrapper in production.

- [ ] **Visual**: Footer "ALTURA MARKETING" logo text and the mountain watermark graphic overlap on mobile, and the footer content is slightly cut off at the bottom edge
  - **How to fix**: Add bottom padding to the footer container and ensure the watermark graphic uses `position: absolute` with proper `z-index` layering so it doesn't overlap interactive content.

- [ ] **Performance**: The homepage loads 4 video files (hero + 3 portfolio showcase videos) immediately — this is heavy for initial page load, especially on mobile
  - **How to fix**: Add `loading="lazy"` and `preload="none"` to the portfolio showcase `<video>` elements so they only load when scrolled into view. Consider using `IntersectionObserver` to trigger video loading.

---

## Passed Checks

- [x] `lang="en"` attribute is present on `<html>`
- [x] All pages load without JavaScript errors
- [x] Navigation links work correctly between all pages (Home, Portfolio, About, Services, Blog)
- [x] Blog post detail pages load and render content correctly
- [x] Back navigation from blog post ("← BACK TO BLOG") works
- [x] All network requests return 200 status (no 404s or 5xx errors)
- [x] Form fields have proper `placeholder` labels and `required` attributes on required fields
- [x] Heading hierarchy within individual sections is generally correct (h1 → h2 → h3)
- [x] Images in the hero, about, and portfolio sections load correctly
- [x] Desktop (1440px) layout looks polished and well-structured
- [x] Tablet (768px) layout is functional and readable
- [x] Service accordion buttons on homepage have descriptive labels

---

## Screenshots

Annotated screenshots saved to:
- `/tmp/test-audit-home.png` — Homepage (desktop 1440px)
- `/tmp/test-audit-mobile.png` — Homepage (mobile 375px)
- `/tmp/test-audit-tablet.png` — Homepage (tablet 768px)
- `/tmp/test-audit-desktop.png` — Homepage (desktop 1440px, re-captured)
- `/tmp/test-audit-dark.png` — Homepage (dark mode)
- `/tmp/test-audit-portfolio.png` — Portfolio page
- `/tmp/test-audit-about.png` — About page
- `/tmp/test-audit-services.png` — Services page
- `/tmp/test-audit-services-mobile.png` — Services page (mobile)
- `/tmp/test-audit-blog.png` — Blog page
- `/tmp/test-audit-blog-mobile.png` — Blog page (mobile)
- `/tmp/test-audit-blogpost.png` — Blog post detail
- `/tmp/test-audit-form-submit.png` — Contact form after submission
