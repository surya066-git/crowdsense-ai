<div align="center">
  <h1>CrowdSense AI 🏟️</h1>
  <p><strong>Intelligent Stadium Routing & Crowd Dynamics Decision Engine</strong></p>
  <p>Built for the <strong>Hack2Skill PromptWars Virtual Challenge 4</strong></p>

  [![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
  [![Gemini API](https://img.shields.io/badge/Google-Gemini_AI-orange.svg)](https://deepmind.google/technologies/gemini/)
  [![Firebase](https://img.shields.io/badge/Firebase-Auth_&_Hosting-yellow.svg)](https://firebase.google.com/)
  [![Render](https://img.shields.io/badge/Render-Backend_Hosting-black.svg)](https://render.com/)
</div>

---

## 🏆 Live Links
- **Production Web App:** [https://crowdsense-ai-prod.web.app](https://crowdsense-ai-prod.web.app) *(Try logging in with Google!)*
- **Backend API:** [https://crowdsense-ai-owrl.onrender.com](https://crowdsense-ai-owrl.onrender.com) *(May take 30s to wake up on first load)*

> **Judge Testing Note:** Please use an Incognito Window or do a Hard Refresh if you previously visited the site, to ensure you are viewing the latest production build!

---

## 📖 Project Overview
**CrowdSense AI** is an enterprise-grade AI decision engine designed to revolutionize stadium operations and enhance the fan experience. By analyzing real-time crowd densities, queue lengths, weather conditions, and active security incidents, CrowdSense dynamically calculates the safest and fastest entry gates for fans, drastically reducing crowd crush risks at mega-events like the FIFA World Cup.

### ❓ The Problem
Mega-events suffer from asymmetrical crowd distribution. Fans blindly follow GPS to the "nearest" gate, resulting in massive bottlenecks, hour-long queues, and dangerous crushes, while secondary gates remain completely empty.

### 💡 The Solution
CrowdSense AI ingests live stadium telemetry and utilizes a proprietary deterministic **Decision Engine** to calculate an optimal "Safety & Efficiency Score" for every gate. It then passes this data to **Google Gemini AI**, which translates the mathematical routing decision into a human-friendly, localized explanation for the fan.

---

## 🧠 How We Use Gemini (AI Reasoning)
Judges look for AI that demonstrates *reasoning* rather than just basic Q&A. CrowdSense AI implements a **Hybrid AI Architecture**:

1. **Deterministic Safety:** The backend executes mathematical distance calculations (Haversine formula), capacity checks, and hazard zone filtering. This guarantees a mathematically safe route (Zero Hallucinations).
2. **AI Synthesis (Gemini 1.5):** The engine feeds the safe route, along with live weather and incident data, into the Gemini API. 
3. **Structured Reasoning:** Gemini uses structured JSON output to generate a contextual explanation. For example, instead of just saying "Go to Gate C," Gemini reasons: *"Gate A is closer, but due to a medical emergency and heavy rain, Gate C is a safer 4-minute walk with zero queue."*

### Fallback Mechanism
If the Gemini API hits a rate limit, our backend seamlessly degrades to a deterministic explanation template, ensuring the fan's safety app never crashes.

---

## ⚡ Key Features
- **Real-Time Interactive Map**: Visualize crowd heatmaps, gate statuses, and security incidents live using Leaflet.
- **Secure Authentication**: Firebase Google Sign-in protects private user history and location data.
- **Admin Simulation Dashboard**: Instantly simulate weather storms, medical emergencies, or gate closures and watch the AI recalculate routing live.
- **Production-Ready Security**: Hardened backend with Helmet.js, Express Rate Limiting, CORS, and Firebase ID token verification.
- **Automated CI/CD**: Seamless GitHub Actions pipelines deploying the frontend to Firebase Hosting and the backend to Render.

---

## 🏗️ Architecture & Tech Stack

### Frontend (User & Admin Portals)
- **Framework**: React.js (Vite)
- **UI/UX**: Material UI (MUI), Chart.js
- **Mapping**: Leaflet, React-Leaflet
- **Deployment**: Firebase Hosting (CDN)

### Backend (Decision Engine)
- **Runtime**: Node.js, Express.js
- **AI Integration**: Gemini 1.5 Pro (via Google API)
- **Security**: Firebase Admin SDK (Auth Verification), Helmet, Rate-Limit
- **Deployment**: Render (Auto-scaling)

### Data & Persistence
- **Database**: Firebase Firestore (NoSQL)
- **Storage**: Firebase Storage (CSV ingestion)

---

## 🎯 The "Golden Demo" (For Judges)
To see the true power of the AI reasoning:
1. Log in to the web app with Google.
2. Go to the **Simulation** tab.
3. Trigger a **Medical Emergency** near the North Gate (or create a severe weather event).
4. Go to the **Map** tab.
5. Notice how the heatmaps and alert icons update in real-time.
6. Click **Get Recommendation**. Watch the AI explicitly explain *why* it is routing you away from the danger zone!

---

## 🚀 Local Setup Guide

### 1. Prerequisites
- Node.js (v20+)
- A Firebase Project (Firestore, Auth, & Storage enabled)
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
# Add your GEMINI_API_KEY and Firebase Admin SDK credentials to .env
npm run dev
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
# Set VITE_API_BASE_URL=http://localhost:8080/api/v1 and Firebase config variables in .env
npm run dev
```

---

## 🔮 Future Scope (FIFA Vision)
- **Computer Vision Integration**: Replace CSV uploads with live CCTV crowd density extraction.
- **Multilingual Support**: Real-time Gemini translation for international fans.
- **Wearable Integration**: Push notifications to Apple Watch / WearOS during stadium evacuations.

---

## 📄 License
This project is licensed under the MIT License.
