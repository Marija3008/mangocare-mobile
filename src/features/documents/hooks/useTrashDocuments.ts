import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { documentsService } from "@/features/documents/services/documentsService";

export function useTrashDocuments() {
  return useQuery({
    queryKey: ["documents", "trash"],
    queryFn: documentsService.getTrashDocuments,
  });
}

export function useRestoreDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      documentsService.restoreDocument(documentId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["documents"] }),
        queryClient.invalidateQueries({
          queryKey: ["documents", "trash"],
        }),
      ]);
    },
  });
}

export function usePermanentlyDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      documentsService.permanentlyDeleteDocument(documentId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["documents"] }),
        queryClient.invalidateQueries({
          queryKey: ["documents", "trash"],
        }),
      ]);
    },
  });
}