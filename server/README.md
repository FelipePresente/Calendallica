# Calendallica — Server Documentation

**Stack:** Java 17 · Spring Boot 4.0.6 · Spring Security · Spring Data JPA · MySQL · Auth0 Java JWT 4.4.0 · Bucket4j 8.10.1 · Maven

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Domain Modules](#domain-modules)
4. [Security](#security)
5. [Rate Limiting](#rate-limiting)
6. [Exception Handling](#exception-handling)
7. [Database Schema](#database-schema)
8. [API Reference](#api-reference)
9. [Configuration](#configuration)
10. [Running Locally](#running-locally)

---

## Architecture Overview

The backend follows a standard layered architecture per domain module:

```
Controller → Service → Repository → Entity (JPA / MySQL)
```

Each domain is self-contained under its own package, sharing only the `exception` and `config` packages. DTOs (Java Records) are used throughout to decouple the persistence layer from the API surface.

Authentication is stateless: JWT tokens are issued on login/signup, stored in HttpOnly cookies, and validated on every request by a custom `SecurityFilter`.

---

## Project Structure

```
server/src/main/java/calendallica_server/
├── analytics/
│   ├── Analytics.java
│   ├── AnalyticsController.java
│   ├── AnalyticsService.java
│   └── dto/
│       └── AnalyticsResponseDTO.java
├── auth/
│   ├── AuthController.java
│   ├── AuthService.java
│   ├── CookieService.java
│   ├── TokenService.java
│   └── dto/
│       └── AuthLoginDTO.java
├── config/
│   ├── DataInitializer.java
│   ├── ExpiredTaskCleaner.java
│   ├── RateLimitInterceptor.java
│   ├── SecurityConfig.java
│   ├── SecurityFilter.java
│   └── WebMvcConfig.java
├── exception/
│   ├── ConflictException.java
│   ├── GlobalExceptionHandler.java
│   ├── InvalidCredentialsException.java
│   └── ResourceNotFoundException.java
├── goal/
│   ├── Goal.java
│   ├── GoalController.java
│   ├── GoalRepository.java
│   ├── GoalService.java
│   └── dto/
│       ├── GoalCreationDTO.java
│       ├── GoalResponseDTO.java
│       └── GoalUpdateDTO.java
├── role/
│   ├── Role.java
│   └── RoleRepository.java
├── task/
│   ├── Task.java
│   ├── TaskController.java
│   ├── TaskRepository.java
│   ├── TaskService.java
│   └── dto/
│       ├── TaskCreationDTO.java
│       ├── TaskResponseDTO.java
│       └── TaskUpdateDTO.java
└── user/
    ├── User.java
    ├── UserController.java
    ├── UserRepository.java
    ├── UserService.java
    └── dto/
        ├── UserResponseDTO.java
        ├── UserSignUpDTO.java
        └── UserUpdateDTO.java
```

---

## Domain Modules

### `user`

Manages user accounts.

**Entity fields:** `id` (UUID), `username` (unique, max 16), `password` (bcrypt hash, max 64), `role` (ManyToOne, eager), `createdAt`, `updatedAt`.

**DTOs:**

| DTO | Fields | Validation |
|-----|--------|------------|
| `UserSignUpDTO` | `username`, `password` | username: 4–16 chars, alphanumeric; password: 8–64 chars, no spaces |
| `UserUpdateDTO` | `password`, `newUsername?`, `newPassword?` | same constraints; current password required |
| `UserResponseDTO` | `id`, `username`, `role` | — |

**Business rules (`UserService`):**
- Username is normalized to lowercase + trimmed on input via compact constructor.
- Signup: checks for duplicate username, encodes password with BCrypt, assigns the `user` role, and returns a JWT token.
- Update: verifies current password, rejects new username/password that is the same as the current one, checks uniqueness of new username.

**Known issue:** In `UserService.update()`, the username uniqueness check `existsByUsername(data.newUsername())` runs inside the `newPassword` block instead of the `newUsername` block. This is a logic error — the check should be in the username update branch.

---

### `auth`

Handles authentication sessions.

**DTOs:**

| DTO | Fields | Validation |
|-----|--------|------------|
| `AuthLoginDTO` | `username`, `password` | both `@NotBlank`; username normalized |

**Services:**

- **`AuthService.login`**: looks up user by username, verifies BCrypt hash, generates JWT on success. Throws `InvalidCredentialsException` on failure (no username enumeration).
- **`TokenService`**: signs JWTs with HMAC256 using the secret from `api.security.token.secret`. Token issuer: `"Calendallica"`. Subject: `user.id` (UUID string). Expiry: 14 days. Returns `null` on invalid/expired token.
- **`CookieService`**: creates/deletes the `access_token` HttpOnly cookie. Max-age: 14 days (creation), 0 (deletion). `secure` and `sameSite` attributes are environment-configurable.

---

### `task`

Date-bound user tasks. All tasks are deleted automatically if they are older than yesterday (1-day grace period).

**Entity fields:** `id` (UUID), `title` (max 30), `description` (max 100), `dueDate` (LocalDate), `user` (ManyToOne, lazy), `createdAt`, `updatedAt`.

**DTOs:**

| DTO | Fields | Validation |
|-----|--------|------------|
| `TaskCreationDTO` | `title`, `description?`, `dueDate` | title: 1–50, alphanumeric+spaces+diacritics; description: max 300; dueDate: yesterday or later |
| `TaskUpdateDTO` | `newTitle?`, `newDescription?` | same constraints, all optional |
| `TaskResponseDTO` | `id`, `title`, `description`, `dueDate`, `userId`, `createdAt`, `updatedAt` | — |

**Business rules (`TaskService`):**
- All reads and mutations are scoped to the authenticated user via `findByIdAndUserId` — no cross-user access.
- Partial updates: only non-null and non-blank fields are applied.
- Task creation allows a 1-day grace period (due date can be yesterday or later).

---

### `goal`

Long-term personal goals with no expiry.

**Entity fields:** `id` (UUID), `title` (max 30), `description` (max 300), `user` (ManyToOne, lazy), `createdAt`, `updatedAt`.

**DTOs:**

| DTO | Fields | Validation |
|-----|--------|------------|
| `GoalCreationDTO` | `title`, `description?` | title: 1–50, alphanumeric+spaces+diacritics; description: max 300 |
| `GoalUpdateDTO` | `newTitle?`, `newDescription?` | same constraints, all optional |
| `GoalResponseDTO` | `id`, `title`, `description`, `userId`, `createdAt`, `updatedAt` | — |

Same scoped-access pattern as tasks.

---

### `analytics`

Admin-only aggregate counts.

**`AnalyticsResponseDTO`:** `user_count`, `task_count`, `goal_count` (all `Long`).

Access is restricted via `@PreAuthorize("hasRole('ADMIN')")` on the controller.

---

### `role`

Seed data entity. Two roles are created on first boot by `DataInitializer` if the `role` table is empty: `user` and `admin`.

---

## Security

### `SecurityConfig`

- CSRF: **disabled** (stateless JWT API).
- Sessions: `STATELESS`.
- CORS: origins loaded from `api.security.cors.origins` (comma-separated list). Allowed methods: `GET, POST, PUT, DELETE, OPTIONS, PATCH`. Credentials allowed.
- Public endpoints: `GET /auth/me`, `POST /auth`, `POST /users`.
- All other requests require authentication.
- Password encoding: `BCryptPasswordEncoder`.
- Method-level security: enabled via `@EnableMethodSecurity` (used for `@PreAuthorize`).

### `SecurityFilter`

Runs before `UsernamePasswordAuthenticationFilter` on every request.

1. Reads the `access_token` cookie.
2. Validates the JWT via `TokenService.validateToken` → extracts `userId`.
3. Loads the `User` from the database.
4. Sets a `UsernamePasswordAuthenticationToken` in `SecurityContextHolder` with authority `ROLE_<ROLE_NAME_UPPERCASE>`.

If any step fails (no cookie, invalid token, user not found), the filter passes the request through unauthenticated.

---

## Rate Limiting

`RateLimitInterceptor` applies to all endpoints (`/**`) via `WebMvcConfig`.

- Per-IP bucket: **100 requests / 1 minute** (greedy refill).
- IP resolution: reads `X-Forwarded-For` header first (proxy-aware), falls back to `remoteAddr`.
- Buckets are stored in a `ConcurrentHashMap` (in-memory, non-persistent).
- Returns HTTP 429 with plain text body on exhaustion.

**Note:** The in-memory bucket map grows unboundedly and has no eviction. In a production scenario with high cardinality of IPs this could be a memory concern.

---

## Exception Handling

`GlobalExceptionHandler` (`@RestControllerAdvice`) maps exceptions to HTTP status codes:

| Exception | HTTP Status | Response Body |
|-----------|-------------|---------------|
| `ResourceNotFoundException` | 404 | `{ "message": "..." }` |
| `InvalidCredentialsException` | 401 | `{ "message": "..." }` |
| `MethodArgumentNotValidException` | 400 | `{ "fieldName": "error message", ... }` |
| `ConflictException` | 409 | `{ "message": "..." }` |
| `Exception` (fallback) | 500 | `{ "message": "An unexpected internal error occurred" }` |

Stack traces are suppressed in responses (`server.error.include-stacktrace=never`).

---

## Database Schema

Schema is managed by Hibernate DDL-auto (`update`). UUIDs are stored as `VARCHAR(36)` (CHAR affinity).

```
role
├── id         VARCHAR(36) PK
└── name       VARCHAR(30) NOT NULL

user
├── id         VARCHAR(36) PK
├── username   VARCHAR(16) NOT NULL UNIQUE
├── password   VARCHAR(64) NOT NULL
├── role_id    VARCHAR(36) NOT NULL FK → role.id
├── created_at DATETIME NOT NULL
└── updated_at DATETIME NOT NULL

task
├── id          VARCHAR(36) PK
├── title       VARCHAR(30) NOT NULL
├── description VARCHAR(100)
├── due_date    DATE NOT NULL
├── user_id     VARCHAR(36) NOT NULL FK → user.id
├── created_at  DATETIME NOT NULL
└── updated_at  DATETIME NOT NULL

goal
├── id          VARCHAR(36) PK
├── title       VARCHAR(30) NOT NULL
├── description VARCHAR(300)
├── user_id     VARCHAR(36) NOT NULL FK → user.id
├── created_at  DATETIME NOT NULL
└── updated_at  DATETIME NOT NULL
```

---

## API Reference

All endpoints return `application/json`. Authentication via HttpOnly cookie `access_token`.

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/auth` | Public | Login. Body: `{ username, password }`. Sets `access_token` cookie. Returns `204`. |
| `GET` | `/auth/me` | Public* | Returns current user data. `*`Returns data if authenticated; does not reject unauthenticated requests — callers must check. |
| `POST` | `/auth/logout` | Any | Clears `access_token` cookie. Returns `200`. |

### Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/users` | Public | Sign up. Body: `{ username, password }`. Sets `access_token` cookie. Returns `200`. |
| `GET` | `/users` | `ADMIN` | List all users. Returns `UserResponseDTO[]`. |
| `PUT` | `/users` | Authenticated | Update own username/password. Body: `{ password, newUsername?, newPassword? }`. |

### Tasks

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/tasks` | Authenticated | List own tasks. Returns `TaskResponseDTO[]`. |
| `POST` | `/tasks` | Authenticated | Create task. Body: `{ title, description?, dueDate }`. Returns `201 TaskResponseDTO`. |
| `PUT` | `/tasks/{id}` | Authenticated | Update task. Body: `{ newTitle?, newDescription? }`. Returns `TaskResponseDTO`. |
| `DELETE` | `/tasks/{id}` | Authenticated | Delete task. Returns `204`. |

### Goals

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/goals` | Authenticated | List own goals. Returns `GoalResponseDTO[]`. |
| `POST` | `/goals` | Authenticated | Create goal. Body: `{ title, description? }`. Returns `201 GoalResponseDTO`. |
| `PUT` | `/goals/{id}` | Authenticated | Update goal. Body: `{ newTitle?, newDescription? }`. Returns `GoalResponseDTO`. |
| `DELETE` | `/goals/{id}` | Authenticated | Delete goal. Returns `204`. |

### Analytics

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/analytics` | `ADMIN` | Returns `{ user_count, task_count, goal_count }`. |

---

## Configuration

### `application.properties`

```properties
server.port=${PORT:8000}
spring.profiles.active=local
server.error.include-stacktrace=never

spring.datasource.url=jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.type.preferred_uuid_jdbc_type=CHAR

api.security.token.secret=${JWT_SECRET}
api.security.cors.origins=${CORS_ORIGINS}
api.security.cookie.secure=${COOKIE_SECURE:false}
api.security.cookie.samesite=${COOKIE_SAMESITE:Strict}
```

### `application-local.properties` (development only — **never commit**)

```properties
DB_HOST=localhost
DB_NAME=calendallica_db
DB_PASSWORD=<your_password>
DB_PORT=3306
DB_USER=root

JWT_SECRET=<random_256bit_base64>
CORS_ORIGINS=http://localhost:5173
```

**Required environment variables for production:**

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default: `8000`) |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_NAME` | Database name |
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL password |
| `JWT_SECRET` | HMAC256 secret (min 32 chars recommended) |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins |
| `COOKIE_SECURE` | `true` in production (HTTPS only) |
| `COOKIE_SAMESITE` | `Strict` or `None` depending on deployment topology |

---

## Running Locally

**Prerequisites:** Java 17, Maven, MySQL running locally.

```bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE calendallica_db;"

# 2. Set credentials in server/src/main/resources/application-local.properties

# 3. Run
cd server
./mvnw spring-boot:run
```

The server starts on `http://localhost:8000`. On first boot, `DataInitializer` seeds the `user` and `admin` roles and `TaskKiller` deletes all past due tasks.
