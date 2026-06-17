import { useQuery } from "@tanstack/react-query";

import { moodService } from "@/features/mood/services/moodService";

export function useMoodSummary() {
  return useQuery({
    queryKey: ["moodSummary"],
    queryFn: moodService.getMoodSummary,
  });
}
