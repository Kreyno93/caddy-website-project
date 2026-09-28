# Northline Coffee demo

A premium coffee ecommerce demonstration site built with Next.js, TypeScript, Tailwind CSS, and local mock data. It intentionally does not process payments, send emails, authenticate users, or use a database.

## Run locally

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000`.

For a production check:

```bash
pnpm lint
pnpm build
pnpm start
```

## Docker

```bash
docker compose up -d --build
```

The standalone Next.js container will be available at `http://localhost:8080`.

## Caddy

The sample `Caddyfile` expects the app container to be available as `app:3000` on the same Docker network. Replace `coffee.example.com` with your domain and connect Caddy to this compose network. Caddy will manage HTTPS automatically once DNS points at the server.

## Content and customization

- Mock products live in `data/products.ts`.
- Replace each remote image URL there with a file under `public/` when local assets are ready.
- Change the brand name in `app/layout.tsx`, `app/page.tsx`, and the metadata.
- Change the visual system from the CSS variables at the top of `app/globals.css`.
- The checkout submit handler in `app/page.tsx` intentionally clears the local demo cart and shows a success state. Replace it only when connecting a real commerce backend and payment provider.

## Included demo behavior

Product filtering, search, sorting, product details, localStorage cart persistence, quantity controls, cart drawer, demo checkout, success state, responsive navigation, newsletter confirmation, reduced-motion support, accessible labels, SEO metadata, sitemap, and robots.txt are included.
