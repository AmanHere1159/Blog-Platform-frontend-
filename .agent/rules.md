---
trigger: always_on
---

# Project: Blog Platform Frontend

## Overview
This is a modern React/Vite frontend for a blog platform. It features a responsive UI, blog discovery, article creation, and a feedback system.

## Tech Stack
- **Library**: React (v19)
- **Build Tool**: Vite (v7)
- **Styling**: TailwindCSS (v4)
- **Routing**: React Router Dom (v7)
- **Animations**: Framer Motion
- **API Client**: Fetch API & Axios

## Project Structure
```
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration with React and Tailwind plugins
├── tailwind.config.js    # Tailwind configuration
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Root component with routing definitions
│   ├── App.css           # Global CSS styles
│   ├── index.css         # Tailwind directives and base styles
│   ├── .env              # Environment variables
│   ├── assets/           # Static assets (images, icons)
│   ├── Navbar.jsx        # Navigation component
│   ├── Home.jsx          # Blog listing page
│   ├── BlogDisplay.jsx   # Detailed blog view with comments and editing
│   ├── NewBlog.jsx       # Blog creation form
│   ├── Login.jsx         # User authentication page
│   ├── Logout.jsx        # Logout logic component
│   ├── About.jsx         # About page
│   └── Contact.jsx       # Contact page
```

## Coding Conventions

### General
- Use Functional Components with React Hooks.
- Prefer ES Modules (`import`/`export`) — no `require()`.
- Use `framer-motion` for smooth transitions and interactions.
- Always include `credentials: "include"` (Fetch) or `withCredentials: true` (Axios) when interacting with the backend to handle JWT cookies.

### Naming
- Components: PascalCase (e.g., `BlogDisplay.jsx`).
- Styles: standard Tailwind utility classes.
- Asset files: lowercase or kebab-case.

### API Integration
- Backend Base URL: `http://localhost:5004` (Hardcoded in components, move to `.env` if possible).
- API Routes:
  - `GET /Blogs/getAllData` — Fetch all blogs.
  - `GET /Blogs/getSingleUser/:id` — Fetch a single blog by ID.
  - `POST /Blogs/upload` — Upload a new blog (uses `FormData`).
  - `PUT /Blogs/addComment/:id` — Add a comment.
  - `DELETE /Blogs/deleteComment/:id/:commentId` — Delete a comment.
- Static Media:
  - Images: `http://localhost:5004/uploads/`
  - Audio: `http://localhost:5004/Audio/`

### Styling
- Use TailwindCSS v4 utility classes.
- UI Design: Modern, rounded corners (`rounded-3xl`), heavy use of shadows and backdrop blurs.
- Primary Color Theme: Indigo (`indigo-600`, `indigo-50`, etc.).
- Responsive: Ensure layouts work on mobile (`sm:`, `md:`, `lg:` prefixes).

### State Management
- Use `useState` for local component state.
- Use `useEffect` for data fetching and side effects.
- Use `useParams` and `useLocation` for route-based data.

## Environment Variables
- `VITE_API_URL` — Should point to the backend URL.

## Running the Project
- **Dev**: `npm run dev` (starts on `http://localhost:5173`)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
