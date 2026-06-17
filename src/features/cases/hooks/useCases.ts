import { useQuery } from "@tanstack/react-query";

import { casesService } from "@/features/cases/services/casesService";

export function useCases() {
  return useQuery({
    queryKey: ["cases"],
    queryFn: casesService.getCases,
  });
}