import { useMutation, useQueryClient } from "@tanstack/react-query";

import { medicationsService } from "@/features/medications/services/medicationsService";

export function useToggleMedicationReminder(medicationId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: medicationsService.toggleReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medications"] });
      queryClient.invalidateQueries({ queryKey: ["medication", medicationId] });
    },
  });
}