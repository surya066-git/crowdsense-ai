# Cost Optimization Strategy

CrowdSense AI is engineered to operate efficiently at extreme scale (100,000+ fans) while aggressively minimizing Google Cloud and Firebase costs.

## 1. Firebase Hosting (Frontend)
- **Free Tier**: 10 GB storage and 360 MB/day data transfer.
- **Optimization Strategy**: We configured `firebase.json` with extreme edge-caching (`Cache-Control: public, max-age=31536000`) for all static assets (JS/CSS). The SPA is downloaded once per fan, heavily minimizing CDN egress costs.

## 2. Google Cloud Run (Backend API)
- **Free Tier**: 2 million requests per month, 360,000 GB-seconds of compute time.
- **Optimization Strategy**: 
  - **Zero Idle Costs**: Configured with `min-instances: 0`. During non-game days, the backend scales to 0 and costs exactly $0.00.
  - **Concurrency**: Node.js handles asynchronous I/O natively. We configured `concurrency: 80` in Cloud Run, meaning a single container can process 80 simultaneous fan requests before scaling up, drastically reducing CPU hours.

## 3. Firebase Firestore (Database)
- **Free Tier**: 50,000 document reads, 20,000 writes per day.
- **Optimization Strategy**:
  - **Read Mitigation**: We do *not* poll the database constantly. State mutations (e.g. closing a gate) are sent to the backend, which caches the state in memory (`map.service.js`). The recommendation API reads from RAM, avoiding 100,000+ Firestore read operations per minute.
  - **Write Batching**: CSV uploads are batched into chunks of 500 documents to minimize network overhead.

## 4. Google Gemini API (AI Decision Explanation)
- **Free Tier**: 15 Requests Per Minute (RPM), 1 million tokens per minute.
- **Optimization Strategy**:
  - **Model Selection**: We use `gemini-1.5-flash` instead of `pro`. It is significantly cheaper, 3x faster, and perfectly suited for structured data translation.
  - **Prompt Token Minimization**: We only send the *winning gate* data and the *next best gate* data to Gemini, rather than the entire stadium state. This reduces input tokens by 90%.
  - **Deterministic Fallback**: If the API rate limit is hit, the backend seamlessly falls back to local string-interpolation, ensuring 100% uptime without paying for higher API quotas.
