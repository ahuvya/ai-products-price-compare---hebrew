
import { GoogleGenAI, Type } from "@google/genai";
import { PriceResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchProductPrice = async (productName: string, location?: { lat: number, lng: number }): Promise<PriceResult> => {
  const modelName = 'gemini-3-flash-preview';
  
  const locationContext = location 
    ? `User location: Latitude ${location.lat}, Longitude ${location.lng}.`
    : "General location: Israel.";

  const prompt = `
    Quickly find the top 5 cheapest prices for "${productName}" in Israel. 
    Check retailers like Shufersal, Rami Levy, Victory, or sites like CHP.co.il.
    
    ${locationContext}

    Focus on speed. Provide a list of up to 5 best results in Hebrew.
    Ensure prices are comparable (e.g., per unit/100g).

    Return ONLY a JSON object:
    {
      "topResults": [
        {
          "productName": "string",
          "price": "string (e.g. ₪10.00)",
          "storeName": "string",
          "brand": "string",
          "valueNote": "string"
        }
      ],
      "summary": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        // Disable thinking budget to minimize latency for quick responses
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || 'מקור מידע',
        uri: chunk.web.uri
      }));

    let result: any = { topResults: [], summary: "" };
    try {
      result = JSON.parse(text);
    } catch (e) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      }
    }

    return {
      topResults: result.topResults || [],
      summary: result.summary || "נמצאו תוצאות לחיפוש שלך.",
      sources: sources
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
