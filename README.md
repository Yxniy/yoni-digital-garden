# Yoni's Digital Garden — Living Resume

A headless digital garden: **Notion** (source of truth) → **sync script** → **Markdown** → **Astro** → **GitHub Pages**. Built to demonstrate automated data pipelines and cloud-native practices.

## Quick start

```bash
npm install
npm run dev
```

- **Sync from Notion:** `NOTION_API_KEY=your_key npm run sync-notion` (then build or dev)
- **Build:** `npm run build`
- **Preview:** `npm run preview`

## Project structure

```
├── scripts/
│   └── sync-notion.js    # Fetches Notion DB → Markdown in src/content/blog/
├── src/
│   ├── content.config.ts # Blog collection (glob loader)
│   ├── content/
│   │   └── blog/         # Synced Markdown (from Notion)
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro   # Home + Networking Research section
│   │   └── blog/         # Blog index + [slug]
│   └── styles/
│       └── global.css    # Dark, minimal, cloud-native theme
├── .github/workflows/
│   └── deploy.yml        # On push to main: sync Notion → build → GitHub Pages
├── astro.config.mjs
└── package.json
```

## Notion setup

1. Create an [integration](https://www.notion.so/my-integrations) and copy the **Internal Integration Token**.
2. Share your database (ID: `318b5575fd4080028428ff565b9cc698`) with that integration.
3. Locally: `NOTION_API_KEY=secret npm run sync-notion`
4. CI: In the repo **Settings → Secrets and variables → Actions**, add `NOTION_API_KEY`.

## GitHub Pages

- **Project site:** `https://yxniy.github.io/yoni-digital-garden`  
  `astro.config.mjs` uses `base: '/yoni-digital-garden'`. If your repo name differs, change `base` and the workflow.
- **User/org site:** If the repo is `username.github.io`, set `base: '/'` in `astro.config.mjs` and adjust the workflow if needed.

Enable Pages: **Settings → Pages → Source:** GitHub Actions.

## Styling

- Dark mode, minimal, “cloud-native” look.
- Dedicated **Networking Research** section on the homepage (links to blog).
- Typography: Inter + JetBrains Mono.
