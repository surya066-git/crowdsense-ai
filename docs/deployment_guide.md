# CrowdSense AI: Production Deployment & Infrastructure Guide

This guide details the production architecture, setup steps, security controls, cost optimizations, and disaster recovery strategies for **CrowdSense AI**. It serves as the primary runbook for administrators, SREs, and DevOps engineers.

---

## 1. Final Production Architecture

The application layout decouples static client delivery from dynamic backend processing.

```mermaid
graph TD
    User([User Browser])
    
    subgraph "Edge / CDN Layer (Firebase Services)"
        FH["Firebase Hosting (CDN)"]
        Auth["Firebase Authentication"]
    end
    
    subgraph "Application Logic (Google Cloud Platform)"
        CR["Google Cloud Run (Express API)"]
        SM["Google Cloud Secret Manager"]
    end
    
    subgraph "Data & AI Layer"
        FS["Firebase Firestore"]
        Storage["Firebase Storage"]
        Gemini["Google Gemini API"]
    end

    User -->|1. Requests SPA| FH
    FH -->|2. Loads React App| User
    User -->|3. Signs In / Token| Auth
    User -->|4. Directly Reads Live State| FS
    User -->|5. Uploads CSV Files| Storage
    User -->|6. REST API Request (with Auth Header)| CR
    CR -->|7. Fetches API Key| SM
    CR -->|8. Accesses Firestore Data| FS
    CR -->|9. Processes Decision Engine| CR
    CR -->|10. Enhances with Prompt Engine| Gemini
```

### Data Flow Path
1.  **Static Client Delivery**: The browser resolves `crowdsense-ai-prod.web.app` from **Firebase Hosting**, downloading the minified React SPA (optimized chunks are cached by CDN edge nodes).
2.  **Authentication**: The client authenticates directly with **Firebase Authentication**, receiving an ID Token.
3.  **Dynamic Requests**: The client makes HTTP requests to the **Google Cloud Run** API endpoint, passing the Firebase ID Token in the `Authorization` header.
4.  **Backend Processing**: The Express API on Cloud Run receives the request, validates the token using the Firebase Admin SDK, and executes the **Decision Engine**.
5.  **GenAI Context**: The backend calls the **Google Gemini API** using a key fetched from **Google Cloud Secret Manager** to generate stadium crowd recommendations.
6.  **Direct Cloud Database Sync**: Live state values and recommendation history are written to **Firebase Firestore** and **Firebase Storage** by the backend, which the clients read in real-time.

---

## 2. Infrastructure Setup & CLI Commands

Follow these instructions to set up the infrastructure from scratch.

### Prerequisites
*   Install [Node.js v20+](https://nodejs.org/).
*   Install [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install).
*   Install [Firebase CLI](https://firebase.google.com/docs/cli).
*   Create a Firebase project named `crowdsense-ai-prod` (which automatically creates a GCP project).

### Step 2.1: Google Cloud SDK Initialization
```powershell
# Log in to Google Cloud Account
gcloud auth login

# Set the active project
gcloud config set project crowdsense-ai-prod

# Enable necessary Google Cloud Service APIs
gcloud services enable `
  run.googleapis.com `
  artifactregistry.googleapis.com `
  secretmanager.googleapis.com `
  firestore.googleapis.com `
  storage.googleapis.com
```

### Step 2.2: Secret Manager Setup
Set up the Gemini API Key inside GCP Secret Manager:
```powershell
# Create the secret placeholder
gcloud secrets create gemini-key --replication-policy="automatic"

# Add the Gemini API Key value to the secret
echo "YOUR_GEMINI_API_KEY" | gcloud secrets versions add gemini-key --data-file=-
```

### Step 2.3: Google Artifact Registry (GAR) Setup
Create a secure Docker registry repository in your target region:
```powershell
# Create repository for backend Docker images
gcloud artifacts repositories create repo `
    --repository-format=docker `
    --location=us-central1 `
    --description="Docker repository for CrowdSense AI"
```

### Step 2.4: Firebase CLI Login & Initialization
```powershell
# Log in to Firebase CLI
firebase login

# Deploy Firestore Security Rules and Indexes from the root directory
firebase deploy --only firestore

# Deploy Storage Security Rules from the root directory
firebase deploy --only storage
```

### Step 2.5: Cloud Run Backend Deployment (Manual Run)
Run this command if you are manually creating or updating the Cloud Run service instead of pushing via CI/CD:
```powershell
# In the backend directory
cd backend

# Build image locally and push to GAR
gcloud builds submit --tag us-central1-docker.pkg.dev/crowdsense-ai-prod/repo/crowdsense-backend:latest

# Deploy to Cloud Run
gcloud run deploy crowdsense-backend `
    --image=us-central1-docker.pkg.dev/crowdsense-ai-prod/repo/crowdsense-backend:latest `
    --region=us-central1 `
    --allow-unauthenticated `
    --min-instances=0 `
    --max-instances=5 `
    --concurrency=80 `
    --cpu=1 `
    --memory=512Mi `
    --timeout=30s `
    --set-env-vars="NODE_ENV=production,FRONTEND_ORIGIN=https://crowdsense-ai-prod.web.app,FIREBASE_PROJECT_ID=crowdsense-ai-prod,FIREBASE_STORAGE_BUCKET=crowdsense-ai-prod.firebasestorage.app" `
    --set-secrets="GEMINI_API_KEY=gemini-key:latest"
```

### Step 2.6: Frontend Build & Deployment (Manual Run)
To build and deploy the React frontend manually:
```powershell
# In the frontend directory
cd frontend

# Set temporary build-time variables (or copy production .env)
$env:VITE_API_BASE_URL="https://crowdsense-backend-xxx-uc.a.run.app/api/v1"
$env:VITE_FIREBASE_API_KEY="AIzaSy..."
$env:VITE_FIREBASE_AUTH_DOMAIN="crowdsense-ai-prod.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID="crowdsense-ai-prod"
$env:VITE_FIREBASE_STORAGE_BUCKET="crowdsense-ai-prod.firebasestorage.app"

# Compile production bundle
npm run build

# Deploy Hosting to Firebase
cd ..
firebase deploy --only hosting
```

---

## 3. Environment & Configuration Variables

### Backend Configuration (`backend/.env`)
| Variable | Production Value | Purpose / Action |
| :--- | :--- | :--- |
| `PORT` | `8080` | Bind port for Express server. Set automatically by Cloud Run. |
| `NODE_ENV` | `production` | Optimizes Express performance and limits stack trace logging. |
| `API_VERSION` | `v1` | Routes requests to `/api/v1/...`. |
| `FRONTEND_ORIGIN` | `https://crowdsense-ai-prod.web.app` | Configures Cors access control allow list. |
| `FIREBASE_PROJECT_ID` | `crowdsense-ai-prod` | Project identifier for Firebase Admin initialization. |
| `FIREBASE_STORAGE_BUCKET` | `crowdsense-ai-prod.firebasestorage.app` | Cloud Storage bucket link. |
| `GOOGLE_APPLICATION_CREDENTIALS` | *Unset / Empty* | Tells Firebase Admin SDK to fall back to Cloud Run Identity default. |
| `GEMINI_API_KEY` | *Secret Manager* | Connected to Secret Manager version `gemini-key:latest`. |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Window (15 minutes) for API request threshold. |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Limits total calls per client IP to 100 per 15 minutes. |
| `LOG_LEVEL` | `info` | Filter for pino log outputs (minimizes volume charges). |

### Frontend Configuration (`frontend/.env`)
All client variables are compiled into the build package.
| Variable | Production Value | Purpose |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://crowdsense-backend-xxx.a.run.app/api/v1` | Cloud Run service HTTP entrypoint. |
| `VITE_FIREBASE_API_KEY` | `AIzaSyYourProductionAPIKey` | Firebase Web API Key for Auth / Store connectivity. |
| `VITE_FIREBASE_AUTH_DOMAIN` | `crowdsense-ai-prod.firebaseapp.com` | Authentication callback endpoints. |
| `VITE_FIREBASE_PROJECT_ID` | `crowdsense-ai-prod` | Firebase project identifier. |
| `VITE_FIREBASE_STORAGE_BUCKET` | `crowdsense-ai-prod.firebasestorage.app` | Storage bucket endpoint. |

---

## 4. Security Infrastructure Details

### 4.1. Helmet Integration
Helmet sets secure HTTP response headers on the Cloud Run API:
*   `Cross-Origin-Resource-Policy`: Set to `cross-origin` to allow static content loading.
*   `X-Content-Type-Options`: Set to `nosniff` to avoid MIME sniffing vulnerabilities.
*   `X-Frame-Options`: Configured via Firebase Hosting headers to `DENY` to protect against clickjacking.

### 4.2. Rate Limiting
Implemented on Cloud Run endpoints to stop Denial of Service (DoS) attacks:
*   **Global Limiter**: 100 requests per 15-minute window per IP.
*   **Upload Limiter**: 10 requests per 15-minute window per IP on CSV uploads.

### 4.3. CORS Policy
CORS is restricted strictly to the production frontend origins. Unrecognized browser requests are denied immediately.

### 4.4. Secrets Protection
No sensitive variables (like `GEMINI_API_KEY`) are written in clear text inside env variables or git repos. They are stored in **Google Cloud Secret Manager** and mounted as environment variables during Cloud Run launch.

### 4.5. Firebase Rules
*   **Firestore**: Allow direct reads from clients for demo purposes (`/stadium_state` and `/recommendations_history`), but block all writes. Writes are restricted to the backend, which bypasses security rules using the Firebase Admin SDK.
*   **Storage**: Allow writes to `/uploads/stadium_data` only if the file is a CSV and the file size is under 5MB.

---

## 5. Performance Optimization Strategies

### 5.1. Bundle Size & Code Splitting
The Vite build splits large JavaScript assets into distinct chunks:
*   `vendor-react-core`: Holds React, React-DOM, and Router engines.
*   `vendor-mui`: Bundles Material UI and Emotion styles.
*   `vendor-leaflet`: Houses Map rendering scripts.
*   `vendor-charts`: Contains Chart.js files.
This allows the browser to download smaller files in parallel and cache standard packages locally across app updates.

### 5.2. Caching Rules
Firebase Hosting is configured to cache static assets aggressively:
*   **Images, CSS, JS**: Cache-control set to `max-age=31536000` (1 year). Clean invalidation is achieved since Vite appends content hashes to all generated filenames.

### 5.3. Firestore Reads
To prevent runaway read charges:
*   Enable offline persistence in the React client.
*   Query data using collection-level compound indexes (e.g. indexing `stadiumId` + `timestamp` DESC) to retrieve sorted data efficiently in a single operation.

### 5.4. Cloud Run Cold Starts
To mitigate cold starts (latency on initial request scale-up):
*   Keep the container size minimal by using Alpine base images and installing only production dependencies.
*   We use a `--min-instances=0` setting for cost savings, but you can set `--min-instances=1` to guarantee instant responses during live presentation times.

---

## 6. SRE Monitoring & Logging Setup

Google Cloud Run automatically forwards all application outputs to **Google Cloud Logging**.

### 6.1. Logging Structure
The backend utilizes **Pino Logger** to print log entries as structured JSON.
```json
{"level":30,"time":1721020300000,"pid":1,"hostname":"instance-1","reqId":"req-abc","msg":"Processed simulation data","stadiumId":"stadium_1","durationMs":45}
```
*   **Cloud Logging** parses these JSON payloads automatically, allowing SREs to filter log levels (`error`, `info`, `warn`) and search for specific variables like `reqId` or `stadiumId` instantly in the Logs Explorer.

### 6.2. Key Metrics to Monitor
Set up Alerts in **Google Cloud Monitoring** for the following thresholds:
1.  **Latency**: Alert if the Cloud Run `run.googleapis.com/container/billable_instance_time` or request duration exceeds 2 seconds on average over 5 minutes.
2.  **Error Rates**: Alert if HTTP 5xx responses exceed 2% of total requests.
3.  **Memory Utilization**: Alert if container memory usage hits 85% of the 512Mi allocation.
4.  **Quota Constraints**: Track Gemini API rate limits (requests per minute) to ensure the AI engine does not get throttled.

---

## 7. Cost Optimization Blueprint

To run this hackathon demo at zero cost, we optimize within the GCP Free Tiers.

### 7.1. Google Cloud Run (Free Tier)
*   **Free Allowance**: 2 million requests per month, 360,000 GB-seconds of memory, and 180,000 vCPU-seconds.
*   **Strategy**: Keep minimum instances at 0. Since container sizes are minimized, cold starts only take ~1.5s, allowing the app to sleep for free when idle.

### 7.2. Firebase Hosting (Free Tier)
*   **Free Allowance**: 10 GB of storage and 360 MB of daily data transfer.
*   **Strategy**: Cache static bundle assets at the edge using our `Cache-Control` rules, keeping data egress to a minimum.

### 7.3. Cloud Firestore (Free Tier)
*   **Free Allowance**: 50,000 reads, 20,000 writes, and 20,000 deletes daily.
*   **Strategy**: Limit real-time listeners and ensure index queries return only the records required.

### 7.4. Firebase Storage (Free Tier)
*   **Free Allowance**: 5 GB of total storage and 1 GB of daily egress.
*   **Strategy**: Delete old stadium telemetry files. Ensure our Storage security rules reject files over 5MB.

---

## 8. Backup & Disaster Recovery Plan

### 8.1. Firestore Automated Backups
To protect database contents, schedule daily exports using GCP Cloud Scheduler and Cloud Functions to a secure Storage bucket.
```powershell
# Exporter command (to run via cron or schedule)
gcloud firestore export gs://crowdsense-ai-prod-backups/firestore_daily
```

### 8.2. Storage Backup Sync
Use bucket versioning and replication or regular syncing to backup files:
```powershell
# Enable object versioning on upload bucket
gcloud storage buckets update gs://crowdsense-ai-prod.firebasestorage.app --versioning
```

### 8.3. SRE Rollback Strategy
*   **Backend Rollback**: If a production bug occurs in the backend, execute rollback instantly using the manual GitHub Actions dispatch, entering the target commit SHA. Alternatively, route traffic immediately via GCP CLI:
    ```powershell
    # Route 100% of traffic to a previous known-stable revision
    gcloud run services update-traffic crowdsense-backend --to-revisions=crowdsense-backend-v1-stable=100 --region=us-central1
    ```
*   **Frontend Rollback**: Revert Hosting builds instantly using the Firebase console (single-click Rollback button under Hosting History), or run the Firebase command-line equivalent:
    ```powershell
    # Revert to release version 4
    firebase hosting:rollback 4
    ```

---

## 9. Pre-Deployment Verification Checklist

Before deploying the final build, run these validation steps:

*   [ ] **Lint Check**: Run `npm run lint` in both `frontend` and `backend` directories. Ensure zero errors.
*   [ ] **Unit Tests**: Run `npm test` in both directories. Verify that all mocks and simulation engine assertions pass.
*   [ ] **Docker Image Compilation**: Build the container locally with `docker build -t test-backend .` inside the backend directory to check for dependency issues.
*   [ ] **Firebase Security Verification**: Run `firebase deploy --dry-run` to make sure rules files compile without errors.
*   [ ] **Gemini API Check**: Run a sample query to make sure Gemini responds to prompt requests and does not hit key limits.
*   [ ] **Authentication Callback URL**: Check that Firebase Console > Authentication > Authorized Domains lists your production URL (`crowdsense-ai-prod.web.app`).
*   [ ] **Secret Mounting Verification**: Verify that the Cloud Run service account has the "Secret Manager Secret Accessor" role on the `gemini-key` secret.
*   [ ] **CORS Check**: Confirm that the backend correctly allows requests from the hosting URL.

---

## 10. Production Folder Structure

This represents the final layout of the project, clean and ready for deploy:

```text
CrowdSense AI/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Production CI/CD workflow
├── backend/
│   ├── .dockerignore           # Excludes files from container build context
│   ├── .env.example            # Backend environments documentation
│   ├── Dockerfile              # Multi-stage production container instructions
│   ├── package.json            # Node.js backend dependencies and scripts
│   ├── package-lock.json
│   └── src/
│       ├── app.js              # Express app routing and security setups
│       ├── server.js           # Server startup and shutdown handlers
│       ├── config/
│       │   ├── env.js          # Environment Joi validation schema
│       │   └── cors.js         # Production CORS middleware mapping
│       └── services/
│           └── gemini.service.js # Gemini GenAI query handler
├── docs/
│   └── deployment_guide.md     # Production architecture and runbook (this file)
├── frontend/
│   ├── .env.example            # Frontend environments documentation
│   ├── package.json            # Node.js frontend dependencies and scripts
│   ├── package-lock.json
│   ├── vite.config.js          # Code splitting and bundle optimization config
│   └── src/
│       └── firebase/
│           └── client.js       # Firebase SDK client initialization
├── .firebaserc                 # Project context mappings
├── firebase.json               # Hosting headers, routes, and security configs
├── firestore.indexes.json      # Database compound indexes configuration
├── firestore.rules             # Database client access control rules
└── storage.rules               # Storage client upload access control rules
```
