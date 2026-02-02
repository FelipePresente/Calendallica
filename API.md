# API Documentation

This documentation details the endpoints available in the Calendallica application.

## Authentication & Authorization

- **Authentication Method:** JWT (JSON Web Tokens) stored in HttpOnly Cookies (`session-cookie`).
- **Authorization:** Protected routes require a valid JWT token. Middleware (`auth.js`) automatically validates tokens for private routes.
- **Client-Side:** Public user information is stored in a non-HttpOnly cookie (`session-info`) for frontend.

---

## Users

### 1. User Registration
Creates a new user account with secure password hashing.

- **URL:** `/users/signup`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Request Body Parameters:**

| Parameter | Type | Required | constraints |
| :--- | :--- | :--- | :--- |
| `username` | String | Yes | 4 to 12 characters, lowercase converted |
| `password` | String | Yes | 8 to 35 characters, no spaces |
| `passwordConfirmation` | String | Yes | Must match `password` |

**Responses:**

- **Success (200):** `{ "message": "User created succesfully" }` (Sets Auth Cookies)
- **Client Error (400):** 
    - "All fields must be filled"
    - "The passwords must be equal"
    - "Username minimum number of characters is 4"
    - "Username maximum number of characters is 12"
    - "Password fields minimum number of characters is 8"
    - "Password fields maximum number of characters is 35"
    - "Password must not include spaces"
    - "Username already exists"
- **Server Error (500):** "Error creating user"

---

### 2. User Login
Authenticates a user and establishes a session via cookies.

- **URL:** `/users/login`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Request Body Parameters:**

| Parameter | Type | Required | constraints |
| :--- | :--- | :--- | :--- |
| `username` | String | Yes | Max 12 characters, lowercase converted |
| `password` | String | Yes | Max 35 characters, no spaces |

**Responses:**

- **Success (200):** "You are logged in" (Sets `session-cookie` and `session-info` cookies)
- **Client Error (400):** Validation errors (missing fields, length limits).
- **Unauthorized (401):** "Invalid credentials" (User not found or password mismatch).
- **Server Error (500):** "Error logging in" (Generic error message for security).

---

### 3. User Logout
Invalidates the user session by clearing authentication cookies.

- **URL:** `/users/logout`
- **Method:** `GET`

**Responses:**

- **Success (302):** Clears `session-cookie` and `session-info` cookies and redirects to `/` (Home).

---

## Tasks

### 1. List User Tasks
Retrieves all tasks belonging to the authenticated user.

- **URL:** `/tasks`
- **Method:** `GET`
- **Access:** Protected (Requires valid Auth Token)

**Responses:**

- **Success (200):** Returns an array of task objects (JSON).
- **Client Error (400):** "User id is needed" (If token payload is missing ID).
- **Server Error (500):** "Error trying to get tasks"

---

### 2. Create Task
Adds a new task to the user's calendar.

- **URL:** `/tasks`
- **Method:** `POST`
- **Access:** Protected (Requires valid Auth Token)

**Request Body Parameters:**

| Parameter | Type | Required | constraints |
| :--- | :--- | :--- | :--- |
| `date` | Date (ISO) | Yes | Valid date format, cannot be in the past |
| `title` | String | Yes | 1 to 50 characters, HTML Sanitized |
| `description` | String | Yes | 1 to 300 characters, HTML Sanitized |

**Responses:**

- **Success (201):** "Task created successfully"
- **Client Error (400):** 
    - "All fields must be filled"
    - "The character limit has been exceeded"
    - "Can't create tasks for past days" (Validated against User local time + 24h grace period)
- **Server Error (500):** "Error trying to create task"

---

### 3. Update Task
Updates an existing task's details.

- **URL:** `/tasks/:taskId`
- **Method:** `PATCH`
- **Access:** Protected (Requires valid Auth Token & Ownership)

**URL Parameters:**

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `taskId` | String | The unique MongoDB Object ID of the task |

**Request Body Parameters:**

| Parameter | Type | Required | constraints |
| :--- | :--- | :--- | :--- |
| `date` | Date (ISO) | Yes | Valid date format |
| `title` | String | Yes | 1 to 50 characters, HTML Sanitized |
| `description` | String | Yes | 1 to 300 characters, HTML Sanitized |

**Responses:**

- **Success (200):** "Task updated successfully"
- **Client Error (400):** 
    - "All fields must be filled"
    - "The character limit has been exceeded"
- **Not Found / Unauthorized (404):** "Task not found or unauthorized" (If task ID doesn't exist or doesn't belong to the user)
- **Server Error (500):** "Error trying to edit task"

---

### 4. Delete Task
Removes a task from the user's calendar.

- **URL:** `/tasks/:taskId`
- **Method:** `DELETE`
- **Access:** Protected (Requires valid Auth Token & Ownership)

**URL Parameters:**

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `taskId` | String | The unique MongoDB Object ID of the task |

**Responses:**

- **Success (200):** "Task deleted successfully"
- **Client Error (400):** "All fields must be filled" (Missing taskId) or "Task not found or unauthorized"
- **Server Error (500):** "Error trying to delete task"