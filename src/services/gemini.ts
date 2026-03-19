import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const campusAssistant = async (prompt: string, context?: string) => {
  const model = "gemini-3.1-pro-preview";
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: `You are PUZZLES AI, a smart campus assistant for a residential college. 
      You help students with:
      - Finding study spots
      - Reporting maintenance
      - Suggesting events
      - Social matching
      Context: ${context || 'No additional context provided.'}
      Be helpful, futuristic, and friendly. Use markdown for formatting.`,
    },
  });
  return response.text;
};

export const getSocialMatch = async (userA: any, userB: any) => {
  const model = "gemini-3.1-flash-lite-preview";
  const prompt = `Compare these two student profiles and calculate a compatibility percentage and a brief reason.
  User A: ${JSON.stringify(userA)}
  User B: ${JSON.stringify(userB)}
  Return JSON: { "percentage": number, "reason": string }`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          percentage: { type: Type.NUMBER },
          reason: { type: Type.STRING }
        },
        required: ["percentage", "reason"]
      }
    }
  });
  
  return JSON.parse(response.text);
};

export const getMusicRecommendations = async (interests: string[], currentVibe: string) => {
  const model = "gemini-3.1-flash-lite-preview";
  const prompt = `Based on these interests: ${interests.join(', ')} and current vibe: ${currentVibe}, suggest 5 songs for a campus music jam.
  Return JSON: { "songs": [{ "title": string, "artist": string, "reason": string }] }`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          songs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                artist: { type: Type.STRING },
                reason: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  
  return JSON.parse(response.text);
};
