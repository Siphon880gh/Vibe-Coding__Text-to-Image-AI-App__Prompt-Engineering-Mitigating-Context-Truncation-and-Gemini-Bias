
import { GoogleGenAI } from "@google/genai";
import { ImageGenerationConfig } from "../types";

export const generateImage = async (prompt: string, config: ImageGenerationConfig): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: config.aspectRatio,
        },
      },
    });

    let imageUrl = '';

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:${part.inlineData.mimeType};base64,${base64EncodeString}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in response.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
