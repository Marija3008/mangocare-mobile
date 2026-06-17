import { useQuery } from "@tanstack/react-query";

import { labsService } from "@/features/labs/services/labsService";

export function useLabReportDetails(reportId?: string) {
  return useQuery({
    queryKey: ["labReport", reportId],
    queryFn: () => labsService.getLabReportById(reportId!),
    enabled: !!reportId,
  });
}
