import { GoogleGenerativeAI } from '@google/generative-ai';

// Determine API Key context. We won't crash the server if missing, 
// as the application gracefully falls back to deterministic explanations.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
export const isGeminiConfigured = !!GEMINI_API_KEY;

let genAI = null;
if (isGeminiConfigured) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

export const getGeminiModel = () => {
  if (!genAI) return null;
  // Use gemini-1.5-flash as it is fast and excellent for summarization/JSON tasks
  return genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.2, // Low temperature to prevent hallucination
      maxOutputTokens: 300,
      responseMimeType: 'application/json'
    }
  });
};
