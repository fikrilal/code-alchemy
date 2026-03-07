import "server-only";

import { z } from "zod";

const requiredString = (name: string) =>
  z.string(`Missing ${name}`).min(1, `Missing ${name}`);

const SpotifyEnvSchema = z.object({
  SPOTIFY_CLIENT_ID: requiredString("SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: requiredString("SPOTIFY_CLIENT_SECRET"),
  SPOTIFY_REFRESH_TOKEN: requiredString("SPOTIFY_REFRESH_TOKEN"),
});

const GithubEnvSchema = z.object({
  GITHUB_TOKEN: requiredString("GITHUB_TOKEN"),
});

export type SpotifyEnv = z.infer<typeof SpotifyEnvSchema>;
export type GithubEnv = z.infer<typeof GithubEnvSchema>;
export type Env = SpotifyEnv & GithubEnv;

function parseEnv<T extends z.ZodTypeAny>(schema: T, scope: string): z.infer<T> {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid ${scope} environment configuration. ${details}`);
  }
  return parsed.data;
}

function hasEnv<T extends z.ZodTypeAny>(schema: T): boolean {
  return schema.safeParse(process.env).success;
}

export function getSpotifyEnv(): SpotifyEnv {
  return parseEnv(SpotifyEnvSchema, "Spotify");
}

export function getGithubEnv(): GithubEnv {
  return parseEnv(GithubEnvSchema, "GitHub");
}

export function hasSpotifyEnv(): boolean {
  return hasEnv(SpotifyEnvSchema);
}

export function hasGithubEnv(): boolean {
  return hasEnv(GithubEnvSchema);
}
