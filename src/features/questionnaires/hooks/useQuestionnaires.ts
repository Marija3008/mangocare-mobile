import { useQuery } from "@tanstack/react-query";

import { questionnairesService } from "@/features/questionnaires/services/questionnairesService";

export function useQuestionnaires() {
  return useQuery({
    queryKey: ["questionnaires"],
    queryFn: questionnairesService.getQuestionnaires,
  });
}