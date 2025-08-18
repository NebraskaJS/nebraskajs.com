# NebraskaJS.com

The official website for the NebraskaJS community - a JavaScript user group based in Nebraska.

## 🏗️ Architecture

This site is built with:

- **[Astro](https://astro.build)** - Static site generator with server-side rendering
- **[TailwindCSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://typescriptlang.org)** - Type-safe JavaScript
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Deployment platform with server adapter

## 🔧 Key Features

- **Live Event Integration**: Real-time event data from Luma.com API using Astro's live content collections
- **Server-Side Rendering**: Configured for dynamic content with Cloudflare adapter
- **TypeScript**: Full type safety throughout the codebase
- **Custom Loaders**: `lumaLoader.ts` fetches event data from Luma API
- **Responsive Design**: TailwindCSS for mobile-first styling

## 🧞 Commands

All commands run from the project root:

| Command        | Action                                   |
| :------------- | :--------------------------------------- |
| `pnpm install` | Install dependencies                     |
| `pnpm dev`     | Start dev server at `localhost:4321`     |
| `pnpm build`   | Build production site with type checking |
| `pnpm preview` | Preview build locally                    |
| `pnpm format`  | Format code with Prettier                |

## 🌐 Environment Variables

Required for production:

- `LUMA_API_KEY` - API key for fetching events from Luma.com
- `DISCORD_INVITE_CODE` - Discord server invite code

## 🚀 Deployment

The site deploys automatically to Cloudflare Pages with server-side rendering enabled for dynamic event content.

## 🤝 Contributing

This is the community website for NebraskaJS. Join our [Discord](https://discord.gg/nebraskajs) or attend our [monthly meetups](https://lu.ma/nebraskajs) to get involved.

