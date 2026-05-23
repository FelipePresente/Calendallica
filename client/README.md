# Calendallica — Client Documentation

**Stack:** React 19 · TypeScript 5.9 · Vite 7 · React Router DOM 7 · Tailwind CSS 4

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Routing](#routing)
4. [Pages](#pages)
5. [Components](#components)
6. [Hooks](#hooks)
7. [Services](#services)
8. [Shared Types](#shared-types)
9. [Styling](#styling)
10. [Configuration](#configuration)
11. [Running Locally](#running-locally)

---

## Architecture Overview

The client is a single-page application built on React with a feature-based directory structure. State is local to each component or hook — there is no global state manager. API communication is handled by a service layer (`src/services/`) that wraps `fetch` calls with `credentials: 'include'` for cookie-based auth.

Route protection is implemented via two wrapper components: `GuestRoute` (redirects authenticated users to `/dashboard`) and `ProtectedRoute` (redirects unauthenticated or unauthorized users to `/`).

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── assets/              # Static images and SVG icons
│   ├── components/          # Shared/reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── pages/
│   │   ├── admin/           # Analytics dashboard (admin only)
│   │   ├── Dashboard/       # Main user dashboard
│   │   ├── Home/            # Public landing page
│   │   ├── Login/
│   │   ├── NotFound/
│   │   └── SignUp/
│   ├── services/            # API communication layer
│   ├── App.tsx              # Router definition
│   ├── main.tsx             # React entry point
│   └── style.css            # Tailwind import
├── vite.config.ts
└── tsconfig.app.json
```

---

## Routing

Defined in `App.tsx` using `BrowserRouter` + `Routes`.

| Path | Component | Guard | Access |
|------|-----------|-------|--------|
| `/` | `Home` | `GuestRoute` | Unauthenticated only |
| `/login` | `Login` | `GuestRoute` | Unauthenticated only |
| `/signup` | `SignUp` | `GuestRoute` | Unauthenticated only |
| `/dashboard` | `Dashboard` | `ProtectedRoute` | Authenticated |
| `/admin` | `Admin` | `ProtectedRoute (adminOnly)` | `admin` role only |
| `*` | `NotFound` | None | Any |

### `GuestRoute`

On mount, calls `checkAuthStatus()`. If the request succeeds (user is authenticated), redirects to `/dashboard`. If it fails, renders children. Shows nothing while loading.

### `ProtectedRoute`

Calls `useUserData(adminOnly)`. If the user is not authenticated, or if `adminOnly=true` and the role is not `admin`, redirects to `/`. Injects the resolved `userData` into the child component via `cloneElement`.

---

## Pages

### `Home`

Public landing page. Composed of:
- `Header` — fixed navigation with login/signup links.
- `Section1` — hero section with `CalendarPreview` (read-only calendar showing the current month).
- `Section2` — feature cards grid.
- `Footer` — links to GitHub and LinkedIn.

`CalendarPreview` renders the current month using the shared day components. It is purely presentational — click handlers are no-ops.

### `Login`

Form with `username` and `password` fields. On submit, calls `authService.login()`. On success, navigates to `/dashboard`. On error, displays `ErrorMessage` with the server response. Uses `isLoading` state to disable the submit button during the request.

### `SignUp`

Form with `username`, `password`, and `passwordConfirmation` fields. Client-side password match check before calling `signupService.signup()`. Same error/loading pattern as Login.

### `Dashboard`

Top-level page component. Receives `userData` injected by `ProtectedRoute`. Renders `DashboardSkeleton` until `userData` is available and a minimum 1-second delay (`useMinTimeElapsed`) has passed, then renders:
- `DashboardHeader` — fixed top bar with logo, optional admin link, welcome message, logout.
- `DashboardMain` — main content area.

`DashboardMain` holds `selectedDate` state and renders three columns:
- `TasksList` (col-span-4) — collapsible list of tasks; clicking a task updates `selectedDate`.
- `GoalsList` (col-span-4) — collapsible list of goals with add button.
- `Calendar` (col-span-8) — interactive calendar driven by `selectedDate`.

### `Admin`

Admin-only analytics page. Fetches counts via `useAnalytics`. Shows `AdminSkeleton` until data is loaded and the minimum delay has passed. Displays `user_count`, `task_count`, and `goal_count` in cards.

### `NotFound`

Static 404 page with a return link to `/`.

---

## Components

### Route Guards

| Component | Description |
|-----------|-------------|
| `GuestRoute` | Wraps public-only pages; redirects authenticated users |
| `ProtectedRoute` | Wraps auth-required pages; injects `userData` via `cloneElement` |

### Calendar Day Components

Four variants used by both `CalendarPreview` and the dashboard `Calendar`:

| Component | When Used | Clickable |
|-----------|-----------|-----------|
| `CalendarDayEmpty` | Padding days before the 1st | No |
| `CalendarDayPast` | Days before today | No |
| `CalendarDayCurrent` | Today | Yes |
| `CalendarDayCommon` | Future days | Yes (supports `isSelected` highlight) |

`CalendarDayCurrent` and `CalendarDayCommon` accept a `hasTask` prop that renders a `TaskOrb` (small green dot indicator) when `true`.

### Dashboard Modals

All modals follow the same pattern: fixed overlay with backdrop blur, close on overlay click or explicit close button, form submit calls the relevant service and triggers `window.location.reload()`.

| Component | Purpose |
|-----------|---------|
| `AddTask` | Create a new task for a pre-selected date |
| `EditTask` | Update `title` and `description` of an existing task |
| `DeleteTask` | Confirm deletion of a task |
| `AddGoal` | Create a new goal |
| `EditGoal` | Update `title` and `description` of an existing goal |
| `DeleteGoal` | Confirm deletion of a goal |

**Note:** All CRUD modals use `window.location.reload()` after a successful operation. This is a simple but effective approach that avoids optimistic update complexity. A future improvement would be lifting state up or using a state manager to avoid full-page reloads.

### Other Shared Components

| Component | Description |
|-----------|-------------|
| `Logo` | Renders the logo image |
| `LoadingSpinner` | Animated spinner (border-based CSS animation) |
| `ErrorMessage` | Red-tinted error banner |
| `SubmitButton` | Submit input with disabled state and visual feedback |
| `TaskOrb` | Small green dot rendered on calendar days with tasks |
| `EditButton` | Edit icon wrapper |
| `Next` / `Previous` | Navigation arrow icons |
| `Orb1` / `Orb2` | Decorative blurred gradient background elements |
| `Footer` | Site-wide footer |

---

## Hooks

### `useUserData(adminOnly: boolean)`

Checks auth status on mount via `checkAuthStatus()`. If unauthenticated or (when `adminOnly=true`) role is not `admin`, navigates to `/`. Returns `UserStatus | null`.

### `useCalendar(dateProp: Date)`

Encapsulates all calendar state and logic:
- `currentDate`: the currently displayed month/year, initialized from `dateProp` and updated on prop change.
- `addingTaskDate`: the selected date string (`en-CA` locale, i.e. `YYYY-MM-DD`) when the add-task modal is open.
- Handlers: `handlePrevious`, `handleNext`, `handleDayClick`, `closeAddTask`.
- `calendarData` (memoized): `{ year, month, daysInMonth, dayOne, headerText }`. Handles leap years correctly.

`handleDayClick` only opens the modal for dates that are today or in the future.

### `useTasks()`

Fetches the authenticated user's tasks on mount via `tasksService.getTasks()`. Returns them sorted by `dueDate` ascending.

### `useGoals()`

Fetches the authenticated user's goals on mount via `goalsService.getGoals()`. Returns `GoalsResponse[]`.

### `useAnalytics()`

Fetches admin analytics on mount. On error, navigates to `/`. Returns `Analytics | null`.

### `useMinTimeElapsed()`

Returns `false` initially, then `true` after 1000ms. Used to show skeleton states for a minimum duration, avoiding flash-of-content on fast connections.

---

## Services

All services read `import.meta.env.VITE_API_URL` as the base URL and pass `credentials: 'include'` on all requests to send the HttpOnly cookie.

### `CheckAuthService.ts`

```typescript
checkAuthStatus(): Promise<UserStatus>
```
`GET /auth/me`. Throws on non-2xx response.

### `authService.ts`

```typescript
login(credentials: LoginCredentials): Promise<void>
logout(): Promise<void>
```
`POST /auth` and `POST /auth/logout`. `login` parses the error body and re-throws with a human-readable message.

### `signupService.ts`

```typescript
signup(credentials: SignUpCredentials): Promise<void>
```
`POST /users`. Same error-parsing pattern as `login`.

### `tasksService.ts`

```typescript
getTasks(): Promise<TasksResponse[]>
createTask(task: Partial<TasksResponse>): Promise<TasksResponse>
updateTask(id: string, data: { newTitle: string, newDescription: string }): Promise<TasksResponse>
deleteTask(id: string): Promise<void>
```
Full CRUD for `/tasks` and `/tasks/:id`.

### `goalsService.ts`

```typescript
getGoals(): Promise<GoalsResponse[]>
createGoal(goal: Omit<GoalsResponse, 'id'>): Promise<GoalsResponse>
updateGoal(id: string, data: { newTitle: string, newDescription: string }): Promise<GoalsResponse>
deleteGoal(id: string): Promise<void>
```
Full CRUD for `/goals` and `/goals/:id`.

### `analyticsService.ts`

```typescript
getAnalytics(): Promise<Analytics>
```
`GET /analytics`. Throws `"Access denied"` on non-2xx (used to detect admin revocation).

---

## Shared Types

Types are defined in `shared/types/` (monorepo root) and imported by both client and server.

```
shared/types/
├── analytics/Analytics.ts    → { user_count, task_count, goal_count }
├── auth/Auth.ts              → UserStatus, LoginCredentials
├── goals/Goals.ts            → GoalsResponse
├── signup/SignUp.ts          → SignUpCredentials
└── tasks/Tasks.ts            → TasksResponse
```

This ensures the API contract is enforced at compile time on both ends.

---

## Styling

Tailwind CSS 4 is used exclusively via the Vite plugin (`@tailwindcss/vite`). There is no `tailwind.config.js` — configuration is handled through the CSS import in `style.css`:

```css
@import "tailwindcss";
```

The design system is dark-mode first (zinc palette base). Accent colors:
- Indigo — primary actions and calendar today highlight.
- Emerald — goals.
- Red — destructive actions.

Custom non-Tailwind classes used sparingly: `list-type`, `alert-cell`, `goal-cell`, `task-cell` — defined inline via Tailwind's utility classes in JSX.

---

## Configuration

### Environment Variables

Create `client/.env` (not committed):

```env
VITE_API_URL=http://localhost:8000
```

For production, set `VITE_API_URL` to the deployed backend URL.

### TypeScript

Strict mode is enabled with the following additional checks: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`, `noUncheckedSideEffectImports`.

Target: ES2022. Module resolution: `bundler` (Vite-native).

---

## Running Locally

**Prerequisites:** Node.js ≥ 22.12.0, npm.

```bash
cd client
npm install
npm run client   # starts Vite dev server on http://localhost:5173
```

**Build for production:**

```bash
npm run build    # outputs to client/dist/
```

**Lint:**

```bash
npm run lint
```
