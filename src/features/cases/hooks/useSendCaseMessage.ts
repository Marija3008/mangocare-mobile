import { useMutation, useQueryClient } from "@tanstack/react-query";

import { casesService } from "@/features/cases/services/casesService";
import { SendCaseMessagePayload } from "@/features/cases/types";

export function useSendCaseMessage(caseId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendCaseMessagePayload) =>
      casesService.sendMessage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caseMessages", caseId] });
      queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}