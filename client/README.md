# ⚛️ Calendallica Client (Frontend)

The frontend of Calendallica is a high-performance Single Page Application (SPA) built with React and TypeScript, focused on a premium dark-themed minimalist experience.

## 🛠️ Stack

- **Framework:** React 18
- **Tooling:** Vite + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Custom SVG assets
- **Routing:** React Router DOM

## 🏗️ Architecture

The project follows a modular structure separated into:

### 🧩 Components
Reusable UI elements like `Logo`, `SubmitButton`, `Orb` (glassmorphism backgrounds), and custom calendar cell components.

### 📄 Pages
- **Home**: Landing page.
- **Login/SignUp**: Authentication forms.
- **Dashboard**: Main interactive area (Calendar + Tasks + Goals).
- **Admin**: Internal metrics dashboard.

### 🪝 Custom Hooks
The logic is extracted into reusable hooks to keep components clean:
- `useCalendar`: Manages date manipulation, navigation, and grid generation.
- `useTasks`: Fetches and manages the user's task list.
- `useGoals`: Handles personal achievement data.
- `useUserData`: Manages authentication state and protected route logic.
- `useMetrics`: Provides real-time stats for the admin panel.
- `useMinTimeElapsed`: Controls skeleton loading states for a smoother UX.

### 🌐 Services
Centralized API communication layer using `fetch` with credential support.

## 🎨 Styling

We use **Tailwind CSS** with a custom color palette based on `zinc` and `indigo` tones. 
- **Dark Mode**: Native and primary design.
- **Glassmorphism**: Subtle blur effects on modals and headers.
- **Responsive**: Fully optimized for mobile, tablet, and desktop views.

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.
