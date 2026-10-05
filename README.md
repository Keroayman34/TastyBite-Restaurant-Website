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

## Development

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

Phase 1 — Foundation
