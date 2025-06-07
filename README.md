This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local Setup

1. Install **Node.js 18+** and clone this repository.
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
- `SPOTIFY_REDIRECT_URI` – OAuth redirect URI configured in your Spotify dashboard.
- `SPOTIFY_REFRESH_TOKEN` – Refresh token used to fetch currently playing tracks.
- `GITHUB_TOKEN` – GitHub Personal Access Token for the `/api/githubStats` endpoint.
- `SMTP_HOST` – SMTP server host used for contact form.
- `SMTP_PORT` – SMTP server port.
- `SMTP_USER` – SMTP username for authentication.
- `SMTP_PASS` – SMTP password for authentication.
- `CONTACT_TO_EMAIL` – Destination address for contact form submissions.

## Deployment Notes

This project works out of the box on platforms like **Vercel** or any Node.js host. On Vercel, set the environment variables in the dashboard and the platform will run the build and start commands automatically. When self‑hosting, run `npm run build` followed by `npm start` and ensure the environment variables are available.
