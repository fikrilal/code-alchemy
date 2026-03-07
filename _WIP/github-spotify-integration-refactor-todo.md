# TODO: GitHub and Spotify Integration Refactor

## Goal

Implement the engineering proposal in `_WIP/github-spotify-integration-refactor-proposal.md` using small, reversible steps.

## Phase 1: Correctness and API Contract

- [ ] Fix Spotify token cache so reads and writes use the same cache object.
- [ ] Decide route contract:
  - [ ] keep `204`-based unavailable semantics, or
  - [ ] move to explicit JSON union responses
- [ ] Centralize env availability checks inside the GitHub service.
- [ ] Centralize env availability checks inside the Spotify service.
- [ ] Remove duplicated env gating from route handlers.
- [ ] Define explicit public response types for GitHub API responses.
- [ ] Define explicit public response types for Spotify API responses.
- [ ] Parse API responses in clients without unsafe `as string` field casting.

## Phase 2: Service Cleanup

- [ ] Split GitHub transport/parsing from aggregation logic.
- [ ] Extract GitHub aggregation into a dedicated pure function.
- [ ] Keep GitHub date formatting as a final mapping step.
- [ ] Split Spotify token acquisition from playback resolution.
- [ ] Extract Spotify “current vs recently played” fallback logic into separate functions.
- [ ] Make stale-cache fallback behavior explicit in both services.

## Phase 3: Client Consistency

- [ ] Decide whether Spotify should move to SWR for consistency with GitHub.
- [ ] If yes, replace manual interval polling in `SpotifyNowPlaying`.
- [ ] Align GitHub and Spotify widget handling for:
  - [ ] loading
  - [ ] unavailable
  - [ ] error
  - [ ] success

## Phase 4: Test Coverage

- [ ] Add Spotify test for token cache reuse.
- [ ] Add Spotify test for unavailable / disabled env behavior.
- [ ] Add Spotify test for empty recently-played response behavior.
- [ ] Add GitHub test for stale cache fallback after remote failure.
- [ ] Add route tests for GitHub status behavior.
- [ ] Add route tests for Spotify status behavior.

## Validation

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`

## Review Checklist

- [ ] No secrets exposed to client code.
- [ ] No duplicated env parsing logic remains across route and service boundaries.
- [ ] No manual JSON field casting remains in the widgets.
- [ ] Route handlers are thin and boring.
- [ ] Cache behavior is intentional and documented in code.
- [ ] Public API naming matches the actual metric semantics.
