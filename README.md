This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Setup

1. Install **Node.js 22 LTS** and clone this repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file and populate it with the environment variables shown below.
4. Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

Run `npm run lint` to execute ESLint checks during development.
Run `npm run typecheck` to validate TypeScript types.
Run `npm run test` to execute the automated test suite.

## Architecture

This project uses a server-first Next.js App Router architecture with feature-based organization.

- `src/app` contains routes, layouts, metadata, and route handlers.
- `src/features` contains page/domain-specific components and logic for home, about, blog, work, and MDX support.
- `src/components/ui` contains reusable UI primitives.
- `src/components/layout` contains shared site chrome such as navbar/footer.
- `src/lib` is reserved for infrastructure and cross-cutting utilities such as env parsing and external API integrations.
- `src/content` contains MDX content for blog posts and work case studies.

Guiding rule: route-specific or domain-specific code should live in the owning feature folder, while only truly shared primitives and layout components belong in top-level shared component folders.

Route-local colocation is a fallback, not the default. If a helper is truly private to a single route segment, keep it under a private folder inside `src/app`, such as `_components`, `_lib`, or `_data`. Do not create public `components` or `lib` folders under `src/app`.

## Building

Create an optimized production build with:

```bash
npm run build
```

The generated output can be served locally using `npm start` or deployed to your preferred hosting provider.

## Running in Production

After building, start the Next.js server:

```bash
npm start
```

Ensure all required environment variables are available in the environment where the server runs.

## Environment Variables

Configure the following variables in `.env.local` (or your production environment):

- `SPOTIFY_CLIENT_ID` – Spotify application client ID used for authentication.
- `SPOTIFY_CLIENT_SECRET` – Spotify application client secret.
- `SPOTIFY_REFRESH_TOKEN` – Refresh token used to fetch currently playing tracks.
- `GITHUB_TOKEN` – GitHub Personal Access Token for the `/api/githubStats` endpoint.

## Deployment Notes

This project works out of the box on platforms like **Vercel** or any Node.js host. On Vercel, set the environment variables in the dashboard and the platform will run the build and start commands automatically. When self‑hosting, run `npm run build` followed by `npm start` and ensure the environment variables are available.
