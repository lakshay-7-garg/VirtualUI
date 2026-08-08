# VirtualUI — Architecture & Design Report

Date: 2026-08-08

This document describes the VirtualUI project implementation based on the repository contents. It is intended to be a single-source overview for engineers and reviewers unfamiliar with the codebase.

---

## 1. Executive Summary

VirtualUI is a full-stack application that combines an interactive React frontend, an Express/MongoDB backend, an AI-driven component generator (via OpenRouter), a private component library build/publish flow (`virtual-ui-lib`), and payment integration (Razorpay) for purchasing AI credits. Users can sign in with Google (Firebase) to generate React components with AI, preview them live, save them to a DB, and (for admin accounts) publish components to npm automatically from the server.

Key capabilities:

- AI generation of React components (JSON-wrapped code + metadata)
- Live in-browser preview of generated components (`react-live` sandbox)
- Save / manage components (MongoDB models)
- Admin-only publish pipeline: inject component into `virtual-ui-lib`, build with `tsup`, bump version, and `npm publish` (via child_process)
- Payment flow for credits (Razorpay)
- Google sign-in via Firebase + server-issued JWT session cookie

---

## 2. Problem Statement

Provide an easy way to create production-ready React components using an AI assistant, preview them, persist them, and publish reusable components to an npm package — all with minimal friction for designers and engineers.

The system must: generate valid React JSX, protect actions with authentication/roles, control AI usage via credits, and automate the library build/publish steps while surfacing meaningful errors to users.

---

## 3. Project Goals and Objectives

- Allow authenticated users to generate UI components with AI and preview them live.
- Control generation usage via consumable AI credits for non-admin users.
- Let admins save and publish components as part of a shared npm package.
- Keep the library build process reproducible and simple (using `tsup`).
- Provide payment flow to purchase credits (Razorpay).

---

## 4. High-Level Architecture

Components:

- Frontend: `virtual-ui-client` (React, Vite, Redux)
- Backend API: `virtual-ui-server` (Express, Mongoose)
- Component Library: `virtual-ui-lib` (package built via `tsup`, published to npm)
- Database: MongoDB (connection via `mongoose`)
- AI Service: OpenRouter.ai (chat completions endpoint)
- Authentication: Firebase (client-side Google sign-in) with server-issued JWT cookie
- Payments: Razorpay (server-side order creation and verification)

Communication:

- Frontend ↔ Backend: HTTP REST API (axios, cookie-based JWT auth)
- Backend ↔ MongoDB: Mongoose models
- Backend ↔ OpenRouter: axios POST to OpenRouter API
- Backend ↔ npm registry: executes `npm publish` as a child process in `virtual-ui-lib` folder

Diagram (textual):
Frontend (React) -> Backend (Express) -> MongoDB
↘ OpenRouter (AI)
↘ npm registry (publish)
↘ Razorpay (payments)

---

## 5. Low-Level Architecture (module-wise)

virtual-ui-client (frontend)

- `src/main.jsx` — app bootstrap, router, Redux provider
- `src/App.jsx` — top-level routes and initial data fetches
- `src/pages/*` — UI views: `Home`, `ComponentGenerator`, `Componentspage`, `AdminDashboard`, `MyComponentsPage`, `Pricingpage`
- `src/components/*` — shared UI components (Auth modal, LiveComponentPreview, etc.)
- `src/redux/userSlice.js` — central user state: `userData`, `allUsers`, `allcomponents`
- `src/utils/firebase.js` — Firebase config (client) used to sign in with Google

Key client flows:

- Sign in with Google (Firebase) -> POST `/api/auth/googlesignup` -> server sets JWT cookie and returns user object
- Logged-in user: `App` fetches `/api/user/currentuser` then `/api/user/all-users` and `/api/component/all-components`
- Component generation: `ComponentGenerator` POST `/api/component/generate` (requires token) -> server uses OpenRouter
- Save component: POST `/api/component/save` -> server stores component in MongoDB
- Publish: POST `/api/component/publish` -> server-side logic performs build and `npm publish`

virtual-ui-server (backend)

- `index.js` — express app, cors config (origin: http://localhost:5173), body parser, cookie parser, route wiring
- `configs/connectDB.js` — mongoose connection helper (reads `process.env.MONGODB_URL`)
- `configs/token.js` — JWT creation helper
- `controllers/*` — controllers for auth, user, components, payment
  - `component.controller.js` — generate (OpenRouter), save, publish pipeline (component injection, build, version bump, publish)
  - `auth.controller.js` — googleSignup (creates/looks up user, signs JWT cookie), logout
  - `payment.controller.js` — createOrder, verifyPayment (Razorpay HMAC validation)
- `models/*` — Mongoose models for `User`, `Component`, `Payment`
- `middlewares/isAuth.js` — reads `req.cookies.token`, jwt.verify, sets `req.userId`
- `utils/openRouter.js` — adapter for OpenRouter API (uses `process.env.OPENROUTER_API_KEY`)
- `utils/razorpay.js` — Razorpay client configured with env vars

virtual-ui-lib (component library)

- `package.json` — package metadata (note: name uses `virtual-ui-componenet-library`)
- `src/index.js` — central export file that re-exports all components
- `tsup.config.js` — build config to produce `cjs`/`esm` bundles

Publish pipeline (server-side):

1. Backend receives publish request (admin-only enforced)
2. Writes component file under `../virtual-ui-lib/src/components/<ComponentName>/<ComponentName>.jsx`
3. Appends an `export` line in `virtual-ui-lib/src/index.js` (if missing)
4. Removes `dist` folder if present
5. Runs `npm run build` (in `virtual-ui-lib`) — `tsup` generates `dist` (esm + cjs)
6. Runs `npm version patch --no-git-tag-version` inside `virtual-ui-lib`
7. Runs `npm publish --access public` inside `virtual-ui-lib` (child process `execSync`)
8. On success: update component visibility to `public` and set `npmPackage` on DB record

---

## 6. Technology Stack (concise)

- Frontend: React (18+), Vite, Redux Toolkit, Framer Motion, react-live
- Backend: Node.js (ES modules), Express, Mongoose (MongoDB)
- AI: OpenRouter API (model: deepseek/deepseek-chat)
- Payments: Razorpay
- Auth: Firebase (client) + server JWT cookie
- Packaging: tsup
- Publishing: npm registry (child_process invocation)

---

## 7. End-to-End Execution Flow (detailed)

1. App start (developer): run backend (`npm run dev` in `virtual-ui-server`) and frontend (`npm run dev` in `virtual-ui-client`). Backend connects to MongoDB using `MONGODB_URL`.
2. Frontend loads `App`, calls `/api/user/currentuser` with credentials to detect logged-in user from JWT cookie.
3. If logged in, frontend fetches `/api/user/all-users` and `/api/component/all-components` and hydrates Redux state.
4. User clicks `Generate` (ComponentGenerator): frontend posts prompt to `/api/component/generate`.
   - Backend controller builds a message array (system + user prompt) and calls `askAI()`.
   - `askAI` forwards messages to OpenRouter; response must be JSON object string containing `name`, `code`, `props`.
   - Backend parses AI output; if valid, deducts 50 credits (for `role === 'user'`) or leaves admin unaffected, and returns parsed component to frontend.
5. Frontend shows live preview using `react-live` and allows modifications.
6. Save: frontend POST `/api/component/save` with `{ name, code, props }` — server creates DB record with `owner = req.userId`.
7. Publish (admin only): frontend POST `/api/component/publish` with `{ componentId }`.
   - Server validates `req.userId` is admin and also owner of the component (both checks required).
   - Server writes file(s) and runs the build/publish steps described previously.
   - On success, server updates DB (`visibility = 'public'`, `npmPackage = 'virtual-ui-componenet-library'`)

---

## 8. Major Features & Internal Working

AI Component Generation

- Backend composes a detailed system prompt instructing the model to return a JSON object with escaped strings. The JSON must include `name`, `code`, and `props`.
- Backend enforces parsing; invalid JSON triggers an error.
- Clients preview code by sanitizing imports and `export` wrappers before rendering in `react-live`.

Live Preview

- `LiveComponentPreview` sanitizes generated code by removing imports and `export` statements, replacing `position: fixed` with `absolute`, then embeds the component into `react-live` scope.

Publish to npm

- Implemented as a server-side automation that mutates the `virtual-ui-lib` workspace, builds the package, bumps the version, and calls `npm publish`.
- Requires correct npm token and potentially bypass-2FA rights for automation tokens (see limitations).

Payments / Credits

- Payment creation uses Razorpay SDK to create an order. The server records the order in `Payment` model and later verifies the payment signature and credits the user's `aiCredits`.

Auth

- Client uses Firebase `signInWithPopup(auth, provider)` to obtain Google user info.
- Client posts `{ name, email }` to server `/api/auth/googlesignup`, which creates/returns a User and sets an HTTP-only cookie containing a JWT generated with `JWT_SECRET`.
- Subsequent requests use the cookie for authentication. Server middleware `isAuth` verifies the JWT and sets `req.userId`.

---

## 9. Authentication & Authorization Flow

Authentication

- Client: Firebase Google popup -> sends name/email to backend `/api/auth/googlesignup`.
- Backend: If email not present, creates user; signs a JWT with `genToken(user._id)` and sets it in `res.cookie("token", token, { httpOnly:true, sameSite:"strict" })`.

Authorization

- `isAuth` middleware ensures the presence of `token` cookie and decodes it to set `req.userId`.
- Controllers enforce role-based constraints:
  - `publishComponent()` requires the user be `admin` and also the `owner` of the component record.
  - `generateComponent()` deducts credits for `user` role only.

Note: The server relies on the client-provided email mapping and a separate internal role flag in `User` (`user`|`admin`). There is no RBAC beyond these checks in the codebase.

---

## 10. Backend Architecture & API Flow

API endpoints (high level):

- `POST /api/auth/googlesignup` — create user / issue cookie
- `GET /api/auth/logout` — clear cookie
- `GET /api/user/currentuser` — return user object using `req.userId`
- `GET /api/user/all-users` — admin or any user fetches users
- `POST /api/component/generate` — uses OpenRouter to generate component JSON
- `POST /api/component/save` — persist component to DB
- `POST /api/component/publish` — admin-only publish pipeline
- `GET /api/component/all-components` — list components
- `POST /api/payment/create-order` — create Razorpay order
- `POST /api/payment/verify` — verify Razorpay payment signature

Error handling

- Controllers catch and return 4xx/5xx with messages. Publish flow logs more detailed error traces to server console, but returns a generic `Publish failed` message to client.

---

## 11. Frontend Architecture & State Management

State

- Single Redux slice `user` holds `userData`, `allUsers`, `allcomponents`.
- `App.jsx` performs initial user fetch and then parallel fetches for users and components once authenticated.

Routing

- React Router defines routes for home, admin, generate, components, pricing, my components.

Component preview

- `react-live` sandbox (`LiveProvider`) with sanitized code scope. The preview removes imports and exports to run isolated component code.

UI patterns

- Many pages use Framer Motion / `motion` for animation.
- Toasts are small ad-hoc components within pages.

---

## 12. Database Design & Data Flow

Models

- `User`:
  - `name`, `email`, `role` (`user`|`admin`), `aiCredits`
- `Component`:
  - `name`, `code`, `props` (array), `owner`(User ref), `visibility` (`private`|`public`), `npmPackage`
- `Payment`:
  - stores Razorpay orderId, amount, credits quantity, status

Data flows

- Generations reduce `aiCredits` by 50 for non-admin users.
- Payments add credits to `User.aiCredits` when `verifyPayment` confirms HMAC correctness.

---

## 13. AI Pipeline / Business Logic

- Backend constructs a strict system prompt instructing the model to return a JSON string only. It expects escaped code and newline escaping so the response can be parsed via `JSON.parse()`.
- The model is called using OpenRouter; environment variable `OPENROUTER_API_KEY` must be set.
- If the AI returns invalid JSON, the server returns a 500 with message "AI returned invalid JSON".

Sanitization

- Frontend preview sanitizes code to remove `import`/`export` and to avoid `position: fixed` which would break the preview sandbox.

---

## 14. Project Structure & Major Module Responsibilities

- `virtual-ui-client/` — All UI and client-side logic, routing, auth flow, previews, and credits UI.
- `virtual-ui-server/` — API, AI integration, DB models, payment logic, publish pipeline.
- `virtual-ui-lib/` — component library sources and build config used by the server to inject and publish components.

---

## 15. External Services & Integrations

- OpenRouter.ai — AI chat completions (model configured in `openRouter.js`)
- Firebase Auth — client-based Google sign-in
- Razorpay — payments
- npm registry — `npm publish` for library distribution

Secrets and env vars (observed):

- `JWT_SECRET` — for server JWTs
- `MONGODB_URL` — MongoDB connection
- `OPENROUTER_API_KEY` — OpenRouter API key
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — Razorpay credentials
- npm token — must be present in `virtual-ui-lib/.npmrc` for publishing

---

## 16. Design Decisions & Trade-offs

- Using a server-side `npm publish` automation simplifies one-click publishing but couples developer environment permissions and tokens with runtime server privileges. It requires careful token handling and 2FA bypass tokens for automation.
- The AI model is invoked server-side to avoid shipping the API key and to enable credit enforcement server-side.
- `react-live` provides a quick, in-browser preview but requires careful sanitization of generated code to avoid runtime breakage.
- JWT in cookie simplifies auth for SPA and server endpoints, but there is no refresh token handling; tokens expire in 7 days per `genToken`.

---

## 17. Current Limitations & Risks

1. Publish automation permissions: The server's `npm publish` step requires an npm token with bypass-2FA. If the token lacks automation rights, registry returns `E403` (Two-factor authentication required). This was observed in the server logs.
2. Tight coupling: publish flow assumes `virtual-ui-lib` is adjacent to server and uses `process.cwd()` + `../virtual-ui-lib` — running the server from a different working directory may break the path resolution.
3. Owner/admin requirement: `publishComponent()` requires the caller to be both `admin` and the `owner` of the component. This can be surprising: admins cannot publish components that another admin/user owns.
4. Error surfaces: client receives generic messages (e.g., "Publish failed"). The server logs more details to console, but client UX could be improved to show clearer error reasons.
5. AI output fragility: model must return strict JSON with escaped code. Any deviation breaks parsing and aborts generation.
6. No rate-limiting or abuse controls beyond credits. OpenRouter quota and costs must be monitored.

---

## 18. Future Scope & Recommended Improvements

- Improve publish UX and safety:
  - Return detailed publish error messages to client (sanitized) so users see why publishing failed.
  - Use a dedicated CI/CD or GitOps workflow for library publication rather than running `npm publish` inside production server process.
  - Recommend storing npm token securely (e.g., environment variable in a deployment environment) and require automation token with `bypass 2fa`.
- Decouple `virtual-ui-lib` folder name from npm package name.
- Harden AI parsing: wrap `JSON.parse` with tolerant pre-processing and provide a review step if parsing fails.
- Improve auth & RBAC: separate owner vs publisher roles; allow admin umbrella publishing for public team libraries.
- Add server-side unit/integration tests for the publish pipeline in a sandboxed environment.

---

## 19. Interview Guide / How to Explain the Project

Key points to cover when explaining VirtualUI:

- Purpose: lower friction for generating production-ready React components via AI and optionally publishing them to a shared component package.
- Flow: user signs in via Google → generate with AI → preview → save → admin publishes to npm.
- Core components: React frontend + Express backend + Mongoose + OpenRouter.ai + Razorpay + Firebase + `tsup` build + npm publishing.

Potential interview questions and short answers:

- Q: How does AI generation work?
  A: Client sends prompt to backend, which calls OpenRouter with a strict system prompt asking for JSON. Backend parses JSON and returns `name`, `code`, `props`.
- Q: How is publishing automated?
  A: Backend injects component files into the library workspace, builds the library with `tsup`, bumps version, and runs `npm publish`. The operation relies on a valid npm token in `virtual-ui-lib/.npmrc`.
- Q: How are credits managed?
  A: `User` has `aiCredits`; non-admin generations deduct 50 credits. Payments via Razorpay are recorded and verified on the backend.
- Q: What are the major risks?
  A: AI output validity, publish token permissions/2FA, path fragility, and exposing server to npm publish operations.

---

## Appendix — Key Files (for quick reference)

- `virtual-ui-client/src/App.jsx` — top-level routing and data fetching
- `virtual-ui-client/src/pages/ComponentGenerator.jsx` — AI prompt UI and generate/save/publish flows
- `virtual-ui-client/src/components/LiveComponentPreview.jsx` — runtime sandbox preview
- `virtual-ui-server/controllers/component.controller.js` — core generate/save/publish implementation
- `virtual-ui-server/utils/openRouter.js` — OpenRouter wrapper
- `virtual-ui-server/utils/razorpay.js` — Razorpay client
- `virtual-ui-lib/tsup.config.js` — library bundling config

---

If you want, I can:

- open a PR to improve error messages returned by the publish API (include npm stderr in response) — useful to show `E403` details to the UI;
- propose a CI-based publish workflow and a safe sandbox for test publishes;
- add tests for OpenRouter parsing and preview sanitization.

End of document.
