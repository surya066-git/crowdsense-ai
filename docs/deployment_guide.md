# CrowdSense AI: 100% Free Deployment & Infrastructure Guide

This guide details the production architecture and setup steps to host **CrowdSense AI** entirely on free tiers, requiring zero upfront costs and no credit card or Google Cloud billing activation.

---

## 1. Zero-Cost Architecture

The application decouples static client delivery from dynamic backend processing using free tier services.

```mermaid
graph TD
    User([User Browser])
    
    subgraph "Edge / CDN Layer (Free Tier)"
        FH["Firebase Hosting (Spark Plan)"]
        Auth["Firebase Authentication"]
    end
    
    subgraph "Application Logic (Free Tier)"
        Render["Render Web Service (Free)"]
    end
    
    subgraph "Data & AI Layer (Free Tier)"
        FS["Firebase Firestore (Spark Plan)"]
        Storage["Firebase Storage (Spark Plan)"]
        Gemini["Google Gemini API (Free Tier)"]
    end

    User -->|1. Requests SPA| FH
    FH -->|2. Loads React App| User
    User -->|3. Signs In / Token| Auth
    User -->|4. Directly Reads Live State| FS
    User -->|5. Uploads CSV Files| Storage
    User -->|6. REST API Request (with Auth Header)| Render
    Render -->|7. Evaluates Env Vars| Render
    Render -->|8. Accesses Firestore Data| FS
    Render -->|9. Processes Decision Engine| Render
    Render -->|10. Enhances with Prompt Engine| Gemini
```

### Resource Limits (Always Free)
- **Render Web Service**: 750 free instance hours per month (spins down after 15 mins of inactivity).
- **Firebase Hosting**: 10 GB of storage, 360 MB data transfer per day.
- **Firebase Firestore**: 50,000 reads, 20,000 writes, 20,000 deletes daily. 1 GB storage.
- **Firebase Storage**: 5 GB storage, 1 GB download per day.
- **Gemini API**: 15 requests per minute, 1 million tokens per minute.

---

## 2. Infrastructure Setup & Deployment Steps

Follow these instructions to deploy the infrastructure from scratch.

### Prerequisites
*   Install [Node.js v20+](https://nodejs.org/).
*   Install [Firebase CLI](https://firebase.google.com/docs/cli).
*   A free [Render.com](https://render.com/) account linked to your GitHub.
*   A free Google account for Firebase and Google AI Studio (Gemini).

### Step 2.1: Firebase Project Initialization
Create a Firebase project named `crowdsense-ai-prod`. **Do not enable the Blaze plan.** Keep it on the Spark (Free) plan.

```powershell
# Log in to Firebase CLI
npx -y firebase-tools@latest login

# Register a web app in your project
npx -y firebase-tools@latest apps:create web crowdsense-web-app --project crowdsense-ai-prod
```

### Step 2.2: Backend Deployment on Render
Render will host our Express.js API securely and for free.

1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` configuration in the root folder, which sets the build and start commands (`npm ci` and `npm start` in the `/backend` folder).
5. Before deploying, add the following **Environment Variables** in the Render dashboard:
    * `NODE_ENV`: `production`
    * `FRONTEND_ORIGIN`: `https://crowdsense-ai-prod.web.app` (Change to your Firebase hosting URL)
    * `FIREBASE_PROJECT_ID`: `crowdsense-ai-prod`
    * `FIREBASE_STORAGE_BUCKET`: `crowdsense-ai-prod.firebasestorage.app`
    * `GEMINI_API_KEY`: *(Get from Google AI Studio)*
    * `GOOGLE_APPLICATION_CREDENTIALS`: *(Paste the JSON string of your Firebase Service Account key, or use Render Secret Files to upload the `.json` file).*

Click **Deploy**. Render will build and launch your API (e.g., `https://crowdsense-backend.onrender.com`).

### Step 2.3: Firebase Security & Database Deployment
Deploy the Firestore and Storage security rules to lock down your data.

```powershell
# Deploy Firestore Security Rules and Indexes
npx -y firebase-tools@latest deploy --only firestore

# Deploy Storage Security Rules
npx -y firebase-tools@latest deploy --only storage

# Deploy Authentication Config (if enabled in firebase.json)
npx -y firebase-tools@latest deploy --only auth
```

### Step 2.4: Frontend Deployment
Link the frontend to your newly deployed Render API and deploy it to Firebase Hosting.

1. Open `frontend/.env.production` (or `.env`).
2. Update the `VITE_API_BASE_URL` to point to your Render Web Service URL (e.g., `https://crowdsense-backend.onrender.com/api/v1`).
3. Update the Firebase variables (`VITE_FIREBASE_API_KEY`, etc.) using the output from:
   ```powershell
   npx -y firebase-tools@latest apps:sdkconfig --project crowdsense-ai-prod
   ```

Build and deploy:
```powershell
# In the frontend directory
cd frontend
npm ci
npm run build

# Deploy Hosting to Firebase
cd ..
npx -y firebase-tools@latest deploy --only hosting
```

---

## 3. Free Tier Safeguards

To prevent abuse that could exhaust your free quotas:

### 3.1. Rate Limiting (Render)
Implemented via `express-rate-limit` on the Express backend:
*   **Global Limiter**: 100 requests per 15-minute window per IP.
*   **Upload Limiter**: 10 requests per 15-minute window per IP on CSV uploads.

### 3.2. Payload Constraints
*   **Firebase Storage Rules**: Allow writes to `/uploads/stadium_data` only if the file is a CSV and under 5MB.
*   **Express Multer**: Rejects incoming form-data files over 5MB.

### 3.3. Idle Spin-Down
Render's Free Web Services spin down after 15 minutes of inactivity. When a new request arrives, it spins back up (taking ~30-60 seconds for a "cold start"). This ensures you do not consume your 750 free hours if the app is not being actively tested.

---

## 4. Verification Checklist

Before presenting your demo, verify:

*   [ ] **Frontend Loads**: Visit `https://crowdsense-ai-prod.web.app` and ensure the UI loads without console errors.
*   [ ] **Backend Health**: Visit `https://crowdsense-backend.onrender.com/api/v1/health` and verify it returns a 200 OK JSON status.
*   [ ] **Firebase Auth**: Attempt to register a user.
*   [ ] **Gemini API**: Attempt a simulation request and verify it succeeds within the 15 RPM limit.
*   [ ] **CORS Settings**: Confirm the Render logs do not show CORS blockage from your Firebase domain.
