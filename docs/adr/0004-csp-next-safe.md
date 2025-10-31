# ADR 0004: CSP via next-safe

## Context
We serve dynamic content and third-party assets. A strict Content Security Policy reduces XSS risk.

## Decision
Use `next-safe` (or equivalent) to set CSP and common security headers. Prefer nonce/hash-based script policies.

## Consequences
- Stronger security posture; may require whitelisting specific sources for analytics/fonts.
- Slight setup overhead for script nonces.
