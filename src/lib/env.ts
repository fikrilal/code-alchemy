import { z } from "zod";

const EnvSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string().min(1, "Missing SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: z.string().min(1, "Missing SPOTIFY_CLIENT_SECRET"),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1, "Missing SPOTIFY_REFRESH_TOKEN"),
  SPOTIFY_REDIRECT_URI: z.string().url("Invalid SPOTIFY_REDIRECT_URI"),
  GITHUB_TOKEN: z.string().min(1, "Missing GITHUB_TOKEN"),
});

export const env = EnvSchema.parse({
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

export type Env = z.infer<typeof EnvSchema>;
