import { useQuery } from "@tanstack/react-query";

import { casesService } from "@/features/cases/services/casesService";

export function useCaseDetails(caseId?: string) {
  return useQuery({
    queryKey: ["case", caseId],
    queryFn: () => casesService.getCaseById(caseId!),
    enabled: !!caseId,
  });
}
