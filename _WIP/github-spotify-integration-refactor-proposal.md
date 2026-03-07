# GitHub and Spotify Integration Refactor Proposal

## Context

The home page has two external-data widgets:

- GitHub activity
- Spotify now playing / recently played

Both work, but their engineering shape is uneven.

Recent work already fixed a real GitHub data bug: the code was reporting a bounded contribution range as if it were lifetime total. That fix improved correctness, but the modules still have structural issues around cache ownership, API contracts, duplication, and test coverage.

This proposal is intentionally about engineering quality, not visual redesign.

## Goals

- Make both integrations correct and explicit.
- Reduce duplication between route handlers, client fetchers, and server libs.
- Keep the design simple and local to this repo.
- Improve maintainability, readability, and testability.
- Avoid leaking secrets or introducing brittle client behavior.
- Keep the implementation incremental and reversible.

## Non-Goals

- No UI redesign.
- No generic “integration framework”.
- No database, queue, or persistent cache.
- No over-engineered domain model for two widgets.
- No auth/product changes.

## Current Problems

### 1. Cache ownership is ad hoc

GitHub and Spotify both use custom global in-memory caches, but the patterns are not consistently safe.

- GitHub cache was recently fixed, but still mixes cache ownership with fetching and aggregation.
- Spotify token cache is still fragile because the module reads a local snapshot while writing back through a separate global reference.

Impact:

- harder reasoning
- easier regressions
- unclear lifetime semantics

### 2. Route handlers duplicate env gating and error shaping

The route handlers currently check env presence and translate failures into generic JSON responses, while the server libs also validate env and throw errors.

Impact:

- duplicated responsibility
- multiple sources of truth
- inconsistent behavior risk

### 3. Client-side API consumption is weakly typed

The clients trust `res.json()` and then cast fields manually.

Impact:

- brittle boundary
- weaker refactors
- avoidable runtime ambiguity

### 4. GitHub module mixes too many responsibilities

`src/lib/github.ts` currently handles:

- GraphQL transport
- schema parsing
- year discovery
- year-range orchestration
- metric aggregation
- formatting
- in-memory cache policy

Impact:

- reduced readability
- harder focused testing
- poor separation of concerns

### 5. Spotify polling behavior is imperative and stale-prone

`SpotifyNowPlaying` manually fetches, parses, updates state, and schedules polling in `useEffect`.

Impact:

- duplicated client-fetch concerns
- stale UI after failed refresh
- inconsistent error handling compared with the GitHub widget

### 6. Tests cover happy paths better than failure paths

Coverage exists, but the highest-risk branches are still under-tested:

- cache reuse
- malformed remote payloads
- token refresh edge cases
- “no data” branches
- route-level status handling

## Engineering Principles

This refactor should explicitly follow:

- KISS: use small local modules, not a framework.
- YAGNI: do not build a general-purpose integration platform.
- DRY: centralize shared fetch and response parsing where duplication is real.
- SOLID:
  - single-purpose fetch/parsing functions
  - clear boundary between transport, mapping, and presentation
  - route handlers remain thin
- Explicitness over magic:
  - named response types
  - named cache policies
  - named fallbacks

## Proposed Target Design

### 1. Shared shape: thin route, typed server service, typed client consumer

For each integration:

- `src/lib/<integration>/schema.ts`
  - zod schemas for remote payloads and public API payloads
- `src/lib/<integration>/service.ts`
  - server-only orchestration
  - fetch external data
  - map to internal/public model
  - own cache policy
- `src/app/api/<route>/route.ts`
  - call service
  - return typed HTTP response
  - no duplicated env parsing logic
- `src/features/home/components/<Widget>.tsx`
  - use one shared typed fetcher pattern
  - render loading / unavailable / success explicitly

This is enough structure without becoming ceremony.

### 2. Standardize the public API contract

Both widgets should expose explicit response shapes.

Suggested GitHub response:

```ts
type GithubStatsResponse =
  | { status: "ok"; data: GithubStats }
  | { status: "unavailable" };
```

Suggested Spotify response:

```ts
type SpotifyNowPlayingResponse =
  | { status: "ok"; data: SpotifyPlayback }
  | { status: "unavailable" };
```

Benefits:

- clients do not infer meaning from `204`
- no unsafe `as string`
- simpler UI state handling

Note:

Keeping `204` is still acceptable if you want ultra-thin payloads, but the codebase will stay cleaner if the boundary is explicit JSON instead of mixed status-code semantics plus casts.

### 3. Centralize env access inside services

The route handler should not know whether the service requires one token or three secrets.

Preferred behavior:

- service decides whether env is available
- service returns `unavailable` result if intentionally disabled
- route handler serializes that result

Benefits:

- one source of truth
- less duplication
- easier local testing

### 4. Normalize cache ownership

Each service should own exactly one cache object and mutate that object directly.

Guidelines:

- avoid “read local snapshot, write separate global reference”
- use one cache key string if different parameter sets exist
- cache only mapped values, not raw transport payloads
- keep cache TTL decisions close to the service
- treat stale fallback as an explicit policy, not incidental behavior

Suggested cache utility shape:

```ts
type MemoryCache<T> = {
  value: T | null;
  expiresAt: number;
  key: string;
};
```

This utility should be local and tiny. Do not create a generic caching subsystem unless another integration actually needs it.

### 5. Split GitHub service into smaller units

Suggested internal structure:

- `fetchContributionYears(username)`
- `fetchContributionCalendar(username, from, to)`
- `aggregateGithubStats(calendars)`
- `formatGithubStats(stats)`
- `getGithubStats()`

Formatting should be the last step, not mixed into fetching and aggregation.

Example:

- raw service output can keep ISO dates internally
- public API output can format dates for UI if needed

That makes testing and reuse easier.

### 6. Simplify Spotify flow

Spotify should have two clear layers:

- token acquisition
- playback resolution

Suggested internal structure:

- `getSpotifyAccessToken()`
- `fetchCurrentPlayback(token)`
- `fetchRecentlyPlayed(token)`
- `resolveSpotifyPlayback()`

Then the public method:

- `getSpotifyPlayback()`

This removes branching noise from one large function and makes fallback behavior explicit.

### 7. Move Spotify widget to the same data-fetching pattern as GitHub

Right now GitHub uses SWR and Spotify uses manual polling.

Preferred direction:

- use SWR for Spotify too
- use one typed fetcher helper for internal API routes

Benefits:

- consistent client behavior
- deduping and revalidation handled centrally
- less imperative effect code

This is a meaningful cleanup, not abstraction for its own sake.

### 8. Add focused tests where the risk is real

Minimum new coverage:

- Spotify token cache reuse
- Spotify refresh fallback to recently played
- Spotify unavailable branch
- GitHub stale cache fallback after remote failure
- GitHub aggregation across multiple years
- route response behavior for unavailable and failure states

Do not chase high coverage numbers. Cover the decisions that can break production behavior.

## Recommended Implementation Strategy

### Phase 1: Correctness and boundary cleanup

- fix Spotify token cache semantics
- standardize route behavior
- add typed response schemas
- remove client-side unsafe casts

This phase gives the highest value with low risk.

### Phase 2: Service decomposition

- split GitHub orchestration into smaller private functions
- split Spotify playback resolution into smaller private functions
- keep public surface area unchanged where possible

This improves maintainability without changing user-facing behavior.

### Phase 3: Client consistency

- migrate Spotify widget to SWR
- align loading/unavailable/error handling with GitHub widget

This should happen only after the server contract is stable.

## Proposed File Shape

One pragmatic target:

```text
src/
  app/api/githubStats/route.ts
  app/api/spotify/route.ts
  lib/github/
    schema.ts
    service.ts
  lib/spotify/
    schema.ts
    service.ts
  lib/api/
    internal-fetch.ts
  features/home/components/
    GithubActivity.tsx
    SpotifyNowPlaying.tsx
```

Notes:

- keep this lightweight
- if splitting into folders feels like too much for now, use `github.ts` and `spotify.ts` plus a tiny shared `internal-fetch.ts`
- folderization is optional; explicit contracts are not

## Risks and Tradeoffs

### Risk: over-refactoring two small modules

Mitigation:

- stop after the service + contract cleanup if the code is already clear enough

### Risk: breaking local fail-soft behavior

Mitigation:

- preserve explicit “unavailable without secrets” behavior
- test the unavailable branch directly

### Risk: changing API shape and client together

Mitigation:

- do it in one branch with tests
- keep route handlers thin so changes stay easy to review

## Acceptance Criteria

The refactor should be considered done when:

- Spotify token caching works predictably
- env validation is not duplicated across route and lib boundaries
- both widgets consume typed API responses without manual field casting
- GitHub and Spotify services each have clear single-purpose internal functions
- stale data behavior is explicit, not accidental
- the current UX behavior still works
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

## Recommendation

Do this refactor.

It is justified because:

- there is at least one remaining real bug on the Spotify side
- the current shape has unnecessary duplication
- the proposed target is modest and local

Do not turn it into a broad architecture exercise. A focused cleanup of service boundaries, cache ownership, and typed API contracts is enough.
