# API & Database Documentation

## API Endpoints

### 1. `POST /api/v1/recommendations`
Generates the AI routing recommendation.
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fanLocation": { "lat": 37.7760, "lng": -122.4175 },
    "destinationSection": "Sec 101",
    "stadiumId": "sim_1"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "bestGate": { "id": "gate_a", "score": 92 },
    "explanation": "Head to Gate A. While Gate B is closer, it currently has a 45-minute queue."
  }
  ```

### 2. `POST /api/v1/simulation/event`
Admin endpoint to mutate stadium state.
- **Body**: `{ "type": "GATE", "action": "CLOSE", "target": "gate_a" }`

---

## Database Schema (Firestore)

### Collection: `recommendations_history`
Stores a log of all generated routes for future analytics.
- `id` (String): Document ID
- `timestamp` (Timestamp): Time of request
- `fanLocation` (GeoPoint): Starting coordinates
- `recommendedGate` (String): Gate ID
- `safetyScore` (Number): Calculated safety index
- `geminiExplanation` (String): Log of the AI's reasoning

## Storage (Firebase Storage)
### Bucket: `crowdsense-ai-prod.appspot.com`
- **Path**: `/uploads/stadium_data/`
- **Purpose**: Stores the raw CSV files uploaded by administrators prior to Firestore ingestion.
