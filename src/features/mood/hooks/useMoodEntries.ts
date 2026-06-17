import { useQuery } from "@tanstack/react-query";

import { moodService } from "@/features/mood/services/moodService";

export function useMoodEntries() {
  return useQuery({
    queryKey: ["moodEntries"],
    queryFn: moodService.getMoodEntries,
  });
}
