import { useMutation, useQueryClient } from "@tanstack/react-query";

import { consultationsService } from "@/features/consultations/services/consultationsService";

export function useCancelConsultation(consultationId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: consultationsService.cancelConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
      queryClient.invalidateQueries({
        queryKey: ["consultation", consultationId],
      });
    },
  });
}