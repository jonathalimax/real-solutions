# Design: Remove Header Icon & Add Trusted Companies Section

**Date:** 2026-05-14  
**Scope:** Header logo simplification + new landing page section showcasing client work

---

## Overview

Two related changes to the landing page:

1. **Remove the teal/green circular icon** before "Real Solutions" in the sticky header
2. **Add a new "Trusted Companies" section** that highlights three key clients with your specific role at each

This positions the work done at Bradesco, Globo, and Sword Health as social proof of technical leadership and execution.

---

## Changes

### 1. Header Logo Simplification

**File:** `components/landing/header.tsx`

**Current state (lines 16–20):**
```tsx
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_#14b8a6]" />
  <span className="text-xl font-bold text-white tracking-tight">
    Real Solutions
  </span>
</div>
```

**Change:** Remove the circular icon div entirely. Keep just the text span, but adjust spacing to maintain visual balance.

**Result:** Header shows only "Real Solutions" text in the logo area.

---

### 2. New "Trusted Companies" Section

#### 2.1 Component Location
**File:** New component `components/landing/trusted-companies.tsx`  
**Integration:** Add to `app/page.tsx` between `FeaturedProject` and `Differentials`

```tsx
// In app/page.tsx, after line 38:
<FeaturedProject language={language} />
<TrustedCompanies language={language} />  {/* NEW */}
<Differentials language={language} />
```

#### 2.2 Component Structure

**Props:**
```tsx
interface TrustedCompaniesProps {
  language: 'pt-BR' | 'en'
}
```

**Data:**
Companies array with: name, logoUrl, role (pt-BR/en), link, accentColor

```tsx
const companies = [
  {
    name: 'Bradesco',
    logoUrl: '[to be sourced]',
    role: { 'pt-BR': 'Desenvolvedor iOS', en: 'iOS Developer' },
    link: 'https://www.bradesco.com.br',
    accentColor: '#14b8a6',
  },
  {
    name: 'Globo',
    logoUrl: '[to be sourced]',
    role: { 'pt-BR': 'Líder Técnico', en: 'Technical Leader' },
    link: 'https://www.globo.com',
    accentColor: '#0ea5e9',
  },
  {
    name: 'Sword Health',
    logoUrl: '[to be sourced]',
    role: { 'pt-BR': 'Líder Técnico', en: 'Technical Leader' },
    link: 'https://www.swordhealth.com',
    accentColor: '#6366f1',
  },
]
```

#### 2.3 Layout & Styling

- **Section container:** Full width with padding (matches other sections: `py-16 px-4 sm:px-6 lg:px-8`)
- **Grid:** 3 columns on desktop, responsive to 2 on tablet, 1 on mobile
- **Card styling:** Use `glass-card` class (matches SocialProof testimonials)
- **Card content:**
  - Company logo (centered, ~80–120px width)
  - Company name (bold, white text)
  - Role description (smaller, teal accent color matching section theme)
  - Link as a button or underlined text

#### 2.4 Animations

- Use existing animation patterns: `animate-on-scroll`, `animate-scale-fade`/`animate-slide-up`
- Stagger cards with `transitionDelay` on each card
- Fade in on scroll (use `useInView` hook like SocialProof)

#### 2.5 Accessibility & Languages

- **Section label (above grid):** 
  - pt-BR: "Empresas que confiam em nós"
  - en: "Companies that trust us"
- **Alt text for logos:** Include company name
- **Links:** Open in new tab (`target="_blank"` with `rel="noopener noreferrer"`) to keep user on site

---

## Files to Modify

| File | Change |
|------|--------|
| `components/landing/header.tsx` | Remove icon div from logo area |
| `components/landing/trusted-companies.tsx` | NEW: Create component |
| `app/page.tsx` | Import and add `<TrustedCompanies />` |

---

## Notes

- Company logo URLs need to be sourced/confirmed (placeholder `[to be sourced]`)
- Links point to company homepages; adjust if specific pages are preferred
- Testimonials section remains disabled (`SHOW_TESTIMONIALS = false` in `social-proof.tsx`); no changes to testimonials logic
- Accent colors chosen to match your brand palette; adjust if needed

---

## Success Criteria

✓ Green/teal icon removed from header  
✓ "Real Solutions" text remains centered and properly spaced  
✓ New "Trusted Companies" section appears between Featured Project and Differentials  
✓ Three company cards render with logo, name, role, and link  
✓ Animations and styling match existing landing page  
✓ Both language versions display correct text  
