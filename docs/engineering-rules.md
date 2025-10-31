# Engineering Rules

Scope: Next.js (App Router) + TypeScript + MDX + Tailwind.
These rules are pragmatic, enforceable, and tailored to this repo.

## Philosophy
- Server-first: push logic to the server; keep client islands small.
- Typed boundaries: TypeScript everywhere, Zod at runtime for env and external data.
- Content-first: MDX for posts; allow only whitelisted components.
- Small, reversible changes: prefer incremental PRs with clear acceptance criteria.

## TypeScript
- No any. Prefer `unknown`, generics, or Zod-validated types.
- Avoid non-null assertion (`!`) and unchecked assertions; use narrowing and `satisfies`.
- Prefer `type` aliases over `interface` for consistency and union ergonomics.
- Use discriminated unions for variants; avoid enum in favor of union literals.
- Enable strictness flags (see tsconfig baseline below).
- Keep `as const` and `satisfies` to preserve inference on config objects.

## React & Next.js
- Server by default; add `"use client"` only when interactivity is required.
- Data fetching and heavy transforms in server components or route handlers.
- Use `next/image` for images (proper `sizes`, avoid layout shift). Avoid raw `<img>` unless necessary.
- Do not use `dangerouslySetInnerHTML` for content; render MDX as React elements.
- Keep components focused (one responsibility); prefer named exports.

## MDX Content
- MDX for blog (and optionally work) content under `content/`.
- Compile via `next-mdx-remote/rsc` with: `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `rehype-pretty-code` (Shiki).
- Map markdown `img` to a wrapper that internally uses `next/image` where feasible.
- Allow only whitelisted components in MDX; no network fetches from MDX at runtime.

## Data, Env, and APIs
- Validate env with Zod at startup in `src/lib/env.ts`.
- Wrap external APIs in typed libs (`src/lib/{spotify,github}.ts`) with Zod response schemas.
- API routes are thin: call typed libs, map errors, and set cache/revalidate.
- Never expose secrets to the client; only `NEXT_PUBLIC_*` may be read in client code.
- Use `fetch` caching/revalidation (`next: { revalidate: N }`) or `cache()` for stable data.

## Performance
- Minimize client JS: isolate framer-motion and interactive widgets into small islands.
- Use dynamic import for heavy client-only widgets when not above the fold.
- Prefer SSG/ISR for blog; pre-generate static params and metadata.
- Optimize media: correct `sizes`, compress assets; avoid massive unoptimized SVGs.

## Accessibility
- Semantic HTML; proper headings, labels, `alt` text; maintain focus states.
- Keyboard navigability for all interactive elements.
- Lint with `eslint-plugin-jsx-a11y`.

## Security
- No raw HTML rendering. If unavoidable, sanitize with `rehype-sanitize`.
- Don’t log secrets. Keep server logs concise and non-sensitive.
- Use CORS only where needed (rare for same-origin Next apps).

## Styling
- Tailwind as the primary styling method.
- Use `@tailwindcss/typography` for post content; keep global CSS minimal (tokens, resets).
- Prefer utility classes over bespoke CSS; extract UI primitives into `src/components/ui`.

## Testing & Validation
- Type-check in CI (`tsc --noEmit` or `next build`).
- Add targeted unit tests for typed libs (MDX compile utils, API schemas, date utils) using Vitest or Jest (optional but recommended).
- Snapshot a few MDX posts to catch rendering regressions (optional).

## Git & Reviews
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`.
- Small PRs aligned to migration phases, each with acceptance criteria.
- Require review for client/server boundary changes and lint rule changes.

## ESLint & Formatting
- Base: `next/core-web-vitals`, `@typescript-eslint`, `jsx-a11y`.
- Key rules to enforce:
  - `@typescript-eslint/no-explicit-any: error`
  - `@typescript-eslint/no-floating-promises: error`
  - `@typescript-eslint/no-misused-promises: error`
  - `@typescript-eslint/consistent-type-definitions: ["error", "type"]`
  - `@typescript-eslint/consistent-type-imports: "error"`
  - `import/order: ["error", { "groups": ["builtin","external","internal","parent","sibling","index","object","type"], "newlines-between": "always" }]`
  - `react-hooks/rules-of-hooks: error`
  - `react-hooks/exhaustive-deps: warn`
  - `jsx-a11y/recommended`
- Optional: Prettier for formatting; if adopted, integrate with ESLint and lint-staged.

## tsconfig Baseline (strict)

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "useUnknownInCatchVariables": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "incremental": true,
    "allowJs": true,
    "checkJs": false,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["./src", "next-env.d.ts"],
  "exclude": ["node_modules"]
}
```

## Example ESLint Config Additions (snippet)

```js
// eslint.config.mjs (illustrative additions)
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // ...existing next/core-web-vitals config
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: { parser: tsparser },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error','type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/order': ['error', { groups: ['builtin','external','internal','parent','sibling','index','object','type'], 'newlines-between': 'always' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
```

---

Questions or changes you want to make to these rules before I wire up enforcement in ESLint/tsconfig?

