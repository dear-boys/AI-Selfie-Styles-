
import { GoogleGenAI, Modality } from "@google/genai";

let ai: GoogleGenAI | null = null;
let apiKeyError: string | null = null;

if (!process.env.API_KEY) {
  apiKeyError = "API_KEY environment variable is not set. Please follow the instructions in the README.md to set it up.";
} else {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export function getApiKeyError(): string | null {
    return apiKeyError;
}

export async function editImage(base64ImageData: string, mimeType: string, prompt: string): Promise<string> {
  if (!ai) {
    throw new Error(apiKeyError || "Gemini AI client is not initialized.");
  }
  try {
    const response = await ai.models.generateContent({
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
    throw new Error("Failed to generate image from Gemini API.");
  }
}
