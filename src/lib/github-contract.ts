import { z } from "zod";

export const GithubStatsSchema = z.object({
  lifetimeContributions: z.number(),
  lastContributionDate: z.string().nullable(),
  longestStreak: z.number(),
});

export type GithubStats = z.infer<typeof GithubStatsSchema>;

export const GithubStatsApiResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("ok"),
    data: GithubStatsSchema,
  }),
  z.object({
    status: z.literal("unavailable"),
  }),
  z.object({
    status: z.literal("error"),
    message: z.string(),
  }),
]);

export type GithubStatsApiResponse = z.infer<
  typeof GithubStatsApiResponseSchema
>;
