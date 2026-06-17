import { useQuery } from "@tanstack/react-query";

import { questionnairesService } from "@/features/questionnaires/services/questionnairesService";

export function useQuestionnaireResult(resultId?: string) {
  return useQuery({
    queryKey: ["questionnaireResult", resultId],
    queryFn: () =>
      questionnairesService.getQuestionnaireResultById(resultId!),
    enabled: !!resultId,
  });
}