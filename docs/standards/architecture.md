# Architecture Standard

This document captures the minimum architectural rules for the Code Alchemy codebase.

## Route Ownership

- `src/app` owns routes, layouts, metadata, and route handlers.
- Route files may compose from `src/features`, `src/components`, and `src/lib`.
- Code outside `src/app` must not import from `src/app`.

## Feature Ownership

- `src/features` owns domain- and page-specific logic and components.
- Feature code may depend on shared UI primitives in `src/components` and infrastructure in `src/lib`.
- Feature code must not import from `src/app`.

## Shared Components

- `src/components/ui` is for reusable primitives.
- `src/components/layout` is for shared site chrome.
- Shared components must not import from `src/app` or `src/features`.

## Infrastructure

- `src/lib` is for infrastructure and server-side integrations such as env parsing, external APIs, filesystem access, and cache helpers.
- `src/lib` must not import from `src/app` or `src/features`.

## Content

- `src/content` is the source of truth for authored MDX content.
- Public-facing content must not leak internal repo paths or implementation details.

## Enforcement

These boundaries are enforced with `dependency-cruiser` via:

- `npm run deps:check`

Every code change should also pass:

- `npm run verify`
