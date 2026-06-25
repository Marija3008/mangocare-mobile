import { useQuery } from "@tanstack/react-query";

import { consultationsService } from "@/features/consultations/services/consultationsService";

export function useConsultations() {
  return useQuery({
    queryKey: ["consultations"],
    queryFn: consultationsService.getConsultations,
  });
}