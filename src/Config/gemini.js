import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

// messages = [{ role: "user" or "model", text: "..." }]
// Gemini wants every message as { role, parts: [{ text }] }
const runChat = async (messages) => {
  if (!apiKey) {
    throw new Error("API key missing. Add VITE_GEMINI_API_KEY to your .env file.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const contents = messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const response = await ai.models.generateContent({
    model: modelName,
    contents: contents,
  });

  return response.text;
};

export default runChat;
