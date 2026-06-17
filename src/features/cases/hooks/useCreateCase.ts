import { useMutation, useQueryClient } from "@tanstack/react-query";

import { casesService } from "@/features/cases/services/casesService";

export function useCreateCase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: casesService.createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}