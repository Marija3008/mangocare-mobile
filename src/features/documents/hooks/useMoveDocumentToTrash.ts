import { useMutation, useQueryClient } from "@tanstack/react-query";

import { documentsService } from "@/features/documents/services/documentsService";

export function useMoveDocumentToTrash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      documentsService.moveToTrash(documentId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });
}