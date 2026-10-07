# TWD Project Patterns

## Project Configuration

- **Framework**: React 19 + React Router 7 (data router, `createBrowserRouter`)
- **Vite base path**: /
- **Dev server port**: 5173
- **App URL**: http://localhost:5173
- **Dev command**: npm run dev
- **Default branch**: main
- **Entry point**: src/main.tsx
- **Public folder**: public/
- **Test location**: src/twd-test/
- **Closing run**: full suite

TWD is wired through the `twd()` Vite plugin in `vite.config.ts` (and `twdRemote()` for twd-relay) — there is no TWD code in `src/main.tsx`.

### Runner Commands

twd-cli drives its own headless browser — only the dev server has to be up (`npm run dev`).

```bash
# Run all tests
npm run test:ci

# Run specific tests by name (matches "suite > test", case-insensitive; repeatable)
npx twd-cli run --test "should render the list"
npx twd-cli run --test "should create" --test "should show the error"

# Only the tests this branch added or changed
npx twd-cli run --changed-since origin/main

# Record a run to video (one clip per matched test, needs ffmpeg)
npx twd-cli run --record --test "should render the list"
```

Every run writes `.twd/report/`: `run.json` (the result), `summary.md` and `index.html`. The folder is replaced on each run.

## Standard Imports

```typescript
import { twd, userEvent, screenDom, expect } from "twd-js";
import { describe, it, beforeEach, afterEach } from "twd-js/runner";
import { defaultMocks } from "./authUtils"; // authenticated-session mocks
```

## Visit Paths

```typescript
await twd.visit("/");
await twd.visit("/login");
```

## Standard beforeEach / afterEach

```typescript
beforeEach(() => {
  twd.clearRequestMockRules();
});

afterEach(() => {
  twd.clearRequestMockRules();
});
```

## API Service Types

Service/API types are located in: `src/api/` (axios client in `client.ts`, `auth.ts`, `notes.ts`)

Read files in this folder to understand endpoint URLs and response shapes when writing mock data.

## CSS / Component Library

- **Library**: Tailwind CSS 4 + shadcn/ui (`src/components/ui/`)
- **Docs**: https://ui.shadcn.com/docs/components

When writing tests, refer to library docs for correct ARIA roles and component structure.

## Third-Party Modules

"Test what you own, mock what you don't." These external modules should be stubbed in tests:

| Module | Import Pattern | Stub Strategy |
|--------|---------------|---------------|
| Auth0 (via the BFF in `backend-service/`) | No Auth0 SDK in the frontend — the session is an HttpOnly cookie and the app calls `GET /api/me` (`src/api/auth.ts`) | Mock the network, not a module: `defaultMocks()` in `src/twd-test/authUtils.ts` mocks `me` (`/api/me`, 200 + user) and `getNotes` (`/api/notes`). For the logged-out state mock `/api/me` with `401`. No Sinon needed. |

Existing tests register `defaultMocks()` (or a 401 `me` mock) before `twd.visit(...)`, then `await twd.waitForRequests(['me', 'getNotes'])`. The login link points at `/auth/login` (a BFF route) — assert its `href`, never follow it.

## Portals and Dialogs

Use `screenDomGlobal` instead of `screenDom` for elements rendered in portals (modals, dropdowns, tooltips):

```typescript
import { screenDomGlobal } from "twd-js";
const modal = screenDomGlobal.getByRole("dialog");
```
