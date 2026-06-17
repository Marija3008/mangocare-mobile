import { MoodEntry } from "@/features/mood/types";

export const moodEntriesMock: MoodEntry[] = [
  {
    id: "mood-1",
    mood: "good",
    energyLevel: 7,
    stressLevel: 4,
    note: "Feeling better today. Slept well and had more focus.",
    createdAt: "2026-06-16T09:20:00.000Z",
  },
  {
    id: "mood-2",
    mood: "neutral",
    energyLevel: 5,
    stressLevel: 6,
    note: "A bit tired after work, but nothing serious.",
    createdAt: "2026-06-15T19:10:00.000Z",
  },
  {
    id: "mood-3",
    mood: "bad",
    energyLevel: 4,
    stressLevel: 7,
    note: "Low energy and some stress during the day.",
    createdAt: "2026-06-14T18:45:00.000Z",
  },
];