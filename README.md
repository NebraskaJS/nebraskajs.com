# NebraskaJS.com

The official website for the NebraskaJS community - a JavaScript user group based in Nebraska.

## Architecture

This site is built with modern web technologies for optimal performance and developer experience:

- **[Astro 5.13](https://astro.build)** - Static site generator with component islands architecture
- **[TailwindCSS 4.1](https://tailwindcss.com)** - Utility-first CSS framework with Vite plugin integration
- **[TypeScript 5.6](https://typescriptlang.org)** - Full type safety with strictest configuration
- **Static Generation** - Fully static build with pre-rendered content

## Key Features

- **Event Integration**: Build-time event data fetching from Luma.com API using Astro content collections
- **Static Site Generation**: All content pre-rendered at build time for optimal performance
- **TypeScript**: Complete type safety with Zod schema validation for API data
- **Custom Loaders**: `staticLumaLoader.ts` fetches and validates event data during build
- **Responsive Design**: Mobile-first styling with custom TailwindCSS theme colors
- **Path Aliases**: Clean imports using `@/*` path mapping

## Getting Started

### Prerequisites

- Node.js 18+ or equivalent
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Starts the development server at `http://localhost:4321`

## Available Commands

| Command        | Action                                  |
| :------------- | :-------------------------------------- |
| `pnpm install` | Install dependencies                    |
| `pnpm dev`     | Start development server                |
| `pnpm start`   | Alias for `pnpm dev`                    |
| `pnpm build`   | Build for production with type checking |
| `pnpm preview` | Preview production build locally        |
| `pnpm format`  | Format code with Prettier               |

## Environment Variables

### Build Time

- `LUMA_API_KEY` - Required. API key for fetching events from Luma.com during build
- `PUBLIC_DISCORD_INVITE_CODE` - Optional. Discord server invite code displayed on homepage

### Configuration

Environment variables are loaded at build time. The Luma API is called during the build process to fetch event data, which is then statically generated into the site.

Example `.env` file:

```
LUMA_API_KEY=your_luma_api_key_here
PUBLIC_DISCORD_INVITE_CODE=your_discord_invite_code
```

## Project Structure

```
src/
├── components/          # Astro components
│   ├── Footer.astro
│   ├── Header.astro
│   ├── Hero.astro
│   └── MainEvent.astro  # Displays latest upcoming event
├── content/
│   └── config.ts        # Content collections configuration
├── css/
│   └── global.css       # TailwindCSS imports and theme
├── data/
│   └── metadata.json    # Site metadata
├── layouts/             # Page layouts
├── loaders/             # Custom content loaders
│   ├── lumaLoader.ts    # Live loader (not currently used)
│   └── staticLumaLoader.ts # Build-time event fetcher
├── pages/               # Astro pages
├── utils/
│   └── eventHelpers.ts  # Event filtering and sorting utilities
└── env.d.ts            # TypeScript environment declarations
```

## Luma Integration

The site integrates with Luma.com to display upcoming NebraskaJS events. Event data is fetched during the build process and statically generated into the site.

### Event Data Flow

1. **Build Time**: `staticLumaLoader.ts` fetches events from Luma API
2. **Validation**: Event data is validated against Zod schema in `content/config.ts`
3. **Storage**: Events are stored in Astro's content collection system
4. **Display**: `MainEvent.astro` component shows the next upcoming event
5. **Utilities**: `eventHelpers.ts` provides functions for filtering and sorting events

### Calendar Configuration

The site is configured to fetch events from the NebraskaJS calendar:

- Calendar ID: `cal-iLfUS8vuU4cGy9A`
- Events are automatically filtered to show upcoming meetups

## Styling

The site uses TailwindCSS 4 with a custom theme that includes JavaScript brand colors:

- `--color-js-yellow: #f0db4f` (JavaScript yellow)
- `--color-js-dark: #323330` (JavaScript dark)
- `--color-js-darker: #1a1a1a` (Darker variant)

## Deployment

The site is configured for static deployment and can be hosted on any static hosting platform:

- **Build Output**: Static files in `dist/` directory
- **Deployment**: Automatic deployment via CI/CD to hosting platform
- **Performance**: Fully pre-rendered for optimal loading speed

## Contributing

This is the community website for NebraskaJS. To contribute:

1. Join our [Discord community](https://discord.gg/JJaFMgscWf)
2. Attend our [monthly meetups](https://lu.ma/nebraskajs)
3. Submit issues and pull requests to improve the site
4. Follow our code formatting standards using `pnpm format`

### Development Guidelines

- Follow TypeScript strict mode requirements
- Use the existing component structure and styling patterns
- Test your changes locally with `pnpm build` before submitting
- Ensure all Prettier formatting rules are followed
