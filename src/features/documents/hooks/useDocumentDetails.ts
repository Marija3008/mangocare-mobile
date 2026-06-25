import { useQuery } from "@tanstack/react-query";

import { documentsService } from "@/features/documents/services/documentsService";

export function useDocumentDetails(documentId?: string) {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: () => documentsService.getDocumentById(documentId!),
    enabled: !!documentId,
  });
}