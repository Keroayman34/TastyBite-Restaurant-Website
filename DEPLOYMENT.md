# TastyBite Production Deployment

## Application

- **Project:** TastyBite Restaurant Website
- **Framework:** Next.js 14 (App Router)
- **Version:** v1.0.0
- **Architecture:** Frontend-only (no backend, database, or authentication)

## Production Build

### Prerequisites

- Node.js 18.17+ (Node 22 recommended)
- npm 9+

### Build Commands

```bash
npm install
npm run build
```

### Validation Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Hosting

### Recommended: Vercel

Vercel is the native hosting platform for Next.js and requires zero configuration.

#### Deployment Steps

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy to production:**

   ```bash
   vercel --prod
   ```

4. **Set environment variable:**

   ```bash
   vercel env add NEXT_PUBLIC_SITE_URL
   ```

   Enter the production URL (e.g., `https://tastybite.vercel.app`) when prompted.

5. **Redeploy after env change:**
   ```bash
   vercel --prod
   ```

#### Alternative: Git Integration

1. Push the repository to GitHub
2. Import the project in Vercel Dashboard
3. Set `NEXT_PUBLIC_SITE_URL` in Environment Variables
4. Deployments are automatic on every push to `main`

### Alternative: Self-Hosted

```bash
npm run build
npm start
```

Requires Node.js 18.17+ on the server. Use a reverse proxy (nginx, Caddy) for HTTPS.

## Environment Variables

| Variable               | Required    | Description                                                       |
| ---------------------- | ----------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Production URL for metadata, canonical links, sitemap, and robots |

**No production secrets are required.** This is a frontend-only application.

## Domain

- **Status:** No custom domain configured
- **Production URL:** Vercel-assigned URL (e.g., `https://tastybite.vercel.app`)
- **HTTPS:** Automatic via Vercel

## SEO

- **Sitemap:** `/sitemap.xml` — auto-generated from `app/sitemap.ts`
- **Robots:** `/robots.txt` — auto-generated from `app/robots.ts`
- **Canonical URLs:** Configured via `NEXT_PUBLIC_SITE_URL`
- **Open Graph:** Configured in root layout and product pages
- **Structured Data:** Restaurant JSON-LD in root layout, BreadcrumbList on product pages
- **OG Image:** `/opengraph-image.svg`

## Verification

### Build Status

| Check                | Result                 |
| -------------------- | ---------------------- |
| TypeScript           | PASS                   |
| ESLint               | PASS                   |
| Prettier             | PASS                   |
| Unit/component tests | 208/208 PASS           |
| Playwright E2E       | 54/54 PASS             |
| Production build     | PASS (32 static pages) |

### Critical User Journeys

- Homepage → Menu → Product Details → Customize → Add to Cart → Cart → Checkout → WhatsApp
- Homepage → About / Offers / Contact / Locations / Reviews / Gallery
- Cart persistence across page reloads
- Mobile navigation and responsive layouts

## Deployment Procedure

1. Ensure all validation checks pass
2. Push the repository to GitHub
3. Import into Vercel (or run `vercel --prod`)
4. Set `NEXT_PUBLIC_SITE_URL` environment variable
5. Verify production URL loads correctly
6. Verify sitemap.xml and robots.txt are accessible
7. Verify a complete order journey (add to cart → checkout → WhatsApp URL generation)

## Rollback

The simplest safe rollback strategy:

1. **Vercel:** Use the Vercel Dashboard to redeploy a previous deployment
2. **Git:** Revert to the previous commit and push:
   ```bash
   git revert HEAD
   git push origin main
   ```
3. **Self-hosted:** Redeploy the previous build artifact

## Post-Deployment Checklist

- [ ] Production URL loads without errors
- [ ] Homepage renders correctly
- [ ] Menu page loads with products
- [ ] Product detail pages render with correct metadata
- [ ] Cart add/remove/quantity works
- [ ] Checkout form validates input
- [ ] WhatsApp URL generates correctly
- [ ] All secondary pages load
- [ ] Mobile navigation works
- [ ] No horizontal overflow on any page
- [ ] sitemap.xml is accessible
- [ ] robots.txt is accessible
- [ ] Open Graph metadata is present
- [ ] Structured data is valid
- [ ] No console errors
