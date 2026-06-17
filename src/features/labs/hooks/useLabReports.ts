import { useQuery } from "@tanstack/react-query";

import { labsService } from "@/features/labs/services/labsService";

export function useLabReports() {
  return useQuery({
    queryKey: ["labReports"],
    queryFn: labsService.getLabReports,
  });
}
