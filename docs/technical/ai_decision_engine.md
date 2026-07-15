# AI Decision Engine Documentation

## Overview
CrowdSense AI does NOT blindly pass raw data to an LLM for decision making. Instead, it uses a deterministic algorithmic engine to score gates, guaranteeing 100% safety and 0% hallucinations. Gemini is used strictly for translation and explanation.

## The Mathematical Scoring Model
The system calculates a `Safety & Efficiency Score` (0-100) for every gate based on 6 heavily weighted vectors:

1. **Distance Score (30%)**: Uses the **Haversine Formula** to calculate the physical walking distance from the fan's GPS coordinates to the gate's latitude/longitude.
2. **Queue Score (25%)**: Exponentially decays the score if the queue length exceeds 15 minutes.
3. **Crowd Density Score (20%)**: If a gate's `currentCrowd` approaches `capacity`, a severe penalty is applied to prevent crowd crushes.
4. **Incident Score (15%)**: If a gate is near an active incident (e.g., Medical Emergency), the score drops by 50 points. If it's a Fire or Security Threat, the gate is marked `UNSAFE` and removed from consideration entirely.
5. **Weather Score (5%)**: Minor routing adjustments based on shelter availability during storms.
6. **Capacity Score (5%)**: Prefers gates with higher total maximum capacity to ensure continuous flow.

### Hard Filtering (Safety Net)
Before scoring begins, any gate marked `CLOSED` or within a 100m radius of a `CRITICAL` incident is strictly filtered out.

## Edge Case Resilience
- **All Gates Closed**: The Engine halts and returns an `ALL_GATES_CLOSED` error to the UI.
- **Equal Scores**: Tie-breaker logic defaults to the gate with the lowest absolute queue length.

## Gemini Fallback Strategy
If the Gemini API exceeds quota, times out, or the network drops, the backend `explanation.service.js` catches the error. It uses string interpolation to generate a fallback explanation natively in Node.js (e.g., `"Head to Gate A, which is a 5 min walk."`). The user never experiences downtime.
