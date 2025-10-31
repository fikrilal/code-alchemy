# ADR 0003: Env Validation with Zod

## Context
Environment variables are critical for external APIs (Spotify, GitHub). Missing or malformed values cause runtime failures.

## Decision
Validate env in `src/lib/env.ts` using Zod. Parse once at startup; throw on invalid values.

## Consequences
- Fail fast in build/boot; fewer production surprises.
- Centralized, typed access to configuration.
