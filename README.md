# BorgBase Documentation

Has the content of [docs.borgbase.com](https://docs.borgbase.com). Feel free to open a pull request if you notice any mistake or would like to add something.

## Setup
- Node.js 24 (pinned in `.node-version`; on Fedora: `dnf install nodejs24`)
- pnpm (version pinned in `package.json`)
- Install dependencies: `pnpm install`

## Develop
- Dev server: `pnpm dev` (http://localhost:4321)
- Production build: `pnpm build` (output in `dist/`, also validates internal links)
- Preview the build: `pnpm preview`

Pages live in `src/content/docs/`. Sidebar structure is set in `astro.config.mjs`, ordering per page via `sidebar.order` front matter. Use `.mdx` only for pages that need components like `<Tabs>`.

## Deployment
Cloudflare Pages: build command `pnpm run build`, output directory `dist`. Redirects are in `public/_redirects`.

## Credits
- Framework: [Starlight](https://starlight.astro.build)
- Colors: [Material colors](https://vuetifyjs.com/en/framework/colors#colors)
