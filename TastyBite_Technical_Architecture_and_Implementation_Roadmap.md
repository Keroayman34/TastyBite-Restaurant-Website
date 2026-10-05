# TastyBite --- Technical Architecture & Implementation Roadmap

> **Document Type:** Technical Reference / Source of Truth\
> **Project:** TastyBite Restaurant Website\
> **Architecture Status:** Approved --- Phase 1 Frontend-only\
> **Role of this document:** Mandatory reference for human developers
> and AI coding agents during implementation.

---

## 1. Project Vision

TastyBite is a modern, responsive restaurant website designed as a
production-quality digital restaurant experience.

The current scope is a **frontend-only application** that provides:

- Restaurant homepage and brand presentation
- Digital menu
- Product/category browsing
- Search, filtering, and sorting
- Product details and customization
- Shopping cart
- Checkout/order preparation
- WhatsApp-based ordering
- Special offers
- About section
- Contact information
- Phone/email/social links
- Restaurant locations
- Customer reviews presentation
- Gallery / Instagram-style presentation
- Responsive experience across desktop, tablet, and mobile

The application must be designed so that a future backend can be
introduced without forcing a complete rewrite of the frontend
architecture.

---

# 2. Architectural Decision

## 2.1 Current Architecture

**TastyBite Phase 1 is FRONTEND-ONLY.**

The application does **not** currently require:

- Backend API
- Database
- Authentication
- JWT
- Admin dashboard
- Online payment processing
- Server-side order management
- Customer accounts
- Order tracking

These are intentionally excluded from Phase 1 to avoid unnecessary
complexity and overengineering.

## 2.2 Current Data Flow

```text
User
  ↓
Next.js / React UI
  ↓
Application / Feature Logic
  ↓
Local Static Data
  ↓
Client State
  ↓
localStorage
  ↓
WhatsApp Order / External Services
```

## 2.3 Future Full-Stack Direction

The architecture must remain extensible toward:

```text
Frontend
   ↓
Application Layer
   ↓
API / Backend
   ↓
Database
```

A future backend may manage:

- Products
- Categories
- Offers
- Orders
- Customers
- Reviews
- Restaurant branches
- Delivery zones
- Inventory
- Coupons
- Analytics
- Authentication
- Notifications
- Payments

Do not implement these in Phase 1 unless explicitly requested.

---

# 3. Approved Technology Stack

## 3.1 Core Stack

---

Area Technology

---

Framework Next.js

UI Library React

Language TypeScript

Styling Tailwind CSS

Icons Lucide React

Forms React Hook Form

Validation Zod

Client State React Context + useReducer
initially

Persistence Browser localStorage

Testing Vitest

Component Testing React Testing Library

E2E Testing Playwright

Code Quality ESLint

Formatting Prettier

Version Control Git

Repository GitHub

Deployment Production-ready Next.js hosting /
compatible deployment

SEO Next.js Metadata + structured data

Image Optimization Next.js Image
-----------------------------------------------------------------------

## 3.2 Explicitly Avoid Unless Requirements Change

Do not introduce the following without an architectural decision:

- Redux / Redux Toolkit
- TanStack Query
- Backend framework
- MongoDB / PostgreSQL
- JWT
- Authentication libraries
- Redis
- GraphQL
- Microservices
- Docker
- Payment SDKs
- Unnecessary third-party UI libraries

The rule is:

> **Do not add technology simply because it is popular. Add it only when
> a real project requirement justifies it.**

---

# 4. Technology Responsibilities

## Next.js

Responsible for:

- Application framework
- Routing
- Page structure
- Metadata
- SEO capabilities
- Image optimization
- Production rendering strategy
- Performance-oriented application structure

## React

Responsible for:

- UI components
- Component composition
- Interactive behavior
- Client-side state
- Reusable interfaces

## TypeScript

Responsible for:

- Static typing
- Domain models
- Component props
- Service contracts
- Safer refactoring
- Better team collaboration

## Tailwind CSS

Responsible for:

- Responsive styling
- Design system implementation
- Layout
- Spacing
- Typography
- Responsive breakpoints
- Visual consistency

Tailwind must be organized around reusable design tokens and components
rather than uncontrolled utility duplication.

## React Hook Form

Responsible for:

- Customer information forms
- Checkout form behavior
- Validation integration
- Form state management

## Zod

Responsible for:

- Runtime input validation
- Form schemas
- Data validation
- Safer boundaries between user input and application logic

## React Context + useReducer

Initially responsible for:

- Shopping cart state
- Cart actions
- Quantity changes
- Add/remove products
- Cart persistence coordination

Do not introduce a global state library unless the application's real
complexity requires it.

## localStorage

Responsible for:

- Cart persistence between browser sessions

Never store secrets or sensitive authentication information in
localStorage.

## Vitest

Responsible for:

- Unit tests
- Business logic tests
- Utility tests
- Cart logic tests
- Pricing logic tests

## React Testing Library

Responsible for:

- Component behavior testing
- User-focused UI testing

## Playwright

Responsible for:

- End-to-end flows
- Navigation testing
- Menu → Product → Cart flow
- Checkout flow
- Responsive-critical flows

---

# 5. Architecture Principles

The project follows these principles:

1.  Clean Code
2.  Separation of Concerns
3.  Feature-based organization
4.  Appropriate SOLID principles
5.  DRY
6.  KISS
7.  YAGNI
8.  Composition over unnecessary inheritance
9.  Dependency inversion where useful
10. Explicit data contracts
11. Reusable UI primitives
12. Accessibility by default
13. Performance by default
14. Security by default
15. Maintainability over cleverness

---

# 6. Architecture Style

The project uses a **Feature-Based Architecture inspired by Clean
Architecture**.

We do NOT blindly implement heavyweight enterprise Clean Architecture
patterns on the frontend.

The goal is:

> Clean boundaries without unnecessary abstraction.

High-level structure:

```text
UI / Presentation
       ↓
Feature / Application Logic
       ↓
Domain Rules
       ↓
Infrastructure / Storage / External Integrations
```

Example:

```text
AddToCartButton
      ↓
Cart Use Case
      ↓
Cart Repository Contract
      ↓
localStorage implementation
```

The UI should not directly contain persistence logic whenever that logic
can be isolated cleanly.

---

# 7. Recommended Project Structure

The exact structure may be refined during Phase 1, but the architectural
direction is:

```text
tastybite/
│
├── app/
│   ├── page.tsx
│   ├── menu/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── offers/
│   ├── about/
│   ├── contact/
│   ├── locations/
│   ├── reviews/
│   └── gallery/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── cart/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── checkout/
│   ├── offers/
│   ├── contact/
│   ├── locations/
│   ├── reviews/
│   └── gallery/
│
├── domain/
│   ├── entities/
│   ├── rules/
│   └── contracts/
│
├── services/
│   ├── whatsapp/
│   ├── storage/
│   └── external-links/
│
├── data/
│   ├── products/
│   ├── categories/
│   ├── offers/
│   ├── locations/
│   ├── reviews/
│   └── gallery/
│
├── config/
│
├── lib/
│
├── types/
│
├── public/
│
└── tests/
    ├── unit/
    ├── components/
    └── e2e/
```

The implementation agent must inspect the actual project before creating
or changing directories. Do not duplicate existing structures
unnecessarily.

---

# 8. Core Domain Concepts

The initial domain should include concepts such as:

## Product

```text
id
name
description
categoryId
basePrice
image
available
tags
```

## Category

```text
id
name
description
image
```

## Product Customization

Examples:

```text
size
crust
extras
quantity
```

## Cart Item

```text
product
quantity
selectedOptions
unitPrice
subtotal
```

## Cart

```text
items
subtotal
deliveryFee
total
```

## Offer

```text
id
title
description
originalPrice
discountedPrice
image
items
```

## Location

```text
id
name
address
phone
workingHours
mapUrl
```

## Review

```text
id
customerName
rating
comment
date
avatar
```

The exact domain models must be finalized during the architecture/setup
phase.

---

# 9. Main User Journey

The primary conversion journey is:

```text
Homepage
   ↓
Menu
   ↓
Product Details
   ↓
Customize Product
   ↓
Add to Cart
   ↓
Shopping Cart
   ↓
Checkout
   ↓
Generate WhatsApp Order
   ↓
WhatsApp
```

Secondary journeys:

```text
Homepage → Offers → Product / Order
Homepage → Categories → Menu
Homepage → Contact → Call / Email / WhatsApp
Homepage → Locations → Map / Directions
Homepage → Gallery → Social Media
```

---

# 10. External Integrations

The current project uses external services through safe client-side
links where appropriate.

## WhatsApp

Used for:

- Final order handoff
- Customer communication

The frontend constructs the order message and opens the configured
WhatsApp destination.

No WhatsApp secret/API credential belongs in the frontend.

## Phone

Use:

```text
tel:
```

## Email

Use:

```text
mailto:
```

## Social Media

Supported destinations may include:

- Instagram
- Facebook
- TikTok
- YouTube

These are external links unless a future requirement introduces an
actual API integration.

## Google Maps

Use an external map/directions URL or an appropriate embed if required.

---

# 11. Security Requirements

Even though Phase 1 is frontend-only, security is still mandatory.

## Never expose

- API secrets
- Database credentials
- Private keys
- Payment secrets
- Server credentials
- Authentication secrets

## Input validation

Validate:

- Customer name
- Phone
- Address
- Notes
- Product selections
- Quantities

## XSS protection

Avoid `dangerouslySetInnerHTML` unless there is an explicitly reviewed
requirement and a safe sanitization strategy.

## URL safety

External URLs must come from trusted configuration/data.

## Client-side trust boundary

Never assume frontend validation is a security boundary.

If a future backend is introduced, all important business rules must be
validated again server-side.

---

# 12. Performance Requirements

Performance is a first-class requirement.

## Images

Use Next.js Image optimization where applicable.

Requirements:

- Correct dimensions
- Responsive sizing
- Appropriate loading strategy
- Lazy loading for non-critical images
- Priority loading only for critical above-the-fold imagery
- Avoid unnecessarily large assets

## Rendering

Avoid:

- Unnecessary client components
- Excessive re-renders
- Large global state
- Heavy dependencies
- Duplicate data
- Unnecessary JavaScript

## Core Web Vitals

Target strong performance for:

- LCP
- CLS
- INP

The homepage and menu are high-priority performance surfaces.

---

# 13. SEO Requirements

The restaurant website must be SEO-ready.

Implement:

- Page metadata
- Unique page titles
- Descriptions
- Open Graph metadata
- Social sharing metadata
- Canonical URLs where appropriate
- Sitemap
- Robots configuration
- Structured data where appropriate

Potential structured data:

- Restaurant
- LocalBusiness
- Product/menu-related information where appropriate

Do not add fake ratings, fake reviews, or misleading structured data.

---

# 14. Accessibility Requirements

The application should target strong accessibility.

Requirements:

- Semantic HTML
- Proper heading hierarchy
- Accessible buttons
- Accessible links
- Form labels
- Keyboard navigation
- Visible focus states
- Appropriate ARIA only when necessary
- Sufficient contrast
- Meaningful image alt text
- No interaction that depends only on hover

Accessibility is part of the implementation definition of done.

---

# 15. Responsive Requirements

The design must work across:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Do not treat mobile as a smaller desktop.

The layout must be intentionally responsive.

High-priority areas:

- Navigation
- Hero
- Menu grid
- Product details
- Cart
- Checkout
- Offers
- Contact
- Gallery
- Footer

---

# 16. State Management Strategy

## Local UI State

Use React state for:

- Modal visibility
- Selected tab
- Temporary UI state
- Filters when local to a component

## Cart State

Use:

```text
React Context
+
useReducer
```

The cart logic should be centralized and testable.

## Persistence

Persist cart state using localStorage through a dedicated storage
abstraction.

Do not scatter `localStorage.setItem()` calls throughout components.

---

# 17. WhatsApp Order Architecture

The WhatsApp integration should be isolated.

Recommended conceptual flow:

```text
Checkout Form
      ↓
Validation
      ↓
Order Model
      ↓
Order Formatter
      ↓
WhatsApp URL Builder
      ↓
Open WhatsApp
```

The UI should not manually build complex WhatsApp strings.

The order formatter/builder should be independently testable.

---

# 18. SOLID Application

SOLID must be applied pragmatically.

## Single Responsibility

Each component/service should have one clear responsibility.

## Open/Closed

Business logic should allow new implementations without rewriting
unrelated features.

## Liskov Substitution

Use only where actual substitutable abstractions exist.

## Interface Segregation

Prefer small focused contracts.

## Dependency Inversion

Important application logic should depend on contracts rather than
directly depending on infrastructure when practical.

Example:

```text
Cart Use Case
     ↓
CartRepository
     ↓
LocalStorageCartRepository
```

A future implementation could become:

```text
ApiCartRepository
```

without rewriting the use case.

---

# 19. Coding Standards

All implementation must follow:

- TypeScript strictness
- Meaningful names
- Small focused functions
- Small focused components
- No unnecessary duplication
- No dead code
- No unused imports
- No unexplained magic numbers
- No giant components
- No business logic hidden inside JSX when it belongs in a service/use
  case
- No unnecessary abstraction
- Consistent naming conventions
- Consistent file organization
- Comments only when they explain non-obvious decisions

---

# 20. AI / Vibe Coding Agent Rules

This document is the **Source of Truth** for AI coding agents.

Before making changes, the agent must:

1.  Inspect the existing project.
2.  Inspect the existing architecture.
3.  Inspect package.json and configuration.
4.  Inspect current routes/components.
5.  Inspect existing conventions.
6.  Reuse existing code when appropriate.
7.  Avoid duplicating functionality.
8.  Avoid introducing unapproved technologies.
9.  Avoid changing architecture without explicit approval.
10. Preserve existing working functionality.
11. Implement only the requested phase/sprint scope.
12. Keep changes focused.
13. Validate the implementation after changes.
14. Report files changed and important decisions.

The agent must NOT hallucinate requirements.

If something is unclear or conflicts with this document, it must:

> Prefer the explicit project requirements and this architecture
> reference over assumptions.

If a requested implementation would require changing the approved
architecture, the agent should clearly identify the architectural
conflict before making a large structural change.

---

# 21. Implementation Phases / Sprints

The project is divided into **11 implementation phases**.

The order is intentional.

---

# Phase 1 --- Project Setup & Architecture

## Objective

Establish the technical foundation.

## Tasks

- Initialize Next.js
- Configure TypeScript
- Configure Tailwind CSS
- Configure ESLint
- Configure Prettier
- Establish folder structure
- Establish aliases
- Establish environment/config strategy
- Establish base types
- Establish architectural boundaries
- Establish Git conventions
- Establish testing infrastructure

## Deliverables

- Working project
- Clean architecture skeleton
- Coding standards
- Base configuration
- Test configuration
- Architecture documentation

## Exit Criteria

The project builds successfully and the architecture is ready for
feature implementation.

---

# Phase 2 --- Design System & UI Foundation

## Objective

Convert the approved TastyBite visual identity into reusable UI
foundations.

## Tasks

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Buttons
- Inputs
- Cards
- Badges
- Icons
- Containers
- Responsive breakpoints
- Navigation foundation
- Footer foundation

## Deliverables

Reusable UI primitives and design tokens.

## Exit Criteria

The project has a consistent visual system that can support all pages.

---

# Phase 3 --- Layout, Navigation & Homepage

## Objective

Build the global layout and Homepage.

## Tasks

- Header/navigation
- Mobile navigation
- Footer
- Hero section
- Restaurant categories
- Featured content
- Main CTA
- Responsive behavior

## Exit Criteria

Homepage accurately implements the approved design and works
responsively.

---

# Phase 4 --- Menu & Product System

## Objective

Implement the restaurant menu experience.

## Tasks

- Category navigation
- Product data
- Product cards
- Search
- Filtering
- Sorting
- Availability state
- Product grid
- Responsive menu

## Exit Criteria

Users can discover and browse products efficiently.

---

# Phase 5 --- Product Details & Customization

## Objective

Implement product detail and customization.

## Tasks

- Product detail page
- Product images
- Product information
- Size selection
- Crust selection
- Extras
- Quantity
- Dynamic pricing
- Add to cart

## Exit Criteria

Users can configure products and add valid cart items.

---

# Phase 6 --- Shopping Cart

## Objective

Build a reliable cart system.

## Tasks

- Cart state
- Add/remove
- Quantity changes
- Product customization display
- Subtotal
- Delivery fee
- Total
- Empty cart
- Persistence
- Cart UI

## Exit Criteria

Cart behavior is predictable, persistent, tested, and responsive.

---

# Phase 7 --- Checkout & WhatsApp Ordering

## Objective

Create the conversion flow from cart to WhatsApp.

## Tasks

- Customer information form
- Validation
- Order summary
- Total calculation
- WhatsApp message generation
- WhatsApp URL builder
- Error handling
- Mobile behavior

## Exit Criteria

A valid customer can generate a complete WhatsApp order from the cart.

---

# Phase 8 --- Secondary Restaurant Pages

## Objective

Implement the remaining business-facing pages.

## Pages

- About Us
- Offers
- Contact Us
- Locations
- Reviews
- Gallery / Instagram-style page

## Tasks

- Content
- Cards
- CTAs
- Social links
- Phone
- Email
- Map/directions
- Working hours
- Responsive layouts

## Exit Criteria

All approved secondary pages are complete and connected to the global
navigation.

---

# Phase 9 --- SEO & Performance Optimization

## Objective

Prepare the application for production-level discoverability and
performance.

## Tasks

- Metadata
- Open Graph
- Sitemap
- Robots
- Structured data
- Image optimization
- Loading optimization
- Code splitting review
- Client/server component review
- Core Web Vitals review
- Bundle review

## Exit Criteria

The site is SEO-ready and performance bottlenecks are addressed.

---

# Phase 10 --- Testing, Security, Accessibility & Quality

## Objective

Harden the application before production.

## Tasks

### Testing

- Unit tests
- Component tests
- Cart tests
- Pricing tests
- WhatsApp builder tests
- Form validation tests
- E2E tests

### Security

- Input validation
- External URL review
- XSS review
- Secret exposure review
- Configuration review

### Accessibility

- Keyboard navigation
- Focus states
- Screen-reader semantics
- Form accessibility
- Contrast
- Image alt text

### Quality

- ESLint
- TypeScript checks
- Build verification
- Dead code review
- Dependency review

## Exit Criteria

The application passes quality gates and critical user journeys are
tested.

---

# Phase 11 --- Production Deployment

## Objective

Deploy the final production-ready TastyBite application.

## Tasks

- Production build
- Environment configuration
- Hosting configuration
- Domain configuration if available
- Final SEO verification
- Final responsive verification
- Final performance verification
- Final smoke tests
- Deployment documentation

## Exit Criteria

The production application is accessible, stable, responsive, and
documented.

---

# 22. Sprint Execution Protocol

Each phase should be executed using the following process:

```text
1. Read Architecture Reference
        ↓
2. Identify Current Phase
        ↓
3. Review Design Reference
        ↓
4. Define Phase Scope
        ↓
5. Implement
        ↓
6. Test
        ↓
7. Review Architecture
        ↓
8. Fix Issues
        ↓
9. Verify Build
        ↓
10. Document Completion
```

No phase should silently implement major features from a future phase.

---

# 23. Definition of Done

A feature is NOT complete simply because it visually appears.

A feature is complete when:

- UI matches the approved design
- Responsive behavior works
- TypeScript passes
- ESLint passes
- Relevant tests pass
- Accessibility is considered
- Performance is considered
- Error/empty states are handled
- Business logic is separated appropriately
- No unnecessary dependency was introduced
- No security-sensitive information is exposed
- Existing features remain functional
- Build succeeds

---

# 24. Design-to-Code Workflow

The design files/screenshots are the visual source of truth for UI
implementation.

For each page:

```text
Architecture Reference
        +
Approved Design
        +
Current Phase
        ↓
Implementation Prompt
        ↓
AI Coding Agent
        ↓
Implementation
        ↓
Review
```

The implementation agent must not invent a different visual design when
an approved design exists.

If the design and architecture conflict:

- Preserve architectural integrity.
- Preserve the intended visual result.
- Use the simplest clean implementation.
- Escalate major conflicts instead of silently changing requirements.

---

# 25. Development Sequence

The overall journey is:

```text
PHASE 1
Project Setup & Architecture
        ↓
PHASE 2
Design System
        ↓
PHASE 3
Layout + Homepage
        ↓
PHASE 4
Menu + Products
        ↓
PHASE 5
Product Details
        ↓
PHASE 6
Cart
        ↓
PHASE 7
Checkout + WhatsApp
        ↓
PHASE 8
About + Offers + Contact + Locations + Reviews + Gallery
        ↓
PHASE 9
SEO + Performance
        ↓
PHASE 10
Testing + Security + Accessibility
        ↓
PHASE 11
Production Deployment
```

---

# 26. Future Backend Migration Strategy

If TastyBite evolves into a full-stack system, preserve the current
frontend contracts.

Potential future architecture:

```text
Next.js Frontend
        ↓
Application Layer
        ↓
REST / API Layer
        ↓
Backend
        ↓
Database
```

Potential future modules:

```text
Authentication
Products
Categories
Orders
Customers
Reviews
Offers
Locations
Inventory
Payments
Notifications
Analytics
Admin
```

The future backend must be introduced as a deliberate architectural
phase, not casually added during frontend implementation.

---

# 27. Final Technology Decision

## Approved

```text
Next.js
React
TypeScript
Tailwind CSS
Lucide React
React Hook Form
Zod
React Context
useReducer
localStorage
Vitest
React Testing Library
Playwright
ESLint
Prettier
Git
GitHub
Next.js SEO / Metadata
Next.js Image
```

## Architecture

```text
Feature-Based Architecture
+
Clean Architecture Principles
+
Pragmatic SOLID
+
Separation of Concerns
+
YAGNI
+
KISS
+
DRY
```

## Current Backend Decision

```text
NO BACKEND IN PHASE 1
```

## Current Database Decision

```text
NO DATABASE IN PHASE 1
```

## Current Authentication Decision

```text
NO AUTHENTICATION IN PHASE 1
```

## Current Ordering Decision

```text
Cart
  ↓
Checkout
  ↓
Validated Order Data
  ↓
WhatsApp Message
  ↓
WhatsApp
```

---

# 28. Source-of-Truth Rule

This document is the project's technical reference.

When creating implementation prompts for individual phases, the
following priority should be used:

```text
1. Explicit project requirement
2. Approved UI/UX design
3. This architecture document
4. Existing project conventions
5. General engineering best practices
6. Agent assumptions — LAST
```

An AI agent must never invent requirements simply because a common
implementation pattern exists.

---

# 29. Current Project Status

```text
Project: TastyBite
Architecture: Approved
Stack: Approved
Implementation: Not started
Current Phase: Phase 1
Backend: Not planned for Phase 1
Database: Not planned for Phase 1
```

The next implementation task is:

> **Phase 1 --- Project Setup & Architecture**

Before implementation begins, the development agent should inspect the
repository and establish the agreed technical foundation without
implementing future-phase features.
