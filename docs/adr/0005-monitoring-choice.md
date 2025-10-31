# ADR 0005: Monitoring Choice

## Context
We want observability for previews and production with minimal setup.

## Decision
Use Vercel Monitoring by default (logs, errors, performance). Consider adding Sentry for deeper error tracking when needed.

## Consequences
- Quick visibility via Vercel; optional Sentry adds richer context.
- Additional env configuration if/when Sentry is enabled.
