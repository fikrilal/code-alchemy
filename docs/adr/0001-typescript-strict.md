# ADR 0001: TypeScript Strict Mode

## Context
We need strong type safety across server/client boundaries and external integrations.

## Decision
Adopt TypeScript with strict settings (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.). Allow JS during migration (`allowJs: true`) and convert incrementally.

## Consequences
- Fewer runtime errors; clearer contracts.
- Some refactors needed to satisfy the compiler.
