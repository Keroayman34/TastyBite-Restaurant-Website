# TastyBite Restaurant Website

A modern, responsive restaurant web platform with a digital menu, product browsing, shopping cart, WhatsApp ordering, offers, reviews, locations, and gallery experiences.

## Overview

TastyBite is a production-oriented restaurant website built as a frontend-only Next.js application. The architecture separates domain entities, typed demo data, restaurant configuration, services, and UI concerns so that content can be replaced without rewriting presentation code.

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, TypeScript, Tailwind CSS
- **Icons:** Lucide React
- **Forms:** React Hook Form, Zod
- **State:** React Context + useReducer, localStorage
- **Testing:** Vitest, React Testing Library, Playwright
- **Code Quality:** ESLint, Prettier

## Architecture

The project follows a feature-based architecture inspired by Clean Architecture:

- `app/` — routes and pages
- `components/` — reusable UI primitives and layout components
- `domain/` — entities and repository contracts
- `data/` — typed demo datasets (products, categories, offers, locations, reviews, gallery)
- `config/` — centralized restaurant configuration
- `services/` — infrastructure abstractions (storage)
- `lib/` — shared utilities
- `tests/` — unit, component, and e2e test suites

## Design System

- Semantic color tokens (primary, accent, success, warning, error, foreground, border)
- Fluid typography scale (display, h1–h4, body, caption, label, button, nav)
- Standardized spacing, border radius, and shadow tokens
- Reusable UI primitives (Button, Card, Badge, Container, Input, SectionHeading, IconButton)
- Responsive breakpoints for mobile through large desktop
- Accessible focus states, skip navigation, and semantic HTML

An internal design system preview is available at `/design-system` for development reference.

## Internationalization & Currency

TastyBite targets the Italian market and ships with full Italian and English
support plus EUR/USD display pricing.

| Setting  | Default        | Supported                       | Persistence                             |
| -------- | -------------- | ------------------------------- | --------------------------------------- |
| Language | Italian (`it`) | Italian (`it`), English (`en`)  | `localStorage` key `tastybite_language` |
| Currency | Euro (`EUR`)   | Euro (`EUR`), US Dollar (`USD`) | `localStorage` key `tastybite_currency` |

- Italian is the default UI language and SEO language; English can be selected
  from the header language switcher.
- Language and currency are **independent**: changing one never changes the
  other.
- All prices are stored once as canonical EUR (`basePrice`,
  `originalPrice`, `discountedPrice`, `deliveryFee`). USD is derived at render
  time from a documented ECB exchange-rate snapshot.
- Formatting is locale-aware via `Intl.NumberFormat` (`€12,50`, `€12.50`,
  `$13.99`, `13,99 $`).
- The exchange-rate snapshot lives in `lib/currency/config.ts`.
- Translation dictionaries live in `lib/i18n/translations/` (`it.ts`, `en.ts`)
  and are typed by `types.ts`.
- Italian-market pricing research and sources are documented in
  [`docs/ITALIAN_MARKET_PRICING.md`](docs/ITALIAN_MARKET_PRICING.md).

## Features

- Next.js foundation with App Router and TypeScript strict mode
- Domain entities for products, categories, offers, cart, locations, and reviews
- Typed demo data layer separated from presentation
- Centralized restaurant configuration
- Design token system (brand colors, typography, spacing, radius, shadows)
- Reusable UI primitives (Button, Card, Badge, Container, Input, SectionHeading)
- Layout foundation with Header and Footer
- Local storage abstraction for future cart persistence
- Unit, component, and end-to-end testing foundation
- Continuous integration workflow
- Italian (default) and English localization across every page and UI message
- EUR (default) and USD currency switching with locale-aware formatting
- Canonical EUR pricing with documented Italian-market research

## Development

Requires Node.js 18.17+ (Node 22 recommended).

```bash
npm install
npm run dev
```

## Testing

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Project Status

Phase 1 Complete — Production Ready (v1.6.0) (Italian/English i18n, EUR/USD pricing, Italian-market menu)
