# Header Icon Removal & Trusted Companies Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the teal icon from the header and add a "Trusted Companies" section showcasing Bradesco, Globo, and Sword Health with your specific roles at each.

**Architecture:** Three focused changes: (1) simplify the header logo, (2) create a new reusable component that follows existing landing page patterns (animations, glass-card styling, multi-language support), (3) integrate it into the page layout.

**Tech Stack:** React/Next.js, TypeScript, Tailwind CSS, existing `useInView` hook, glass-card styling from existing components.

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `components/landing/header.tsx` | Modify | Remove circular icon div |
| `components/landing/trusted-companies.tsx` | Create | New component with company cards |
| `app/page.tsx` | Modify | Import and render TrustedCompanies |

---

## Implementation Tasks

### Task 1: Simplify Header Logo

**Files:**
- Modify: `components/landing/header.tsx:16-20`

- [ ] **Step 1: Remove the circular icon from the header**

Open `components/landing/header.tsx` and remove lines 16-17 (the icon div):

```tsx
// BEFORE (lines 16-20):
<div className="flex items-center gap-2">
  <div className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_#14b8a6]" />
  <span className="text-xl font-bold text-white tracking-tight">
    Real Solutions
  </span>
</div>

// AFTER (replace with):
<span className="text-xl font-bold text-white tracking-tight">
  Real Solutions
</span>
```

Remove the wrapper div entirely. The span becomes a direct child of the nav's flex container.

- [ ] **Step 2: Test header in browser**

Start dev server: `npm run dev`

Navigate to `http://localhost:3000`

Verify:
- "Real Solutions" text is visible in the header
- No circular icon before the text
- Text is properly aligned
- Sticky header still works

- [ ] **Step 3: Commit**

```bash
git add components/landing/header.tsx
git commit -m "fix: remove teal icon from header logo"
```

---

### Task 2: Create TrustedCompanies Component

**Files:**
- Create: `components/landing/trusted-companies.tsx`

- [ ] **Step 1: Create the new component file**

Create `components/landing/trusted-companies.tsx` with the following content:

```tsx
'use client'

import Image from 'next/image'
import { useInView } from '@/hooks/use-in-view'

interface TrustedCompaniesProps {
  language: 'pt-BR' | 'en'
}

interface Company {
  name: string
  logoUrl: string
  role: {
    'pt-BR': string
    en: string
  }
  link: string
  accentColor: string
}

const companies: Company[] = [
  {
    name: 'Bradesco',
    logoUrl: 'https://www.bradesco.com.br/assets/bradesco-logo.png',
    role: {
      'pt-BR': 'Desenvolvedor iOS',
      en: 'iOS Developer',
    },
    link: 'https://www.bradesco.com.br',
    accentColor: '#f59e0b',
  },
  {
    name: 'Globo',
    logoUrl: 'https://www.globo.com/favicon.png',
    role: {
      'pt-BR': 'Líder Técnico',
      en: 'Technical Leader',
    },
    link: 'https://www.globo.com',
    accentColor: '#0ea5e9',
  },
  {
    name: 'Sword Health',
    logoUrl: 'https://www.swordhealth.com/favicon.png',
    role: {
      'pt-BR': 'Líder Técnico',
      en: 'Technical Leader',
    },
    link: 'https://www.swordhealth.com',
    accentColor: '#6366f1',
  },
]

export default function TrustedCompanies({ language }: TrustedCompaniesProps) {
  const { ref, isVisible } = useInView()
  const sectionLabel = language === 'pt-BR' ? 'Empresas que confiam em nós' : 'Companies that trust us'

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/8">
      <div className="mx-auto max-w-7xl">
        <p className={`text-center text-sm font-semibold tracking-widest text-[#14b8a6] uppercase mb-10 animate-on-scroll animate-scale-fade ${isVisible ? 'is-visible' : ''}`}>
          {sectionLabel}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {companies.map((company, i) => (
            <a
              key={company.name}
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card p-6 animate-on-scroll animate-slide-up transition-transform hover:scale-105 cursor-pointer ${isVisible ? 'is-visible' : ''}`}
              style={{
                transitionDelay: `${i * 75}ms`,
                borderColor: `${company.accentColor}22`,
              }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div
                  className="rounded-lg overflow-hidden flex-shrink-0 bg-white/5 p-2"
                  style={{ width: 80, height: 80, border: `2px solid ${company.accentColor}66` }}
                >
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg">{company.name}</div>
                  <div className="text-sm mt-2" style={{ color: company.accentColor }}>
                    {company.role[language]}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npm run build`

Expected: Build completes without TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add components/landing/trusted-companies.tsx
git commit -m "feat: create TrustedCompanies component with Bradesco, Globo, Sword Health"
```

---

### Task 3: Integrate TrustedCompanies into the Page

**Files:**
- Modify: `app/page.tsx:4-15` (imports), `app/page.tsx:38` (JSX)

- [ ] **Step 1: Add the import**

Open `app/page.tsx` and add to the import section (after line 8):

```tsx
// Add after line 8:
import TrustedCompanies from '@/components/landing/trusted-companies'
```

The import section should now be:

```tsx
import { useState } from 'react'
import Hero from '@/components/landing/hero'
import SocialProof from '@/components/landing/social-proof'
import Services from '@/components/landing/services'
import HowItWorks from '@/components/landing/how-it-works'
import FeaturedProject from '@/components/landing/featured-project'
import TrustedCompanies from '@/components/landing/trusted-companies'
import Differentials from '@/components/landing/differentials'
import WhatToExpect from '@/components/landing/what-to-expect'
import Pricing from '@/components/landing/pricing'
import CTAForm from '@/components/landing/cta-form'
import Footer from '@/components/landing/footer'
import Header from '@/components/landing/header'
import AnimatedBackground from '@/components/animated-background'
```

- [ ] **Step 2: Add the component to the page layout**

In the JSX (inside `<main>`), add after line 38 (after `<FeaturedProject language={language} />`):

```tsx
// BEFORE (lines 37-39):
<FeaturedProject language={language} />
<Differentials language={language} />

// AFTER (add TrustedCompanies):
<FeaturedProject language={language} />
<TrustedCompanies language={language} />
<Differentials language={language} />
```

- [ ] **Step 3: Test in browser**

Start/refresh dev server: `npm run dev`

Navigate to `http://localhost:3000`

Verify:
- Header shows "Real Solutions" without icon ✓
- Scroll to the section between "Featured Project" and "Differentials"
- All three company cards render (Bradesco, Globo, Sword Health)
- Company names are visible
- Roles display in correct language (switch language toggle to test pt-BR/en)
- Cards have glass-card styling and animations
- Hover effect (scale-up) works
- Links are clickable and open in new tab

- [ ] **Step 4: Test language switching**

Click the PT/EN toggle at the top right:

Verify:
- pt-BR: Section title reads "Empresas que confiam em nós" and roles show "Desenvolvedor iOS" / "Líder Técnico"
- en: Section title reads "Companies that trust us" and roles show "iOS Developer" / "Technical Leader"

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: integrate TrustedCompanies section into landing page"
```

---

### Task 4: Source Company Logo URLs (Post-Implementation)

**Files:**
- Update: `components/landing/trusted-companies.tsx` (logoUrl fields)

**Note:** Current implementation uses placeholder/fallback logo URLs. After implementation, replace with official company logo URLs.

- [ ] **Step 1: Collect official logo URLs**

Find official logos for:
- Bradesco: Check https://www.bradesco.com.br or brand assets
- Globo: Check https://www.globo.com or brand assets  
- Sword Health: Check https://www.swordhealth.com or brand assets

Collect direct image URLs or host images in your public folder.

- [ ] **Step 2: Update logoUrl values**

Replace placeholder URLs in `components/landing/trusted-companies.tsx` lines in the `companies` array:

Example (if hosting locally):
```tsx
const companies: Company[] = [
  {
    name: 'Bradesco',
    logoUrl: '/logos/bradesco.png',
    // ...
  },
  {
    name: 'Globo',
    logoUrl: '/logos/globo.png',
    // ...
  },
  {
    name: 'Sword Health',
    logoUrl: '/logos/swordhealth.png',
    // ...
  },
]
```

- [ ] **Step 3: Test in browser**

Refresh: `http://localhost:3000`

Verify: Company logos load correctly and display at proper size.

- [ ] **Step 4: Commit**

```bash
git add components/landing/trusted-companies.tsx
git commit -m "fix: update company logo URLs with official logos"
```

---

## Self-Review

**Spec Coverage:**
- ✓ Task 1: Remove teal icon from header
- ✓ Task 2: Create TrustedCompanies component with correct data structure
- ✓ Task 3: Integrate into page between Featured Project and Differentials
- ✓ Task 4: Logo sourcing (deferred, but included)

**Completeness:**
- ✓ All file paths specified exactly
- ✓ All code shown in full (no "add appropriate styling" placeholders)
- ✓ Exact commands with expected output
- ✓ Language support for both pt-BR and en
- ✓ Animation patterns follow existing code
- ✓ Multi-language role descriptions included

**Type Consistency:**
- ✓ TrustedCompaniesProps interface defined
- ✓ Company interface defined with all required fields
- ✓ role field is a dictionary with both language keys
- ✓ Consistent across all tasks

**No Gaps:** All requirements from spec are covered. Logo URL sourcing is deferred to Task 4 with clear instructions.

---

## Testing Checklist

Before marking complete:

- [ ] Dev server runs without errors
- [ ] Header displays without icon
- [ ] Three company cards visible between Featured Project and Differentials
- [ ] Company names and roles render correctly
- [ ] Language toggle switches text properly (pt-BR ↔ en)
- [ ] Card animations trigger on scroll
- [ ] Hover effects work (scale-up transition)
- [ ] Links open company websites in new tab
- [ ] Responsive layout works (mobile: 1 col, tablet: 2 cols, desktop: 3 cols)
- [ ] Glass-card styling matches other sections
- [ ] No console errors or TypeScript warnings

---

## Notes

- Logo URLs (Task 4) should be confirmed before final deployment. Current placeholders are fallbacks.
- All animations use existing `useInView` hook and CSS classes from the project
- Styling uses Tailwind and matches existing glass-card pattern from SocialProof
- Component fully supports bilingual display (pt-BR/en)
- Links open in new tabs with proper `rel="noopener noreferrer"` for security
