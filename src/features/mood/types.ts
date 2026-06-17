export type MoodLevel = "very_bad" | "bad" | "neutral" | "good" | "great";

export interface MoodEntry {
  id: string;
  mood: MoodLevel;
  energyLevel: number;
  stressLevel: number;
  note?: string;
  createdAt: string;
}

export interface CreateMoodEntryPayload {
  mood: MoodLevel;
  energyLevel: number;
  stressLevel: number;
  note?: string;
}

export interface MoodSummary {
  averageEnergy: number;
  averageStress: number;
  mostCommonMood: MoodLevel;
  entriesCount: number;
}