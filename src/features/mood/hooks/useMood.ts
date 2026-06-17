import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { moodService } from "@/features/mood/services/moodService";

export function useMood() {
  const queryClient = useQueryClient();

  const moodEntriesQuery = useQuery({
    queryKey: ["moodEntries"],
    queryFn: moodService.getMoodEntries,
  });

  const moodSummaryQuery = useQuery({
    queryKey: ["moodSummary"],
    queryFn: moodService.getMoodSummary,
  });

  const createMoodEntryMutation = useMutation({
    mutationFn: moodService.createMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moodEntries"] });
      queryClient.invalidateQueries({ queryKey: ["moodSummary"] });
    },
  });

  return {
    moodEntriesQuery,
    moodSummaryQuery,
    createMoodEntryMutation,
  };
}


//REAL API integration later on
/*
import { httpClient } from "@/services/api/httpClient";
import { endpoints } from "@/services/api/endpoints";
import { CreateMoodEntryPayload, MoodEntry, MoodSummary } from "@/features/mood/types";

export const moodService = {
  getMoodEntries: async (): Promise<MoodEntry[]> => {
    const response = await httpClient.get<MoodEntry[]>(endpoints.mood.entries);
    return response.data;
  },

  getMoodSummary: async (): Promise<MoodSummary> => {
    const response = await httpClient.get<MoodSummary>(endpoints.mood.summary);
    return response.data;
  },

  createMoodEntry: async (payload: CreateMoodEntryPayload): Promise<MoodEntry> => {
    const response = await httpClient.post<MoodEntry>(endpoints.mood.entries, payload);
    return response.data;
  },
};
*/