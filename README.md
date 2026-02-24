# 🗓️ Calendallica

A premium full-stack productivity tool that merges a visual calendar interface with dual task and goal management. Built with a modern tech stack focused on performance, minimalist aesthetics, and advanced security.

<p align="center">
  <img src="client/src/assets/logo.png" width="200" alt="Calendallica">
</p>

---

## 🏗️ Project Structure

This project is organized as a monorepo:

*   **`client/`**: Frontend application built with **React**, **TypeScript**, and **Vite**.
*   **`server/`**: Backend API built with **Node.js**, **Express**, and **MongoDB**.
*   **`shared/`**: Shared TypeScript types used by both frontend and backend for full type safety.

---

## ⚙️ Core Features

*   **Dynamic Calendar System:** Interactive grid for date navigation and visual task tracking.
*   **Dual-Layer Organization:**
    *   **Tasks:** Date-specific entries with automatic expiration to keep your view clean.
    *   **Goals:** Long-term personal achievements managed in a dedicated sidebar.
*   **Secure Authentication:** JWT-based session management with HttpOnly cookies and Bcrypt password hashing.
*   **Advanced Middleware:** Content sanitization (XSS protection), data normalization, and rate limiting.
*   **Premium UI/UX:** Dark-mode design with smooth animations, built using Tailwind CSS.

---

## 🛠️ Global Tech Stack

### Frontend
- React 18+
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Sanitize-HTML & Express-Rate-Limit

---

## 🚀 Getting Started

### 1. Installation

Install dependencies in the root, client, and server folders:

```bash
# Global (if applicable)
npm install

# Client
cd client && npm install

# Server
cd ../server && npm install
```

### 2. Configuration

Create `.env` files in both `client/` and `server/` based on the provided environment requirements.

### 3. Running Locally

You can run both parts in parallel:

```bash
# In one terminal
cd client && npm run dev

# In another terminal
cd server && npm run dev (or npm start)
```

---

## 👤 Credentials for Testing

To explore the dashboard and calendar features:

*   **User Access:**
    *   Username: `user`
    *   Password: `userpassword`

---

## 📄 Documentation

*   [Client Documentation](./client/README.md)
*   [Server API Documentation](./server/README.md)
