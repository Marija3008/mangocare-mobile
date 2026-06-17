import {
  CreateMoodEntryPayload,
  MoodEntry,
  MoodLevel,
  MoodSummary,
} from "@/features/mood/types";
import { moodEntriesMock } from "@/mocks/mood.mock";

//wait func simulates network latency; every async method calls it before returning for UI to behave more real
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//stores current MoodEntries in memory; initialized from moodEntryMock, act like temporary backend database for the mock
let moodEntriesStore: MoodEntry[] = [...moodEntriesMock];


//generate a unique string ID for new entries; simulates what a backend might do when creating a new record 
const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function getMostCommonMood(entries: MoodEntry[]): MoodLevel {
  const counts = entries.reduce<Record<MoodLevel, number>>( //entries.reduce(...) iterates over every item in the array; acc: is the acumulator object that stores counts; entry: the current mood entry being processed
    // .reduce isused to convert the array into a single summary object, the obj will end up as: { very_bad: 2, bad: 5, neutral: 1, good: 4, great: 3 }
    (acc, entry) => {
      acc[entry.mood] += 1; // increments the count for the mood of the current entry
      return acc; //passes the updated accumulator to the next iteration
    },
    { //initial acc is this:
      very_bad: 0,
      bad: 0,
      neutral: 0,
      good: 0,
      great: 0,
    }
  );

  //find the mood with the highest count; Object.entries(counts) converts the counts object into an array of pairs; .sort(-//-) sorts those pais by count descending: a[1] and b[1] are the numeric values; [0]
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as MoodLevel; //with [0][0] only the mood is extracted from the array of pairs(key: value:), (the second element~value; key is accesed with [0])
}

function calculateAverage(values: number[]){
  if (values.length === 0) return 0;

  const total = values.reduce((sum, value) => sum + value, 0);

  return Math.round(total / values.length);
}

//this object contains three async methods that mimic a backend API
export const moodService = {

  //RETURNSS A FRESH SORTED COPY OF moodEntriesStore; sorts by newest 1st using createdAt
  getMoodEntries: async (): Promise<MoodEntry[]> => {
    await wait(400);

    return [...moodEntriesStore].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() 
    );
  },

  //builds a summary object from the current store: avgEnergy, avgStress,mostCommonMood, entriesCount; it is here cuz it simulates a summary endpoint like GET /mood/summary
  getMoodSummary: async (): Promise<MoodSummary> => {
    await wait(300);

    return {
      averageEnergy: calculateAverage(
        moodEntriesStore.map((entry) => entry.energyLevel)
      ),
      averageStress: calculateAverage(
        moodEntriesStore.map((entry) => entry.stressLevel)
      ),
      mostCommonMood: getMostCommonMood(moodEntriesStore),

      entriesCount: moodEntriesStore.length,
    };
  },

  //creates a new entryy obj with an ID and timestamp; prepends it to the in-memory entry; returns the created entry; simulates a POST req such as POST/mood/entries 
  createMoodEntry: async (
    payload: CreateMoodEntryPayload
  ): Promise<MoodEntry> => {
    await wait(500);

    const newEntry: MoodEntry ={
      id: createId(),
      mood: payload.mood,
      energyLevel: payload.energyLevel,
      stressLevel: payload.stressLevel,
      note: payload.note,
      createdAt: new Date().toISOString(),
    };
   
    moodEntriesStore = [newEntry, ...moodEntriesStore];

    return newEntry;
  },


};

//REAL API INTEGRATION FOR LATER:
 /*
import { httpClient } from "@/services/api/httpClient";
import { endpoints } from "@/services/api/endpoints";
import {
  CreateMoodEntryPayload,
  MoodEntry,
  MoodSummary,
} from "@/features/mood/types";

export const moodService = {
  getMoodEntries: async (): Promise<MoodEntry[]> => {
    const response = await httpClient.get<MoodEntry[]>(endpoints.mood.entries);
    return response.data;
  },

  getMoodSummary: async (): Promise<MoodSummary> => {
    const response = await httpClient.get<MoodSummary>(endpoints.mood.summary);
    return response.data;
  },

  createMoodEntry: async (
    payload: CreateMoodEntryPayload
  ): Promise<MoodEntry> => {
    const response = await httpClient.post<MoodEntry>(
      endpoints.mood.entries,
      payload
    );
    return response.data;
  },
}; 
 */