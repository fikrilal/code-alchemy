import { z } from "zod";

const SpotifyEnvSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string().min(1, "Missing SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: z.string().min(1, "Missing SPOTIFY_CLIENT_SECRET"),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1, "Missing SPOTIFY_REFRESH_TOKEN"),
});

const GithubEnvSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, "Missing GITHUB_TOKEN"),
});

const EnvSchema = SpotifyEnvSchema.merge(GithubEnvSchema);

export type Env = z.infer<typeof EnvSchema>;
export type SpotifyEnv = z.infer<typeof SpotifyEnvSchema>;
export type GithubEnv = z.infer<typeof GithubEnvSchema>;

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

export function getSpotifyEnv(): SpotifyEnv {
  return parseEnv(SpotifyEnvSchema, "Spotify");
}

export function getGithubEnv(): GithubEnv {
  return parseEnv(GithubEnvSchema, "GitHub");
}
