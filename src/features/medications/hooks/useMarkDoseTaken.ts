import { useMutation, useQueryClient } from "@tanstack/react-query";

import { medicationsService } from "@/features/medications/services/medicationsService";

export function useMarkDoseTaken(medicationId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: medicationsService.markDoseTaken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["medication", medicationId] });
    },
  });
}