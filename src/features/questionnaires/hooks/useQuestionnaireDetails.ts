import { useQuery } from "@tanstack/react-query";

import { questionnairesService } from "@/features/questionnaires/services/questionnairesService";

export function useQuestionnaireDetails(questionnaireId?: string) {
  return useQuery({
    queryKey: ["questionnaire", questionnaireId],
    queryFn: () => questionnairesService.getQuestionnaireById(questionnaireId!),
    enabled: !!questionnaireId,
  });
}