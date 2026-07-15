# Deployment & Testing Documentation

## 1. Google Cloud Deployment
CrowdSense AI leverages Google Cloud Platform for extreme scalability.

### Firebase Hosting (Frontend)
- The React application is built via Vite and deployed to Firebase Hosting.
- Configured as a Single Page Application (SPA) where all paths rewrite to `index.html`.
- Implements edge caching headers (`Cache-Control: max-age=31536000`) for static assets to ensure sub-second map rendering.

### Cloud Run (Backend)
- Deployed as a Dockerized Node.js container.
- Auto-scales from 0 instances during downtime (saving costs) up to 100 instances during massive events.
- Secrets (`GEMINI_API_KEY`) are injected securely via Google Cloud Secret Manager at runtime.

---

## 2. Testing Framework
We utilize an enterprise testing pyramid to validate system integrity.

### Tooling
- **Jest**: Core test runner for both Node.js and React.
- **Supertest**: For API integration testing.
- **React Testing Library**: For validating UI component renders and accessibility.

### Coverage
1. **Decision Engine Tests**: Mathematically verifies that Distance and Queue penalties subtract the correct percentages.
2. **Simulation Integration**: End-to-end tests ensuring that triggering a `GATE_CLOSE` event correctly updates the `map.service.js` cache and the next `/recommendations` API call routes away from that gate.
3. **UI HeroCard Tests**: Verifies that walking times, waiting times, and safety scores accurately render on the DOM based on mock JSON data.
