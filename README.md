<p align="center">
  <img src="./client/src/assets/logo.png" alt="Calendallica" width="480" />
</p>

<p align="center">
  <strong>A productivity tool that merges a visual calendar with task and goal management.</strong>
</p>

<p align="center">
  <a href="https://calendallica.onrender.com">Live Demo</a> ·
  <a href="./client/README.md">Frontend Docs</a> ·
  <a href="./server/README.md">Backend Docs</a>
</p>

---

## Origin

Calendallica was born from a real problem. A friend mentioned he needed to be more organized — and instead of pointing him to an existing app, the answer was to build one. What started as a personal solution became a full-stack project focused on clean architecture, real security, and a UI worth actually using.

## What it is

Calendallica is a web application that combines an interactive calendar with two layers of organization:

- **Tasks** — date-bound entries tied directly to calendar days, so you always know what's coming and when.
- **Goals** — long-term personal achievements managed in a dedicated panel, independent of any specific date.

The result is a single interface where short-term scheduling and long-term ambition live side by side.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4 |
| Backend | Java 17, Spring Boot 4, Spring Security |
| Database | MySQL, Spring Data JPA |
| Auth | JWT (HttpOnly cookies), BCrypt |
| Security | Rate limiting (Bucket4j), CORS, stateless sessions |

## Features

- Interactive calendar with month navigation and per-day task indicators
- Full CRUD for tasks and goals
- JWT authentication with HttpOnly cookie storage
- Protected and guest-only routes
- Admin analytics panel (user, task and goal counts)
- Rate limiting per IP (100 req/min)
- Skeleton loading states and minimum delay UX

## Project Structure

```
calendallica/
├── client/          # React frontend
├── server/          # Spring Boot backend
```

## Getting Started

### Prerequisites

- Node.js ≥ 22.12.0
- Java 17
- MySQL

### Frontend

```bash
cd client
npm install
# create client/.env with VITE_API_URL=http://localhost:8000
npm run client
```

### Backend

```bash
cd server
# create server/src/main/resources/application-local.properties with DB and JWT credentials
./mvnw spring-boot:run
```

Full setup details in [client/README.md](./client/README.md) and [server/README.md](./server/README.md).

## Test Credentials

| Role | Username | Password |
|------|----------|---------|
| User | `user` | `userpassword` |

## License

MIT
