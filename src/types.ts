export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  interests: string[];
  house?: string;
  personality?: any;
  points: number;
  badges: string[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: 'gaming' | 'music' | 'study' | 'social';
  members: string[];
  createdBy: string;
  createdAt: string;
}

export interface Room {
  id: string;
  communityId: string;
  type: 'gaming' | 'music';
  name: string;
  activeUsers: string[];
  currentActivity?: any;
}

export interface LaundryMachine {
  id: string;
  house: string;
  status: 'available' | 'in-use' | 'broken';
  timeRemaining: number;
  lastUpdated: string;
}

export interface StudySpot {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  occupancy: number;
  noiseLevel: 'quiet' | 'moderate' | 'loud';
}

export interface MoodLog {
  id: string;
  uid: string;
  mood: 'happy' | 'stressed' | 'tired' | 'motivated';
  timestamp: string;
}
