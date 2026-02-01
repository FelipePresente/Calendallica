# <img src="public/icons/logo.png" width="300" alt="Calendallica">

A high-performance, full-stack productivity tool that merges a visual calendar interface with task management. Built with **Node.js** and **MongoDB**, **Calendallica** focuses on a premium user experience, minimalist aesthetics, and advanced security.

### 🌐 [Live Preview: calendallica.onrender.com](https://calendallica.onrender.com/)

---

## ⚙️ Features

*   **Dynamic Calendar Interface:** 
    *   Interactive grid system for fast date navigation.
    *   Real-time task visualization directly on the calendar cells.
*   **Secure Task Management:**
    *   Create, Read, Update, and Delete (CRUD) tasks with input sanitization.
    *   **HTML Support:** Controlled styling (colors, tags like `<b>`, `<i>`, `<br>`) via **Sanitize-HTML** to allow user creativity without XSS risks.
*   **Professional Authentication:**
    *   Session management via **JWT** (JSON Web Tokens) stored in **HttpOnly Cookies**.
    *   Secure **Password Hashing** with **Bcrypt**.
*   **Robust Middleware System:**
    *   **Data Normalization:** Automatic `trimming` and `lowercase` conversion for usernames.
    *   **Auth Protection:** Route guarding to ensure private data remains private.
*   **Modern Aesthetics:** Dark-themed UI crafted with **Tailwind CSS 4** and premium animations.

## 🛠️ Tech Stack

**Backend**
*   **Runtime:** Node.js & Express.js
*   **Database:** MongoDB Atlas & Mongoose ODM
*   **Security:** Bcrypt (Hashing), JSON Web Tokens (JWT) & Sanitize-HTML
*   **Utilities:** Dotenv & Cookie-Parser

**Frontend**
*   **Structure & Logic:** HTML5 & JavaScript (ES6+ Module Pattern)
*   **Styling:** Tailwind CSS 4
*   **Typography:** Outfit (Google Fonts)

## 🚀 How to Run

1.  **Clone and Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start the Server**
    ```bash
    npm run server
    ```

3.  **Access the Application**
    *   Open `http://localhost:8000` in your browser.

## 👤 Credentials for Testing

To explore the dashboard and calendar features:

*   **User Access:**
    *   Username: `user`
    *   Password: `userpassword`
    # ALL TASKS CREATED IN THE USER ACCESS ACCOUNT ARE PUBLIC