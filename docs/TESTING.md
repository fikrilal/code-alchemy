# Testing Guidelines

## Scope & Targets
- Priority: typed libraries (`src/lib/{env,markdown,github,spotify}.ts`) and MDX rendering utilities.
- Target coverage: 70%+ on libs; snapshot tests for a few representative MDX posts.

## Framework & Files
- Use **Vitest**. Filenames: `*.test.ts` or `*.spec.ts`.
- For MDX snapshots, compile with the same remark/rehype pipeline used in app code.

## Commands
- Unit tests: `npm run test`
- Watch mode: `npm run test:watch`
- Type check: `npm run typecheck` (tsc --noEmit)
- Lint: `npm run lint`

## Patterns
- Isolate server/client boundaries in tests; avoid rendering client islands unless necessary.
- Mock network calls in typed API libs (GitHub/Spotify) and assert Zod‑validated output shapes.
- Snapshot generated HTML from MDX for stability (be conservative to avoid flakiness).

## Examples
- Env: assert that missing vars throw at parse time.
- GitHub lib: mock GraphQL responses, assert revalidation settings and mapped fields.
- Markdown: verify headings are slugged/autolinked and code blocks are highlighted.
