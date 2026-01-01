
export interface BusinessIdea {
  title: string;
  description: string;
  estimatedCapital: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  roiEstimate: string;
}

export interface MarketInsight {
  topic: string;
  content: string;
  sources: Array<{ title: string; uri: string }>;
  places?: Array<{ title: string; uri: string }>;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  MARKET_PULSE = 'MARKET_PULSE',
  BUSINESS_MENTOR = 'BUSINESS_MENTOR',
  REGISTRATION_GUIDE = 'REGISTRATION_GUIDE',
  PROFIT_LAB = 'PROFIT_LAB',
  SETTINGS = 'SETTINGS'
}
