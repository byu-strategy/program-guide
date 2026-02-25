# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js web application that serves as the Strategic Management Program Guide for BYU's Marriott School of Business. The site provides comprehensive information for prospective and current students about the Strategy major, including curriculum, career tracks, placement data, and faculty information.

## Technology Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4** with BYU Marriott design tokens defined in `globals.css`
- **Supabase** (`@supabase/ssr`) for auth and database (wired up, no protected routes yet)
- **PWA** via `@ducanh2912/next-pwa` (service worker, manifest, offline support)
- **Deployment**: Vercel

## Build and Development Commands

### Preview the site locally
```bash
npm run dev
```
Starts the Next.js dev server with hot reload on `localhost:3000`.

### Build for production
```bash
npm run build
```
Builds with webpack (required for PWA plugin). Output goes to `.next/`.

### Run production build locally
```bash
npm start
```

### Lint
```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: Header + Sidebar + Footer
│   ├── page.tsx            # Home / Program Overview
│   ├── globals.css         # Tailwind + BYU Marriott design tokens
│   ├── courses/page.tsx    # Course listings and prereqs
│   ├── tracks/page.tsx     # Four career tracks
│   ├── careers/page.tsx    # Career outcomes + placement pivot table
│   ├── clubs/page.tsx      # Student organizations
│   ├── mentorship/page.tsx # Mentorship opportunities
│   ├── faculty/page.tsx    # Faculty profiles
│   ├── apply/page.tsx      # Application info
│   └── faq/page.tsx        # FAQ accordion
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Navy gradient header with nav
│   │   ├── Footer.tsx      # Navy-dark footer with links
│   │   └── Sidebar.tsx     # Chapter navigation sidebar
│   ├── ui/
│   │   ├── ProfileCard.tsx # Person card with image and contact
│   │   ├── ProfileGrid.tsx # Grid container for ProfileCards
│   │   ├── VideoEmbed.tsx  # Lazy-load YouTube player
│   │   ├── CTAButton.tsx   # Navy/gold call-to-action button
│   │   ├── DataTable.tsx   # Styled data table
│   │   └── PageHeader.tsx  # Page title component
│   └── career/
│       └── PivotTable.tsx  # Client component: filterable placement data
├── lib/
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       └── server.ts       # Server Component Supabase client
└── middleware.ts            # Supabase auth session refresh
public/
├── images/                 # All images, logos, photos
├── data/                   # CSV data files (alum-first-job.csv)
└── manifest.json           # PWA manifest
```

### Configuration Files
- `next.config.ts` — Next.js config wrapped with PWA plugin
- `postcss.config.mjs` — PostCSS with Tailwind
- `tsconfig.json` — TypeScript config with path alias `@/`
- `.env.local` — Supabase URL, anon key, service key, DATABASE_URL (not committed)

### Data Files
- `data/` — All raw data files (gitignored): CSVs, XLSX, PDL JSON, photos, skills backup
- Scripts in `scripts/` reference `data/` for CSV/JSON paths

### Archived Files
- `_archive/` — Original Quarto site files (.qmd, _quarto.yml, docs/, etc.)

## Design System (BYU Marriott Brand)

Design tokens are defined in `src/app/globals.css` using Tailwind v4 `@theme`:

**Colors**: `navy`, `navy-dark`, `royal`, `slate-gray`, `stone`, `yellow`, `orange`, plus accent tones
**Typography**: `font-heading` (Franklin Gothic), `font-body` (Georgia) — system fonts, no imports
**Shadows**: `shadow-xs` through `shadow-xl` — navy-tinted
**Radii**: `rounded-sm` (8px), `rounded-md` (14px), `rounded-lg` (22px), `rounded-pill` (100px)
**Easing**: `var(--ease-out-expo)` — `cubic-bezier(0.16, 1, 0.3, 1)`

## Content Editing

Pages are React components in `src/app/*/page.tsx`. Content is written as JSX.

### Key patterns:
- Profile data (faculty, club officers) is defined as arrays at the top of page files
- Use `ProfileGrid` component for people grids
- Use `DataTable` for tabular data
- Use `VideoEmbed` for YouTube videos (lazy-loaded)
- Use `CTAButton` for call-to-action links
- Wrap page content in `<article className="prose">` for typography styles
- External links use `target="_blank" rel="noopener noreferrer"`

### Updating placement data
1. Edit `public/data/alum-first-job.csv`
2. CSV format: `degree_type,grad_year_band,company.name`
3. The PivotTable component reads this at runtime

### Adding images
1. Place images in `public/images/`
2. Reference with `src="/images/filename.png"` in Next.js `Image` components

### Adding a new page
1. Create `src/app/newpage/page.tsx`
2. Add route to nav arrays in `Header.tsx` and `Sidebar.tsx`
3. Add link in `Footer.tsx`

## Publishing

Deployed via Vercel. Push to `main` triggers automatic deployment.
Environment variables (Supabase URL + anon key) are set in Vercel dashboard.

## Other

- `nettrek/` — Standalone page, kept as-is at root
- PWA generates `public/sw.js` and `public/workbox-*.js` at build time (gitignored)
