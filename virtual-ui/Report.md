# VirtualUI Project Context

## 1. Project Purpose

VirtualUI is a full-stack application that makes React UI component creation faster and more accessible by using AI, persistent storage, and an automated publish pipeline.

### Problem statement

- Designers and developers need a faster way to create production-ready React UI components.
- Building UI components from scratch is time consuming and repetitive.
- Teams need a way to preview component designs, save them, and share them as a reusable library.

### What VirtualUI solves

- AI-driven React component generation from plain English prompts.
- Live preview of created components in the browser.
- Persistent saving of components in MongoDB.
- Role-based publishing of components to a reusable library package.
- Payment-based credit system to control AI generation usage.

## 2. High-Level Architecture

VirtualUI has three main parts:

1. `virtual-ui-client` — frontend application
2. `virtual-ui-server` — backend API and business logic
3. `virtual-ui-lib` — reusable component library package

The frontend talks to the backend over HTTP. The backend talks to MongoDB, OpenRouter AI, Razorpay, and the local library package.

## 3. Major Features

- Google login via Firebase and JWT cookie-based auth.
- AI component generation with OpenRouter.
- Live component preview using `react-live`.
- Save generated components to MongoDB.
- Publish components through a server-side automated npm library pipeline.
- User credit system for AI generation.
- Public/private component visibility.
- Component explorer and user-specific component manager.

## 4. Directory Structure

```
virtual-ui/
  virtual-ui-client/
    src/
      App.jsx
      main.jsx
      pages/
      components/
      redux/
      utils/
      index.css
    package.json
  virtual-ui-server/
    index.js
    configs/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    package.json
  virtual-ui-lib/
    src/
      index.js
      components/
    package.json
    tsup.config.js
  VirtualUIReport.md
  context.md
```

## 5. Frontend (`virtual-ui-client`)

### Goal

Provide the user interface for login, AI generation, component preview, saving, browsing, and admin publishing.

### Key files

- `src/main.jsx`
  - Application bootstrap.
  - Adds React Router and Redux provider.
- `src/App.jsx`
  - Top-level route definitions.
  - Fetches current user and additional data after login.
  - Loads user list and component list from backend.
- `src/redux/store.js`
  - Configures Redux store with `user` slice.
- `src/redux/userSlice.js`
  - Stores `userData`, `allUsers`, `allcomponents`.
  - Has actions: `setUserData`, `setAllUsers`, `setAllComponents`.
- `src/utils/firebase.js`
  - Firebase client config for Google auth.
- `src/components/Auth.jsx`
  - Sign-in modal.
  - Uses Firebase popup sign-in.
  - Calls backend `/api/auth/googlesignup`.
- `src/components/LiveComponentPreview.jsx`
  - Sanitizes AI-generated component code.
  - Renders it using `react-live`.

### Pages

- `src/pages/Home.jsx`
  - Landing page and feature guide.
  - Contains buttons to sign in, generate components, and navigate.
- `src/pages/ComponentGenerator.jsx`
  - Main AI generation page.
  - Accepts prompt, sends to backend, displays preview/code.
  - Allows save and publish actions.
- `src/pages/Componentspage.jsx`
  - Public component explorer.
  - Shows components with `visibility === "public"`.
  - Allows live preview, code view, and usage guidance.
- `src/pages/MyComponentsPage.jsx`
  - Shows `private` components owned by the logged-in user.
  - Useful for each user to manage their saved items.
- `src/pages/AdminDashboard.jsx`
  - Admin interface for component publishing.
  - Allows adding a component manually, saving, and publishing.
- `src/pages/Pricingpage.jsx`
  - Pricing and credits page.
  - Likely guides purchases or credit plans.

### Frontend flow summary

- The app first fetches current user info (`/api/user/currentuser`).
- If the user is authenticated, it fetches all users and all components.
- AI generation page sends prompt to `/api/component/generate`.
- Generated result is previewed and can be saved or published.
- Public component gallery reads components from Redux state.

## 6. Backend (`virtual-ui-server`)

### Goal

Securely manage authentication, AI generation, component persistence, payment, and publish automation.

### Key files

- `index.js`
  - Express setup.
  - CORS configuration for `http://localhost:5173`.
  - JSON body parser and cookie parser.
  - Mounts auth, user, component, payment routes.
- `configs/connectDB.js`
  - Connects to MongoDB using `process.env.MONGODB_URL`.
- `configs/token.js`
  - Generates JWT tokens with `JWT_SECRET`.
- `middlewares/isAuth.js`
  - Verifies JWT token from cookie.
  - Attaches `req.userId` to requests.

### Routes and controllers

- `routes/auth.route.js`
  - `POST /api/auth/googlesignup` → `googleSignup`
  - `GET /api/auth/logout` → `logOut`
- `routes/user.route.js`
  - `GET /api/user/currentuser` → returns current user.
  - `GET /api/user/all-users` → returns all users.
- `routes/component.route.js`
  - `POST /api/component/generate` → generates AI component.
  - `POST /api/component/save` → saves component in DB.
  - `POST /api/component/publish` → publish pipeline.
  - `GET /api/component/all-components` → list all components.
- `routes/payment.route.js`
  - `POST /api/payment/order` → creates Razorpay order.
  - `POST /api/payment/verify` → verifies payment and credits user.

### Controllers

- `controllers/auth.controller.js`
  - `googleSignup` finds or creates a user by email.
  - Issues JWT cookie.
  - `logOut` clears the cookie.
- `controllers/user.controller.js`
  - `getCurrentUser` returns user details from DB.
  - `getAllUsers` returns all users.
- `controllers/component.controller.js`
  - `generateComponent` asks AI for component code.
  - `saveComponent` stores component in MongoDB.
  - `publishComponent` injects component into `virtual-ui-lib`, builds and publishes.
  - `getAllComponents` returns all saved components.
- `controllers/payment.controller.js`
  - `createOrder` creates Razorpay payment order.
  - `verifyPayment` validates signature and adds credits.

### Models

- `models/user.model.js`
  - `name`, `email`, `role`, `aiCredits`.
  - default role is `user`, default credits 150.
- `models/components.model.js`
  - `name`, `code`, `props`, `owner`, `visibility`, `npmPackage`.
  - visibility can be `private` or `public`.
- `models/payment.model.js`
  - payment order metadata and status tracking.

### AI integration

- `utils/openRouter.js`
  - Sends chat completion requests to OpenRouter.
  - Uses `deepseek/deepseek-chat` model.
  - Uses `response_format: { type: "json_object" }` to enforce structured output.

### Payment integration

- `utils/razorpay.js`
  - Configures the Razorpay client with keys from env.
  - Used for order creation and verification.

## 7. Component Library (`virtual-ui-lib`)

### Goal

Act as the reusable UI library package for the app and for publishable components.

### Key files

- `package.json`
  - Package name: `virtual-ui-componenet-library`.
  - Build script: `npm run build`.
  - Main entry: `dist/index.js`.
- `tsup.config.js`
  - Builds `src/index.js` into `esm` and `cjs` bundles.
  - Excludes React as external.
- `src/index.js`
  - Exports all components from their folders.
  - Example exports: `Button`, `Card`, `Navbar`, `Footer`, `Sidebar`, `ImageCard`, etc.
- `src/components/` folder
  - Contains each component implementation.
  - Examples:
    - `AnimatedButton`, `AnimatedForm`, `AvatarCard`
    - `BackgoundImageSlider`, `Button`, `Card`
    - `Charts`, `ColorPicker`, `DeleteButton`
    - `EcommerceCard`, `FileUpload`, `Footer`, `ImageCard`
    - `ImageSlider`, `InvoiceCard`, `Loader`, `Navbar`
    - `NotificationToast`, `OTPInput`, `PageLoader`, `PricingCard`
    - `ProgressBar`, `RatingStars`, `ReviewCard`, `Sidebar`, `StatCard`

### How publish works

- Admin saves a component in the app.
- Backend writes the component into `virtual-ui-lib/src/components/<Name>/<Name>.jsx`.
- Backend updates `virtual-ui-lib/src/index.js` with an export line.
- Backend deletes old `dist/` and runs `npm run build`.
- Backend bumps version patch in `virtual-ui-lib`.
- Backend runs `npm publish --access public`.
- Backend updates the component record to `visibility = "public"`.

## 8. Key application workflows

### Authentication flow

- User clicks Google sign-in in `Auth.jsx`.
- Firebase handles OAuth and returns user details.
- Frontend posts `{ name, email }` to `/api/auth/googlesignup`.
- Backend creates/fetches a user and sends a JWT cookie.
- Frontend stores user data in Redux.
- `App.jsx` uses `/api/user/currentuser` on load.

### AI generation flow

- User enters a prompt in `ComponentGenerator.jsx` and clicks Generate.
- Frontend POSTs to `/api/component/generate`.
- Backend verifies auth and user credits in `generateComponent`.
- Backend sends a strict system prompt plus user prompt to OpenRouter.
- OpenRouter returns JSON with `name`, `code`, and `props`.
- Backend parses the AI response and returns it.
- Frontend stores generated data and shows live preview.
- `LiveComponentPreview.jsx` sanitizes code and renders it with `react-live`.

### Save flow

- Frontend sends saved component data to `/api/component/save`.
- Backend checks duplicates by user and visibility.
- Backend stores the component document in MongoDB.
- User can later browse it in `MyComponentsPage` if private.

### Publish flow

- Admin saves a component and clicks Publish.
- Frontend POSTs to `/api/component/publish`.
- Backend verifies admin role and component ownership.
- Backend writes file(s) into `virtual-ui-lib`.
- Backend builds and publishes library package.
- Backend marks the component public.
- Published components are visible in the public component explorer.

### Component browsing flow

- `App.jsx` loads `/api/component/all-components` once user is known.
- The response is stored in Redux `allcomponents`.
- `Componentspage.jsx` filters `visibility === "public"`.
- `MyComponentsPage.jsx` filters private components owned by current user.
- `AdminDashboard.jsx` shows public components and admin controls.

### Payment / credits flow

- User chooses a plan (likely in `Pricingpage.jsx`).
- Frontend calls `/api/payment/order` to create Razorpay order.
- After payment, frontend calls `/api/payment/verify`.
- Backend verifies Razorpay HMAC signature.
- If valid, backend updates payment record and increments user credits.

## 9. Important business rules and design decisions

- The app stores components in MongoDB, not the component library source.
- Public dashboard only shows components with `visibility: "public"`.
- Admins must own a component to publish it.
- Normal users need at least 50 credits to generate AI components.
- AI generation is limited by credits, while admin generation is free.
- The publish pipeline is coupled to local `virtual-ui-lib` and npm.
- Inputs and outputs are sanitized for safe live previews.

## 10. Current important limitations

- The app does not automatically show repo library components in the dashboard unless they are added to the database.
- Publishing relies on a valid npm token and local file write permissions.
- `publishComponent` requires admin role and component ownership, which may make some valid workflows harder.
- AI result parsing is strict: invalid JSON from OpenRouter causes failure.
- `react-live` preview may break if generated code includes unsupported imports or fixed positioning.

## 11. File-level responsibilities

### Frontend files

- `src/main.jsx`
  - Bootstraps React and Router.
- `src/App.jsx`
  - Loads current user and data.
  - Defines app routes.
- `src/redux/store.js`
  - Redux store setup.
- `src/redux/userSlice.js`
  - Keeps user and component list state.
- `src/utils/firebase.js`
  - Firebase init and Google provider.
- `src/components/Auth.jsx`
  - Google login modal and step guide.
- `src/components/LiveComponentPreview.jsx`
  - Renders generated JSX preview.
- `src/pages/Home.jsx`
  - App landing page.
- `src/pages/ComponentGenerator.jsx`
  - AI generation flow and publish actions.
- `src/pages/Componentspage.jsx`
  - Public component explorer.
- `src/pages/MyComponentsPage.jsx`
  - User-owned saved components.
- `src/pages/AdminDashboard.jsx`
  - Admin publish and component management.
- `src/pages/Pricingpage.jsx`
  - Pricing and credits UI.

### Backend files

- `index.js`
  - Express server bootstrap and route registration.
- `configs/connectDB.js`
  - MongoDB connection.
- `configs/token.js`
  - JWT creation helper.
- `middlewares/isAuth.js`
  - Auth middleware for protected routes.
- `routes/auth.route.js`
  - Auth endpoints.
- `routes/user.route.js`
  - User info endpoints.
- `routes/component.route.js`
  - Component generation, save, publish endpoints.
- `routes/payment.route.js`
  - Razorpay payment endpoints.
- `controllers/auth.controller.js`
  - Google signup and logout.
- `controllers/user.controller.js`
  - Current user and user list.
- `controllers/component.controller.js`
  - AI generation, save, publish, and listing.
- `controllers/payment.controller.js`
  - Payment order creation and verification.
- `models/user.model.js`
  - User schema.
- `models/components.model.js`
  - Component schema.
- `models/payment.model.js`
  - Payment schema.
- `utils/openRouter.js`
  - AI service integration.
- `utils/razorpay.js`
  - Razorpay client config.

### Library files

- `package.json`
  - Package metadata and build script.
- `tsup.config.js`
  - Library bundling settings.
- `src/index.js`
  - Exports all library components.
- `src/components/*`
  - Component implementations.

## 12. How to explain the repo to another LLM

This project is a full-stack AI-assisted UI builder with a publishable component library.

- The frontend is a React app that lets users log in, create, save, preview, and browse components.
- The backend secures user actions, saves data, communicates with an AI model, handles payments, and automates publishing.
- The component library stores reusable components and can be built and published to npm.

Use the file map above to understand where each feature is implemented.

## 13. Practical usage overview

- Developer starts backend (`npm run dev` in `virtual-ui-server`).
- Developer starts frontend (`npm run dev` in `virtual-ui-client`).
- User logs in with Google.
- User generates components using AI.
- User saves components to database.
- Admin publishes selected components into the library package.
- Published components become reusable both inside and outside the app.

## 14. Summary

VirtualUI is not only a UI builder — it is a workflow:

- generate design with AI
- preview instantly
- save to storage
- publish to a component library

It combines frontend UX, backend security, AI generation, payments, and npm publish automation into one integrated product.
