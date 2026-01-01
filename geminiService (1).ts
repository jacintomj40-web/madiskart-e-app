
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

// Helper to get AI instance with current API Key
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getMarketTrends = async (location: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze profitable micro-business trends and identify specific wholesale hubs, 'Bagsakan' centers, or major suppliers near ${location}, Philippines. List 3 specific business ideas and where to get supplies for them locally.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter((chunk: any) => chunk.web)
    ?.map((chunk: any) => ({
      title: chunk.web.title || "Reference",
      uri: chunk.web.uri || "#"
    })) || [];

  return {
    text: response.text || "No insights found.",
    sources,
    places: [] // Place grounding handled by search results in this model version
  };
};

export const calculateProfitAdvice = async (data: { business: string, capital: string, expenses: string }) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Acting as a Filipino business accountant for the 'Madiskart-E' app, analyze this business: ${data.business}. 
    Initial Capital: ₱${data.capital}. Monthly Operating Expenses (Rent, Kuryente, etc): ₱${data.expenses}. 
    Suggest a pricing strategy, daily target sales, and estimated months to get the Return on Investment (ROI) in the Philippine context. Keep it encouraging but realistic.`,
  });
  return response.text || "No advice generated.";
};

export const getBusinessRegistrationGuide = async (businessType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a detailed, step-by-step checklist for registering a ${businessType} in the Philippines. Include DTI (for sole proprietorship) or SEC (for corporations), BIR, Mayor's Permit, and SSS/PhilHealth requirements. Keep it practical for a first-time Filipino entrepreneur.`,
  });
  return response.text || "No guide available.";
};

export const generatePlayStoreMetadata = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a professional Google Play Store listing for an app named 'Madiskart-E: Pinoy Entrepreneur Hub'. 
    It helps Filipinos find local suppliers, calculate profits, and get AI business mentoring. 
    Include:
    1. A Short Description (max 80 chars) - catchy and localized.
    2. A Full Description (max 4000 chars) - highlighting benefits like 'Bagsakan Finder', 'Kita Calculator', and 'AI Aling Nena Mentor'.
    Use a mix of professional English and encouraging Tagalog.`,
  });
  return response.text || "Metadata generation failed.";
};

export const startMentorChat = (history: ChatMessage[]) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the primary mentor for 'Madiskart-E', a friendly and expert Filipino business coach. Use a mix of English and Tagalog (Taglish). Your goal is to help Filipinos build sustainable small businesses. Give practical, locally-relevant advice about capital, marketing (especially on Facebook/TikTok), and daily operations in the PH context.",
    },
  });
  return chat;
};
