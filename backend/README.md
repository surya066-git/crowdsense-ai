# CrowdSense AI Backend

Backend foundation for CrowdSense AI, a fan-focused smart stadium decision support system for the Hack2Skill PromptWars Virtual Challenge 4.

This phase includes only the backend foundation. It does not include the AI recommendation engine, Gemini integration, CSV processing, map logic, or frontend code.

## Tech Stack

- Node.js 20 LTS
- Express.js
- Firebase Admin SDK
- Firestore
- Firebase Storage
- Firebase Authentication
- Cloud Run

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

## Available Scripts

- `npm run dev`: starts the local server with Nodemon.
- `npm start`: starts the production server.
- `npm test`: runs Jest tests.
- `npm run test:watch`: runs Jest in watch mode.
- `npm run lint`: runs ESLint.
- `npm run format`: formats files with Prettier.
- `npm run format:check`: checks formatting without writing changes.

## Dependency Purpose

- `express`: HTTP server and route foundation.
- `cors`: controlled frontend-backend access.
- `helmet`: secure HTTP headers.
- `morgan`: request logging.
- `dotenv`: local environment variable loading.
- `firebase-admin`: Firestore, Storage, and Authentication from trusted backend code.
- `multer`: upload middleware foundation for later file upload APIs.
- `csv-parser`: installed for the later CSV processing phase, not used in this foundation.
- `uuid`: request IDs and traceability.
- `joi`: request and environment validation.
- `compression`: response compression.
- `express-rate-limit`: API protection against excessive traffic.
- `pino`: structured application logging.
- `nodemon`: local development reload.
- `jest`: test runner.
- `supertest`: API testing.
- `eslint`: code quality.
- `prettier`: code formatting.
- `cross-env`: cross-platform environment variables in scripts.
- `@eslint/js` and `globals`: ESLint flat configuration support.

## Folder Structure

```text
backend/
  src/
    config/         Environment, CORS, Firebase, and rate-limit config
    constants/      Shared API, role, collection, and file constants
    controllers/    Thin HTTP controllers
    errors/         Application errors and stable error codes
    firebase/       Firebase Admin initialization and service accessors
    middlewares/    Request ID, auth, validation, security, logging, errors
    models/         Shared response models
    prompts/        Reserved for future AI prompt assets
    repositories/   Data access abstractions
    routes/         Versioned route namespaces
    services/       Use-case services
    tests/          Unit, integration, and API tests
    utils/          Logger and response helpers
    validators/     Reusable validation schemas
    app.js          Express application setup
    server.js       Runtime bootstrap and graceful shutdown
  logs/             Local log folder placeholder
  uploads/          Local upload folder placeholder
```

## Environment Variables

- `NODE_ENV`: runtime environment.
- `PORT`: HTTP port. Cloud Run provides this automatically.
- `API_VERSION`: API version prefix, for example `v1`.
- `APP_NAME`: service name used in logs and health responses.
- `FRONTEND_ORIGIN`: comma-separated CORS allowlist.
- `FIREBASE_PROJECT_ID`: Firebase project ID.
- `FIREBASE_STORAGE_BUCKET`: Firebase Storage bucket.
- `GOOGLE_APPLICATION_CREDENTIALS`: local service account path for development only.
- `RATE_LIMIT_WINDOW_MS`: global rate limit time window.
- `RATE_LIMIT_MAX_REQUESTS`: max requests per rate limit window.
- `UPLOAD_RATE_LIMIT_MAX_REQUESTS`: stricter upload endpoint limit.
- `REQUEST_TIMEOUT_MS`: request timeout in milliseconds.
- `MAX_UPLOAD_SIZE_MB`: upload size limit for future upload routes.
- `LOG_LEVEL`: logging level such as `debug`, `info`, `warn`, or `error`.
- `ENABLE_DEMO_MODE`: enables controlled hackathon demo behavior.
- `ADMIN_EMAILS`: comma-separated admin allowlist for future authorization use.

## API Foundation

Base prefix:

```text
/api/v1
```

Implemented foundation endpoint:

```text
GET /api/v1/health
```

Placeholder route groups:

- `/api/v1/auth`
- `/api/v1/uploads`
- `/api/v1/recommendations`
- `/api/v1/stadiums`
- `/api/v1/gates`
- `/api/v1/incidents`
- `/api/v1/weather`
- `/api/v1/demo-sessions`

## Deployment Notes

The service is ready for Cloud Run style deployment:

- Reads dynamic `PORT`
- Uses stateless Express runtime
- Provides a health endpoint
- Emits structured logs
- Handles graceful shutdown
- Keeps secrets out of source control
