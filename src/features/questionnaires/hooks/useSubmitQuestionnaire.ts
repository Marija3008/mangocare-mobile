import { useMutation, useQueryClient } from "@tanstack/react-query";

import { questionnairesService } from "@/features/questionnaires/services/questionnairesService";

export function useSubmitQuestionnaire() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: questionnairesService.submitQuestionnaire,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
  });
}