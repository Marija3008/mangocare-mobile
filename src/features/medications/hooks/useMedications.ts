import { useQuery } from "@tanstack/react-query";

import { medicationsService } from "../services/medicationsService";

export function useMedications() {
  return useQuery({
    queryKey: ["medications"],
    queryFn: medicationsService.getMedications,
  });
}