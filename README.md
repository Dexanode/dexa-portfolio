# dexa-portfolio

Personal portfolio for 0xDexa. It is a static [Next.js](https://nextjs.org) site using the App Router.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

`next.config.ts` sets `output: 'export'`. The build writes the static site to the `out/` directory. There is no Node server, API route, or server-only feature.

## Deploy on Vercel

This repository is ready to import. It is not deployed from here.

In the Vercel project settings:

- Framework: Next.js
- Build command: `npm run build`
- Output directory: `out`
- Install command: `npm install`

The output directory is `out` because the Next.js config uses static export (`output: 'export'`). Point the project at this repository, leave the production branch as `main` after the site is merged, and deploy from the Vercel dashboard. No environment variables are required.
