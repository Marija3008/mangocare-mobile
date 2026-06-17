import { useQuery } from "@tanstack/react-query";

import { casesService } from "@/features/cases/services/casesService";

export function useCaseMessages(caseId?: string) {
  return useQuery({
    queryKey: ["caseMessages", caseId],
    queryFn: () => casesService.getCaseMessages(caseId!),
    enabled: !!caseId,
  });
}