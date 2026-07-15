<div align="center">
  <img src="https://via.placeholder.com/150x150.png?text=CrowdSense+AI" alt="CrowdSense AI Logo" width="150" />
  <h1>CrowdSense AI 🏟️</h1>
  <p><strong>Intelligent Stadium Routing & Crowd Dynamics Decision Engine</strong></p>
  <p>Built for the <strong>Hack2Skill PromptWars Virtual Challenge 4</strong></p>

  [![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
  [![Gemini API](https://img.shields.io/badge/Google-Gemini_AI-orange.svg)](https://deepmind.google/technologies/gemini/)
  [![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
</div>

---

## 📖 Project Overview
**CrowdSense AI** is an enterprise-grade AI decision engine designed to revolutionize stadium operations and enhance the fan experience. By analyzing real-time crowd densities, queue lengths, weather conditions, and active security incidents, CrowdSense dynamically calculates the safest and fastest entry gates for fans, drastically reducing crowd crush risks at mega-events like the FIFA World Cup.

### ❓ The Problem
Mega-events suffer from asymmetrical crowd distribution. Fans blindly follow GPS to the "nearest" gate, resulting in massive bottlenecks, hour-long queues, and dangerous crushes, while secondary gates remain completely empty.

### 💡 The Solution
CrowdSense AI ingests live stadium telemetry (via CSV/Firestore) and utilizes a proprietary deterministic **Decision Engine** to calculate an optimal "Safety & Efficiency Score" for every gate. It then passes this data to **Google Gemini AI**, which translates the mathematical routing decision into a human-friendly, localized explanation for the fan.

---

## ⚡ Key Features
- **Real-Time Interactive Map**: Visualize crowd heatmaps, gate statuses, and security incidents live using Leaflet.
- **Deterministic AI Routing**: Proprietary scoring model factoring in distance (Haversine formula), wait times, capacity limits, and emergency zones.
- **Gemini Explainer Integration**: Zero-hallucination AI explanations leveraging few-shot prompting and strict JSON output schemas.
- **Admin Simulation Dashboard**: Instantly simulate weather storms, medical emergencies, or gate closures and watch the AI recalculate routing live.
- **Production-Ready Security**: Hardened backend with Helmet.js, Express Rate Limiting, and Joi input validation.

---

## 🏗️ Architecture & Tech Stack

### Frontend (User & Admin Portals)
- **Framework**: React.js (Vite)
- **UI/UX**: Material UI (MUI), Chart.js
- **Mapping**: Leaflet, React-Leaflet
- **Deployment**: Firebase Hosting (CDN)

### Backend (Decision Engine)
- **Runtime**: Node.js, Express.js
- **AI Integration**: `@google/genai` (Gemini 1.5 Flash)
- **Security**: Helmet, Rate-Limit, CORS
- **Deployment**: Google Cloud Run (Auto-scaling)

### Data & Persistence
- **Database**: Firebase Firestore (NoSQL)
- **Storage**: Firebase Storage (CSV ingestion)

---

## 📂 Folder Structure
```text
crowdsense-ai/
├── frontend/                # React SPA
│   ├── src/                 
│   │   ├── components/      # Reusable MUI Components (HeroCard, ControlPanel)
│   │   ├── pages/           # Dashboard, Map, Simulation, Upload
│   │   ├── services/        # API integrations (Axios)
│   │   └── theme/           # Material UI Design Tokens
│   └── firebase.json        # Production Hosting Config
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Core Business Logic (Map, Simulation, Gemini)
│   │   ├── engine/          # Proprietary Decision Engine Math
│   │   └── utils/           # Joi Validators, Loggers
│   └── Dockerfile           # Cloud Run Configuration
└── docs/                    # Extensive Project Documentation
```

---

## 🚀 Installation & Local Setup

### 1. Prerequisites
- Node.js (v20+)
- A Firebase Project (Firestore & Storage enabled)
- A Google Gemini API Key

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/crowdsense-ai.git
cd crowdsense-ai
```

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your GEMINI_API_KEY and Firebase Admin SDK credentials to .env
npm run dev
```
*Backend runs on `http://localhost:8080`*

### 4. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:8080/api/v1
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🌐 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/recommendations` | Calculates best gate & generates Gemini explanation. |
| `POST` | `/api/v1/upload/csv` | Ingests new stadium crowd data to Firestore. |
| `GET`  | `/api/v1/map/status` | Fetches live gates, incidents, and heatmaps. |
| `POST` | `/api/v1/simulation/event`| Triggers admin simulations (closures, storms). |

*Refer to `docs/technical/api_and_database.md` for full documentation.*

---

## 🧪 Testing
CrowdSense AI includes a robust Jest & React Testing Library suite.
```bash
# Run Backend Unit & Integration Tests
cd backend && npm test

# Run Frontend Component Tests
cd frontend && npm test
```

---

## 🔮 Future Scope (FIFA Vision)
- **Computer Vision Integration**: Replace CSV uploads with live CCTV crowd density extraction.
- **Multilingual Support**: Real-time Gemini translation for international fans.
- **Wearable Integration**: Push notifications to Apple Watch / WearOS during stadium evacuations.

---

## 👥 Contributors
- **[Your Name/Team]** - *Lead Engineer / AI Architect*

## 📄 License
This project is licensed under the MIT License.
