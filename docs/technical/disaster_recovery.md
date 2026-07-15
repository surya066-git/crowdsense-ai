# Disaster Recovery & Rollback Strategy

Operating a smart stadium decision engine requires extreme fault tolerance. Below is the Site Reliability Engineering (SRE) disaster recovery plan for CrowdSense AI.

## 1. AI API Outages (Gemini Downtime)
- **Risk**: Google Gemini API goes down, or quotas are exceeded.
- **Recovery Strategy**: Handled natively in the application layer. The `gemini.service.js` wraps the API call in a `try/catch` with a strict timeout. On failure, it immediately defaults to `fallbackExplanation.js` which generates a deterministic explanation locally in Node.js. 
- **RTO (Recovery Time Objective)**: 0 seconds (Immediate failover).

## 2. Firestore Data Corruption
- **Risk**: A malicious admin uploads a malformed CSV, overwriting safe gate capacities with corrupt values.
- **Backup Strategy**: 
  1. All original CSVs are preserved in Firebase Storage.
  2. GCP Scheduled Backups export the `recommendations_history` and `stadium_state` collections to a Coldline Cloud Storage bucket nightly.
- **Rollback Strategy**: Admins can use the web dashboard to select the previously successfully parsed CSV from the "Upload History" list and trigger a re-parse, instantly reverting the stadium state to the last known good configuration.

## 3. Backend Deployment Failures
- **Risk**: A new version of the Node.js API is deployed to Cloud Run containing a fatal memory leak.
- **Rollback Strategy**: Google Cloud Run automatically preserves previous revisions. Using the Google Cloud Console (or CLI: `gcloud run services update-traffic crowdsense-backend --to-revisions=crowdsense-backend-previous=100`), traffic can be instantly routed back to the stable container.

## 4. Global Load Spikes (DDoS or Massive Event)
- **Risk**: 80,000 fans open the app simultaneously as the game ends.
- **Mitigation**: 
  - **Cloud CDN**: Firebase Hosting absorbs 100% of static asset traffic at the edge.
  - **Rate Limiting**: The backend implements `express-rate-limit` to reject abusive API polling.
  - **Auto-Scaling**: Cloud Run scales up to 100 containers in seconds to absorb legitimate traffic spikes.
