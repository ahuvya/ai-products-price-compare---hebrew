
import { GoogleGenAI } from "@google/genai";
import { PriceResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchProductPrice = async (
  productName: string, 
  locationContext: string
): Promise<PriceResult> => {
  const modelName = 'gemini-3-flash-preview';
  
  const prompt = `
    Find the 5 absolute cheapest price options for the category or product "${productName}" in Israel. 
    
    IMPORTANT BRAND COMPARISON RULE: 
    Do not just look for the specific brand mentioned. If a user asks for "Tnuva Milk", also find and prioritize cheaper alternatives like "Tara" or supermarket house brands (Rami Levy, Shufersal, etc.) if they are cheaper for the same volume. 
    The goal is to save the user money by finding the cheapest BRAND in that category.

    LOCATION CONTEXT: 
    ${locationContext}

    Check retailers like Shufersal, Rami Levy, Victory, Yohananof, and comparison sites like CHP.co.il or Zap.
    Focus on price per unit/100g/liter to ensure fair comparison.

    Return ONLY a JSON object in Hebrew:
    {
      "topResults": [
        {
          "productName": "string (e.g. חלב 3%)",
          "price": "string (e.g. ₪5.50)",
          "storeName": "string",
          "brand": "string",
          "valueNote": "string (e.g. המחיר הזול ביותר לקטגוריה)"
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
