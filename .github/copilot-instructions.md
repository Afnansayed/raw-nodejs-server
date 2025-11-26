# Copilot Instructions for this repository

**Purpose:** Short, practical guidance so an AI coding agent can start contributing immediately.

**Big Picture:**
- **Server:** `src/server.ts` creates an HTTP server with Node's `http` module and dispatches requests by exact method+path lookup.
- **Routing:** `src/helpers/RoutesHandler.ts` exports `addRoute(method, path, handler)` and a `routes: Map<string, Map<string, RouteHandler>>` used by `server.ts` to find handlers.
- **Routes registration:** `src/routes/index.ts` (and any file that imports `addRoute`) is where route handlers are registered. Handlers receive raw `IncomingMessage` and `ServerResponse`.
- **Helpers:** Reusable utilities live in `src/helpers/`:
  - `parseBody.ts` — collects request body and returns parsed JSON (or `{}` when empty).
  - `sendJson.ts` — convenience to set JSON headers and end the response.
  - `fileDB.ts` — simple file-based persistence reading/writing `src/data/users.json` using sync fs calls.
  - `dynamicRouteHandler.ts` — currently empty/placeholder (no dynamic path matching is implemented).

**Data flow example (POST /api/user):**
- Client -> POST `/api/user` handled in `src/routes/index.ts`.
- Handler uses `parseBody(req)` -> reads `src/data/users.json` via `readUsers()` -> modifies array -> `writeUsers()` -> returns JSON via `sendJson(res, 200, {...})`.

**Key project-specific conventions & constraints:**
- Routing is exact-match only (method and path). Do not assume Express-style params or wildcard matching unless `dynamicRouteHandler.ts` is implemented.
- Handlers must work with Node's low-level `IncomingMessage`/`ServerResponse` types; use `parseBody` and `sendJson` helpers instead of re-implementing header handling.
- Persistence is file-based (`src/data/users.json`) and uses synchronous fs APIs — expect blocking IO in current code.
- Environment config is in `.env` and loaded by `src/confiq/index.ts`. `config.port` is read from `process.env.PORT`.

**How to run / debug:**
- Local dev with auto-reload: `npm run dev` (uses `ts-node-dev --respawn --transpile-only ./src/server.ts`).
- Build compiled JS: `npm run build` (runs `tsc`). There are no test scripts in `package.json`.
- Debugging: use console.log or set breakpoints in `src/server.ts` and route handlers; inspect `routes` map to verify registered handlers.

**When editing routes or handlers:**
- Prefer adding routes via `addRoute('GET'|'POST', '/path', handler)` so registrations remain centralized and discovered by `server.ts`.
- Use `sendJson(res, status, payload)` for consistent JSON responses.
- Use `parseBody(req)` for POST/PUT JSON parsing; it rejects on invalid JSON.

**Examples (copyable):**
```ts
// register a route
addRoute('GET', '/health', (req, res) => sendJson(res, 200, { ok: true }));

// post handler using helpers
addRoute('POST', '/api/user', async (req, res) => {
  const body = await parseBody(req);
  const users = readUsers();
  users.push(body);
  writeUsers(users);
  sendJson(res, 200, { success: true, data: body });
});
```

**What an AI agent should NOT change without explicit instruction:**
- Do not replace the simple routing system with a framework (Express) unless asked — keep raw `http`-based approach consistent.
- Avoid changing sync file IO to async globally without checking for intended behavior/performance requirements.

If anything in the repository is unclear or you'd like the agent to follow stricter rules (for example: implement dynamic routes, convert file DB to async or a real DB, or add tests), tell me which direction to take and I will update these instructions.
