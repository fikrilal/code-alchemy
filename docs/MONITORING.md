# Monitoring & Observability

## Vercel Monitoring (Default)
- Enabled for Preview and Production. Use it to inspect logs, errors, and performance.
- Tag logs with route and feature when helpful.

## Optional: Sentry
- Add Sentry for deeper error tracking.
- Configure DSN via env (Preview/Prod), and initialize in server/client entry points as needed.
- Redact PII and secrets; avoid logging tokens.

## Error Taxonomy
- Group by feature (blog, work, api) and type (validation, network, render).
- Include request id, route, and user agent where safe.

## Performance Guidelines
- Keep client islands small; dynamically import heavy widgets below the fold.
- Use `next: { revalidate }` and/or `cache()` for external data to reduce latency.
