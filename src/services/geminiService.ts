
import { GoogleGenAI, Modality } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
  if (!process.env.API_KEY) {
    // Use a specific error message that can be caught and handled in the UI
    throw new Error("API_KEY_MISSING");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
}

export async function editImage(base64ImageData: string, mimeType: string, prompt: string): Promise<string> {
  try {
    const gemini = getAiInstance(); // This will throw if the key is missing

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Re-throw the original error to be handled by the calling function
    throw error;
  }
}
