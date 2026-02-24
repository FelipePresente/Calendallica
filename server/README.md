# 🚀 Calendallica Server (API)

The backend of Calendallica is a robust Express.js API that manages authentication, task persistence, and goal tracking.

## 🛠️ Technologies

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** 
    - `bcrypt`: Password hashing.
    - `jsonwebtoken`: Authentication tokens.
    - `express-rate-limit`: Brute-force/DoS protection.
    - `sanitize-html`: XSS prevention.

## 📡 API Routes

### 🔐 Authentication (`/users`)
- `POST /users/signup`: Register a new account.
- `POST /users/login`: Authenticate and receive a JWT cookie.
- `POST /users/logout`: Clear session cookies.

### 📝 Tasks (`/tasks`)
- `GET /tasks`: Retrieve all tasks for the logged-in user.
- `POST /tasks`: Create a new task.
- `PATCH /tasks`: Update an existing task.
- `DELETE /tasks`: Remove a task.

### 🎯 Goals (`/goals`)
- `GET /goals`: List all personal goals.
- `POST /goals`: Define a new goal.
- `PATCH /goals`: Modify a goal.
- `DELETE /goals`: Remove a goal.

### 📊 Admin (`/admin`)
- `GET /admin/metrics`: Summary of platform usage (Users, Tasks, Goals count).
*Note: Requires admin role.*

### 🔍 Health (`/status`)
- `GET /status/ping`: Simple endpoint to check if the server is awake.
- `GET /status/me`: Gets the username and role of the provided user

## 🛡️ Middlewares

The API uses a sophisticated middleware pipeline:
1. **Sanitizer**: Strips dangerous HTML tags from all incoming body fields.
2. **Trimmer**: Removes whitespace from string inputs.
3. **LowerCase**: Normalizes specific fields (like usernames) to lowercase.
4. **Auth**: Guards protected routes and attaches user data to the request.
5. **Rate-Limit**: Restricts the number of requests to prevent abuse.

## ⚙️ Environment Variables

Create a `.env` file in this directory:

```env
PORT=8000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```
