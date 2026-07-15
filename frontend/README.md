# CrowdSense AI Frontend

Frontend foundation for CrowdSense AI, a fan-focused smart stadium decision support application.

This phase includes only the React project foundation. It does not include CSV upload functionality, Firebase logic, Leaflet map rendering, AI recommendation logic, Gemini integration, or backend business calls.

## Tech Stack

- React 19
- Vite
- Material UI
- React Router DOM
- Axios
- React Icons
- React Hook Form
- Leaflet dependency for later map work
- Firebase dependency for later authentication and data work

## Installation

```bash
npm install
```

Create local environment variables:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting and formatting checks:

```bash
npm run lint
npm run format:check
```

## Dependency Purpose

- `react`: UI rendering foundation.
- `react-dom`: browser DOM integration for React.
- `react-router-dom`: route definitions, layout routing, nested routes, and 404 handling.
- `@mui/material`: Material UI component foundation.
- `@emotion/react` and `@emotion/styled`: required styling engine for Material UI.
- `axios`: configured API client foundation for later backend communication.
- `react-icons`: icon system for navigation and reusable UI components.
- `react-hook-form`: form state foundation for later upload and auth screens.
- `leaflet`: installed for the later map phase only.
- `firebase`: installed for the later authentication and Firebase client phase only.
- `@fontsource/inter`: local Inter font assets for consistent typography.
- `vite`: frontend build tool and dev server.
- `@vitejs/plugin-react`: React support for Vite.
- `eslint`: code quality checks.
- `prettier`: formatting consistency.
- `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`: ESLint support for modern React and Vite.

## Folder Structure

```text
frontend/
  src/
    assets/        Static app assets
    components/    Reusable common, feedback, loading, and layout UI
    config/        Environment configuration
    constants/     App, navigation, and status constants
    contexts/      React providers for app-level UI state
    features/      Future feature modules
    hooks/         Reusable hooks
    pages/         Route-level page placeholders
    routes/        Router configuration
    services/      Axios API client and future service adapters
    styles/        Global CSS strategy and responsive layout styles
    theme/         Material UI theme and theme provider
    utils/         Date, time, status, and request helpers
    App.jsx        Root app composition
    main.jsx       React entry point
```

## Routes

- `/`
- `/upload`
- `/map`
- `/recommendation`
- `/history`
- `/about`
- `/login`

## Environment Variables

- `VITE_APP_NAME`: display name for the frontend.
- `VITE_API_BASE_URL`: backend API base URL for later service calls.
- `VITE_API_TIMEOUT_MS`: default Axios timeout.
- `VITE_ENABLE_DEMO_MODE`: feature flag for future demo-only controls.
