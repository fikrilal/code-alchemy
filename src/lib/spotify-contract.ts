import { z } from "zod";

export const SpotifyTrackSchema = z.object({
  name: z.string(),
  artist: z.string(),
  albumImage: z.string().url(),
  spotifyUrl: z.string().url(),
});

export const SpotifyPlaybackSchema = z.object({
  item: SpotifyTrackSchema,
  isLastPlayed: z.boolean(),
});

export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>;
export type SpotifyPlayback = z.infer<typeof SpotifyPlaybackSchema>;

export const SpotifyPlaybackApiResponseSchema = z.discriminatedUnion(
  "status",
  [
    z.object({
      status: z.literal("ok"),
      data: SpotifyPlaybackSchema,
    }),
    z.object({
      status: z.literal("unavailable"),
    }),
    z.object({
      status: z.literal("error"),
      message: z.string(),
    }),
  ]
);

export type SpotifyPlaybackApiResponse = z.infer<
  typeof SpotifyPlaybackApiResponseSchema
>;
