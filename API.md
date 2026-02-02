# System & API Documentation

This document provides a comprehensive overview of the **Calendallica** system architecture, including its backend components, data models, middleware pipeline, helpers, and API endpoints.

---

## System Architecture

The application is a **Node.js** web server built with **Express**, following a Modular Monolithic architecture. It connects to a **MongoDB** database using **Mongoose** as the ODM (Object Data Modeling) library.

### Core Components

#### 1. Server Entry Point (`server.js`)
The `server.js` file is the backbone of the application. It initializes the Express app and configures:
- **Database Connection:** Connects to MongoDB Atlas via `mongoose.connect()`.
- **Global Middleware:** Applies parsing, sanitization, and normalization layers to every request.
- **Route Mounting:** Defines the base paths for `/users` and `/tasks`.
- **Static Assets:** Serves frontend files from the `public/` directory.
- **Dashboard Access:** Protects the `/dashboard` route with the `auth` middleware.
- **Root Redirection:** The root path `/` checks for authentication and redirects logged-in users to `/dashboard`.

### 2. Database Models (`models/`)
All data schemas are strict and managed via Mongoose.

- **User Model (`User.js`)**
    - `username`: String (Unique, Required)
    - `password`: String (Required, Hashed)
    - `role`: String (Default: 'user') - Included for potential future access control.

- **Task Model (`Task.js`)**
    - `date`: Date (Required)
    - `title`: String (Required)
    - `description`: String (Required)
    - `userId`: ObjectId (Required, Reference to User)
    - **TTL Index:** Tasks are automatically deleted 24 hours (`86400` seconds) after their `date` value.

---

## Middleware Pipeline

Middlewares intercept requests to process data, handle security, or manage flow before reaching the route handlers.

### Global Middlewares (Applied to all routes)

| Middleware | File | Description |
| :--- | :--- | :--- |
| **Parsing** | N/A (Express Native) | `express.json()`, `express.urlencoded()`, and `cookie-parser`. |
| **Sanitizer** | `middlewares/sanitizer.js` | Uses `sanitize-html` to clean string fields in `req.body`, allowing only specific tags (e.g., `<b>`, `<i>`) and safe styles. |
| **Trimmer** | `middlewares/trimmer.js` | Removes leading/trailing whitespace from string fields in `req.body`. |
| **LowerCase** | `middlewares/lowerCase.js` | Converts `username` and `email` fields to lowercase to ensure consistency. |

### Security Middlewares

| Middleware | File | Description |
| :--- | :--- | :--- |
| **Auth (Token Verifier)** | `middlewares/auth.js` | Verifies JWT tokens from `session-cookie`. Checks if the user exists in DB. If valid, attaches user to `req.user`; otherwise, redirects to `/signup` or handles logout. |

---

## Helpers / Utilities

Helper functions that encapsulate specific logic to keep the code DRY and clean. These are located in the `helpers/` directory.

| Helper | File | Description |
| :--- | :--- | :--- |
| **User Verifications** | `helpers/userVerifications.js` | Centralizes validation logic for user registration and login (field requirements, length checks, password rules). Returns `true` if an error response was sent, `false` otherwise. |
| **Create Token** | `helpers/createToken.js` | Generates a Signed JWT containing the user's ID, username, and role. |
| **Create Session Cookies** | `helpers/createSessionCookies.js` | Sets the `session-cookie` (HttpOnly, JWT) and `session-info` (Public, JSON) cookies on the response object. |
| **Hash Password** | `helpers/hashPassword.js` | Uses `bcrypt` to securely hash passwords (salt rounds: 12) before saving to the DB. |
| **Compare Password** | `helpers/comparePassword.js` | Uses `bcrypt` to compare a plaintext password with the stored hash during login. |

---

## API Endpoints

### Authentication & Authorization

- **Authentication Method:** JWT (JSON Web Tokens) stored in HttpOnly Cookies (`session-cookie`).
- **Authorization:** 
    - **Protected Routes:** Require a valid JWT (e.g., `/tasks`, `/dashboard`).
- **Client-Side:** Public user information is stored in a non-HttpOnly cookie (`session-info`) for UI logic.

### Users (`/users`)

#### 1. Register User
Creates a new user account.

- **URL:** `/users/signup`
- **Method:** `POST`
- **Sanitization:** Auto-trims inputs; `username` converts to lowercase.
- **Validation:** Controlled by `userVerifications` helper.
    - `username`: 4-12 chars.
    - `password`: 8-35 chars, no spaces.
    - `passwordConfirmation`: Must match `password`.
- **Response:** 
    - 200 OK: Sets `session-cookie` (HttpOnly, 14 days) and `session-info`. Returns JSON message.

#### 2. User Login
Authenticates a user.

- **URL:** `/users/login`
- **Method:** `POST`
- **Validation:** Controlled by `userVerifications` helper.
- **Body:** `username`, `password`
- **Response:** 
    - 200 OK: Sets `session-cookie` (HttpOnly, 14 days) and `session-info`. Returns "You are logged in".
    - 401 Unauthorized: Invalid credentials.

#### 3. User Logout
Invalidates the session.

- **URL:** `/users/logout`
- **Method:** `GET`
- **Response:** Clears `session-cookie` and `session-info`, then redirects to `/`.

### Tasks (`/tasks`)

All task routes are **Protected** (Require Authentication) and scoped to the logged-in user.

#### 1. List My Tasks
Retrieves all tasks belonging to the current user.

- **URL:** `/tasks`
- **Method:** `GET`
- **Response:** JSON array of task objects (excludes `userId` and `__v`).

#### 2. Create Task
Adds a new task for the user.

- **URL:** `/tasks`
- **Method:** `POST`
- **Validations:** 
    - Title max 50 chars, Description max 300 chars.
    - Date cannot be in the past (measured against server time).
- **Body:** `date`, `title`, `description`.
- **Response:** 201 Created.

#### 3. Update Task
Updates an existing task.

- **URL:** `/tasks/:taskId`
- **Method:** `PATCH`
- **Validations:** Same character limits as creation.
- **Body:** `date`, `title`, `description`.
- **Response:** 200 OK if successful, 404 if task not found or unauthorized.

#### 4. Delete Task
Removes a task.

- **URL:** `/tasks/:taskId`
- **Method:** `DELETE`
- **Response:** 200 OK if successful, 400 if task not found or unauthorized.