import { useQuery } from "@tanstack/react-query";

import { medicationsService } from "@/features/medications/services/medicationsService";

export function useMedicationDetails(medicationId?: string) {
  return useQuery({
    queryKey: ["medication", medicationId],
    queryFn: () => medicationsService.getMedicationById(medicationId!),
    enabled: !!medicationId,
  });
}