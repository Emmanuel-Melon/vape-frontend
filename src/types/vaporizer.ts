export interface UserPreferences {
  // Common initial questions
  cannabisExperience: 'novice' | 'experienced' | null;
  primaryUse: 'medical' | 'recreational' | 'both' | null;
  
  // Novice path specific
  simplicityPreference?: 'very-simple' | 'some-features' | null;
  discretionImportance?: 'very-important' | 'somewhat' | 'not-important' | null;
  
  // Experienced path specific
  heatingMethod?: 'convection' | 'conduction' | 'hybrid' | 'no-preference' | null;
  airflowPreference?: 'restricted' | 'open' | 'adjustable' | null;
  temperatureControl?: 'precise' | 'presets' | 'simple' | null;
  
  // Common questions (adapted based on path)
  usagePattern: 'casual' | 'daily' | 'heavy' | 'microdose' | null;
  userType: 'flavor-chaser' | 'on-the-go' | 'home-primary' | 'efficiency-focused' | null;
  portability: 'pocket-size' | 'portable' | 'desktop' | 'no-preference' | null;
  budget: number;
  
  // Priorities (ranked)
  priorities: {
    vaporPotency: number;
    vaporComfort: number;
    portability: number;
    batteryLife: number;
    buildQuality: number;
    easeOfUse: number;
    maintenance: number;
    value: number;
  };
}

export type QuizStep = 'experience' | 'usage' | 'portability' | 'budget' | 'priorities';

export interface VaporizerRecommendation {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: 'premium' | 'mid-range' | 'budget' | 'specialty';
  heatingMethod: 'convection' | 'conduction' | 'hybrid';
  type: 'portable' | 'desktop' | 'butane';
  
  // Ratings (1-10)
  ratings: {
    vaporPotency: number;
    vaporComfort: number;
    portability: number;
    batteryLife: number;
    buildQuality: number;
    easeOfUse: number;
    maintenance: number;
    value: number;
  };
  
  // Features
  features: string[];
  pros: string[];
  cons: string[];
  
  // Target users
  bestFor: string[];
  notIdealFor: string[];
  
  // Additional info
  warranty: string;
  maintenanceLevel: 'low' | 'medium' | 'high';
  learningCurve: 'easy' | 'moderate' | 'steep';
  matchScore?: number;
  beginnerFriendly?: boolean;
  advancedFeatures?: boolean;
  sessionVape?: boolean;
}

export interface QuizResult {
  primaryRecommendation: VaporizerRecommendation;
  alternatives: VaporizerRecommendation[];
  explanation: string;
  educationalContent: {
    gettingStarted?: string[];
    advancedTips?: string[];
    maintenanceTips: string[];
    temperatureGuide: string[];
  };
  matchScore: number;
}

export interface SavedQuizResult {
  id: string;
  timestamp: number;
  preferences: UserPreferences;
  result: QuizResult;
  nickname?: string;
}