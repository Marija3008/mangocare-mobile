import { useQuery } from "@tanstack/react-query";

import { documentsService } from "@/features/documents/services/documentsService";

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: documentsService.getDocuments,
  });
}