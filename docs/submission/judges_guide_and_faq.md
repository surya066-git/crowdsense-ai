# Judges Guide & FAQ

## Guide for PromptWars Evaluators
Welcome! To properly evaluate CrowdSense AI, we highly recommend the following workflow:
1. **View the Dashboard**: Note how the HeroCard clearly displays the AI recommendation and the Gemini explanation.
2. **Trigger a Simulation**: Go to the `/simulation` page. Click **"Surge Crowd"** or **"Medical Emergency"** on the target gate.
3. **Watch the Recalculation**: Observe how the React UI *instantly* updates the AI recommendation without a page refresh, proving the real-time synergy between the backend Decision Engine and Gemini.

---

## Frequently Asked Questions (Top 10)

**1. Why use a custom Decision Engine instead of just asking Gemini?**
LLMs hallucinate. If we fed raw stadium data to an LLM and asked it to pick a gate, it might route a fan into a burning building due to a probabilistic error. By using a deterministic algorithm to pick the gate, we guarantee 100% safety. Gemini is used perfectly for what it excels at: explaining complex data to humans.

**2. How did you handle Gemini API rate limits?**
The backend includes a `fallback.service.js`. If Gemini times out or hits a 429 Error, the system seamlessly generates a deterministic string natively in Node.js. The user never sees an error.

**3. Why did you use Firebase and Cloud Run?**
Firebase Hosting provides globally cached CDN delivery for the React SPA. Cloud Run allows the Node.js backend to scale from 0 to 100 instances dynamically, handling massive event spikes while preserving Free Tier limits during downtime.

**4. How is the Simulation Module working without WebSockets?**
The frontend orchestrates the state. When the admin clicks "Close Gate", React `await`s the Axios POST request. Once the backend mutates the cache, React immediately fires a secondary `fetchRecommendation()` request, pulling the new data instantly. It is cleaner and cheaper than maintaining thousands of open WebSocket connections.

**5. How is the Prompt Engineered?**
We use a strict System Prompt enforcing `application/json` output schemas. We use temperature `0.2` to ensure highly logical, non-creative responses, and provide "Few-Shot" examples in the prompt to guarantee consistency.

**6. Is the app secure?**
Yes. The backend uses `helmet.js` for secure HTTP headers, `express-rate-limit` to prevent DDoS attacks against the Gemini API, and `Joi` to validate all incoming latitude/longitude payloads.

**7. How do you calculate distance?**
We use the mathematical **Haversine Formula** in the backend to calculate the spherical distance between the fan's GPS coordinates and the gate's coordinates.

**8. What happens if all gates are closed?**
The engine catches the empty array and returns a hard error code. The React frontend intercepts this and renders a massive Red "CRITICAL: No Safe Routes Available" card.

**9. How is performance optimized?**
React Components are memoized. The Vite build is tree-shaken and minified. Database writes are executed asynchronously (`fire-and-forget`) so the user never waits for Firestore latency.

**10. How does this fit the theme?**
CrowdSense AI directly targets "Smart Stadiums & Tournament Operations" for FIFA, drastically improving fan safety, reducing crowd crushes, and optimizing physical stadium throughput using AI.
