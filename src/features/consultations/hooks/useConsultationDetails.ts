import { useQuery } from "@tanstack/react-query";

import { consultationsService } from "@/features/consultations/services/consultationsService";

export function useConsultationDetails(consultationId?: string) {
  return useQuery({
    queryKey: ["consultation", consultationId],
    queryFn: () =>
      consultationsService.getConsultationById(consultationId!),
    enabled: !!consultationId,
  });
}