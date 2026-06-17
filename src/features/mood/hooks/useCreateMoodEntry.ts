import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moodService } from "@/features/mood/services/moodService";

export function useCreateMoodEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moodService.createMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moodEntries"] });
      queryClient.invalidateQueries({ queryKey: ["moodSummary"] });
    },
  });
}