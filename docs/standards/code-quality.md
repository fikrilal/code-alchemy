# Code Quality Standard

This document defines the minimum code quality bar for Code Alchemy.

## Non-Negotiables

- TypeScript strict mode stays enabled.
- `any` is forbidden in source code.
- Linting is type-aware and treated as a correctness tool.
- Architectural boundaries are enforced automatically.
- Validation claims are only made when the commands were actually run.

## Linting

The lint configuration is intended to catch correctness issues, not stylistic debates.

Current focus areas:

- consistent type-only imports
- consistent type assertions
- no explicit `any`
- no floating promises
- no misused promises
- no unnecessary type assertions
- no unused variables, with `_` allowed for intentionally unused parameters

## Boundaries

Architecture rules are enforced by tooling, not only by review.

Minimum required check:

- `npm run deps:check`

## Verification

The default project gate is:

```bash
npm run verify
```

This runs:

```bash
npm run lint
npm run typecheck
npm run deps:check
npm run test
npm run build
```

## External Data

- Validate environment variables and untrusted external data at the boundary.
- Prefer explicit normalization and defensive fallbacks over trusting third-party payloads.
