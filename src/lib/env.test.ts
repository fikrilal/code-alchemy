import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { getGithubEnv, getSpotifyEnv } from "@/lib/env";

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe("env parsing", () => {
  it("parses spotify env when required values exist", () => {
    process.env.SPOTIFY_CLIENT_ID = "client-id";
    process.env.SPOTIFY_CLIENT_SECRET = "client-secret";
    process.env.SPOTIFY_REFRESH_TOKEN = "refresh-token";

    expect(getSpotifyEnv()).toEqual({
      SPOTIFY_CLIENT_ID: "client-id",
      SPOTIFY_CLIENT_SECRET: "client-secret",
      SPOTIFY_REFRESH_TOKEN: "refresh-token",
    });
  });

  it("throws when spotify env is incomplete", () => {
    delete process.env.SPOTIFY_CLIENT_ID;
    process.env.SPOTIFY_CLIENT_SECRET = "client-secret";
    process.env.SPOTIFY_REFRESH_TOKEN = "refresh-token";

    expect(() => getSpotifyEnv()).toThrow(/SPOTIFY_CLIENT_ID: Required/);
  });

  it("throws when github token is missing", () => {
    delete process.env.GITHUB_TOKEN;

    expect(() => getGithubEnv()).toThrow(/GITHUB_TOKEN: Required/);
  });
});
