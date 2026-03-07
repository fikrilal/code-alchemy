# Agent Instructions

This file is for coding agents working in this repository. Keep it short, durable, and action-oriented.

Project facts, setup steps, and command details belong in `README.md` and `package.json`. Do not turn this file into a second README.

## Core Engineering Principles

- KISS: prefer the smallest correct solution.
- YAGNI: do not add abstractions, dependencies, or configuration for hypothetical future needs.
- DRY: remove duplication when it creates real maintenance cost; do not force premature abstraction.
- SOLID: keep responsibilities narrow, depend on stable boundaries, and separate UI, domain, and infrastructure concerns.
- Explicitness over magic: prefer obvious control flow, readable data flow, and clear ownership.
- Reversible changes: default to small diffs that are easy to review, test, and revert.

## Project Architecture Constraints

- Preserve the server-first Next.js App Router design.
- `src/app` owns routes, layouts, metadata, and route handlers.
- `src/features` owns domain- and page-specific logic and components.
- `src/components/ui` is for reusable primitives; `src/components/layout` is for shared site chrome.
- `src/lib` is for infrastructure and server-side integrations such as env parsing, filesystem access, and external API clients.
- `src/content` is the source of truth for blog and work MDX content.
- Keep public-facing content free of internal repo paths like `docs/...`, local filesystem paths, or source-file references.

## Coding Standards

- TypeScript strict. Avoid `any`; use proper types, narrowing, generics, or runtime validation.
- Validate environment variables and external data at the boundary with Zod or equivalent runtime checks.
- Default to server components. Add `"use client"` only for real interactivity or browser-only APIs.
- Use `next/image` with correct `sizes`; avoid raw `<img>` unless there is a concrete reason.
- Do not use `dangerouslySetInnerHTML` for authored content.
- Prefer existing repo patterns over introducing parallel architectural styles.

## Workflow

- Read `README.md`, `package.json`, and the touched code before making changes.
- Prefer small, focused, reversible changes. Do not mix speculative refactors into the requested task.
- Check whether a utility, component, or pattern already exists before adding a new one.
- When touching routing, build config, environment handling, external APIs, or public content, call out risk explicitly.
- If a rule becomes long, task-specific, or fast-moving, move it out of `AGENTS.md` rather than bloating this file.

## Validation

- For code changes, run the relevant checks from `package.json`.
- Default full gate: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
- For docs-only or content-only changes, skip heavy checks only when they add no signal; state what was skipped.
- Never claim validation passed unless it was actually run.

## Source Quality

- For version-sensitive or current facts, prefer official docs, release notes, and primary sources over third-party summaries.
- Keep `AGENTS.md` focused on durable agent behavior. Operational detail belongs in `README.md`; one-off plans do not belong here.

## SCM

- Use Conventional Commits when committing.
- Do not commit unless the user asks.
- Never use destructive git operations without explicit permission.
