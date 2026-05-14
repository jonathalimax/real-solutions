# Website Redesign — Design Spec
**Date:** 2026-05-14  
**Status:** Approved

---

## Goal

Transform the Real Solutions landing page from a flat, lifeless grey site into a vibrant dark-themed tech agency site. Fix the broken animated background, introduce a rich color palette, add scroll-driven animations, and place images that build trust and visual interest.

---

## Design Direction

**Palette:** Dark Teal & Indigo  
- Background base: `#0a1628` (deep navy)  
- Primary accent: `#14b8a6` (teal)  
- Secondary accent: `#6366f1` (indigo)  
- Tertiary accent: `#0ea5e9` (sky blue)  
- Text: `#f8fafc` (primary), `#94a3b8` (muted)  
- Card surface: `rgba(255,255,255,0.04)` with `1px solid rgba(255,255,255,0.08)` border (glassmorphism)

**CSS variables** in `globals.css` are updated to reflect this palette as the default (light-mode override kept but secondary).

---

## Animated Background

**Style:** Radial glow orbs — no grid.  
**Fix:** The current `AnimatedBackground` component uses `<style jsx>` which doesn't work in the App Router without styled-jsx configured. The `float` keyframe also needs to be in `globals.css`.

**Implementation:**
- Move `@keyframes float` and `@keyframes pulse-glow` into `globals.css`
- Rewrite `components/animated-background.tsx` using `className` with those keyframes
- Use 4–5 orbs: teal, indigo, sky, with varied sizes (120px–280px), positions, opacities (0.25–0.45), and animation durations (12s–22s)
- Each orb uses `radial-gradient` from the accent color to transparent
- `blur-3xl` to keep them soft
- `fixed inset-0 -z-10 pointer-events-none overflow-hidden` on the container

---

## Scroll Animations

**Trigger:** `IntersectionObserver` in a custom hook `useInView` — no external library.  
**Hook location:** `hooks/use-in-view.ts`

**Two animation classes added to `globals.css`:**
- `.animate-scale-fade` — for hero headings and section titles: scale `0.95→1`, opacity `0→1`, 600ms ease-out
- `.animate-slide-up` — for cards and list items: translateY `30px→0`, opacity `0→1`, 500ms ease-out
- `.animate-slide-up-delay-{1..5}` — stagger delays at 75ms increments

**Usage pattern:** Elements start with `opacity-0` and the base class. `useInView` adds `is-visible` which triggers the transition.

---

## Component Changes

### `globals.css`
- New dark CSS variables (teal/indigo palette)
- `@keyframes float`, `@keyframes pulse-glow`
- `.animate-scale-fade`, `.animate-slide-up`, stagger delay utilities
- `.glass-card` utility: `bg-white/4 border border-white/8 backdrop-blur-sm rounded-xl`

### `components/animated-background.tsx`
- Remove `<style jsx>` entirely
- 5 orbs using `className` referencing keyframes from globals
- Vivid enough to be seen (opacity 0.25–0.4) but not distracting

### `components/landing/hero.tsx`
- **Layout:** Two-column on desktop (text left, image right), single column on mobile
- **Text:** Gradient title (`teal → indigo`), scale+fade entrance
- **Image:** Pexels tech/workspace photo (free commercial license) in a rounded glassmorphism frame with subtle glow border
- **Stats row:** 3 inline stats (e.g. "120+ projects", "98% satisfaction", "5★ rated") with teal left-border accent
- **CTA buttons:** Primary with teal→indigo gradient; outline with teal border

### `components/landing/social-proof.tsx`
- Horizontal scrolling logo strip or 2–3 testimonial cards
- Each testimonial card: avatar (Pexels portrait photo), name, role, quote
- Glass card styling

### `components/landing/services.tsx`
- Each card: glassmorphism surface, colored icon background circle (one of teal/indigo/sky per card), hover: border glow + slight scale
- Staggered `.animate-slide-up-delay-{n}` on each card

### `components/landing/how-it-works.tsx`
- Steps connected by a horizontal glowing dashed line (teal) on desktop
- Step number: large, gradient-colored
- Entrance: slide-up staggered

### `components/landing/featured-project.tsx`
- Two-column: image mock (Pexels or a project screenshot placeholder) left, text right
- Image has a teal glow border and slight rotation/perspective
- Scale+fade entrance

### `components/landing/differentials.tsx`
- 6 cards in 3×2 grid
- Each card: icon in a 40px circle with colored background (cycling teal/indigo/sky), hover glow
- Staggered slide-up

### `components/landing/pricing.tsx`
- Dark card surfaces; highlighted (Growth) card: teal glow border, slight scale-up, "Most popular" badge
- Feature checkmarks: teal colored `✓`
- CTA button per card

### `components/landing/cta-form.tsx`
- Section background: subtle gradient overlay (teal to indigo at low opacity)
- Input fields: glass styling, teal focus ring
- Submit button: full teal→indigo gradient

### `components/landing/footer.tsx`
- Dark surface, teal logo accent, muted link colors

---

## Images

**Source:** Pexels (free commercial license, no attribution required via API)  
**Approach:** Use direct CDN URLs from Pexels for curated images — no API key needed for static URLs.

**Placements:**
1. **Hero (right column):** A modern workspace/laptop photo — professional and tech-forward
2. **FeaturedProject:** A clean app UI screenshot mock or device mockup photo
3. **SocialProof:** 2–3 portrait photos for testimonial avatars

All images wrapped in `<Image>` from `next/image` with `priority` on Hero image. Pexels domains added to `next.config` `remotePatterns`.

---

## Files to Change

| File | Change |
|------|--------|
| `app/globals.css` | New palette vars, keyframes, animation utilities |
| `components/animated-background.tsx` | Full rewrite |
| `hooks/use-in-view.ts` | New file — IntersectionObserver hook |
| `components/landing/hero.tsx` | Two-column layout, image, stats, gradient text |
| `components/landing/social-proof.tsx` | Testimonial cards with avatars |
| `components/landing/services.tsx` | Glass cards, colored icons, stagger |
| `components/landing/how-it-works.tsx` | Connector line, gradient numbers |
| `components/landing/featured-project.tsx` | Split layout with image |
| `components/landing/differentials.tsx` | Icon circles, hover glow, stagger |
| `components/landing/pricing.tsx` | Glow border on highlight, CTA buttons |
| `components/landing/cta-form.tsx` | Glass inputs, gradient CTA |
| `components/landing/footer.tsx` | Dark styling, teal accents |
| `next.config.ts` | Add Pexels to `remotePatterns` |

---

## Out of Scope

- Dark/light mode toggle (dark is the new default)
- Admin dashboard restyling
- Content/copy changes
- New sections or features
