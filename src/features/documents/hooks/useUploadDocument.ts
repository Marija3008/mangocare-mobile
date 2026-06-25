import { useMutation, useQueryClient } from "@tanstack/react-query";

import { documentsService } from "@/features/documents/services/documentsService";

export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentsService.uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}