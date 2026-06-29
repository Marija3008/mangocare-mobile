import { useQuery } from "@tanstack/react-query";

import { DoctorService } from "@/features/doctor/services/doctorService";
import { useAuth } from "@/providers/AuthProvider";

// Each Doctor gets a separate pending-requests cache entry.
//
// Example:
// ["doctor", "mock-doctor-001", "pending-requests"]
export function getDoctorPendingRequestsQueryKey(doctorId: string) {
  return ["doctor", doctorId, "pending-requests"] as const;
}

export function useDoctorPendingRequests() {
  const { user } = useAuth();

  const doctorId = user?.id ?? "";
  const isDoctor = user?.roles.includes("Doctor") ?? false;

  return useQuery({
    queryKey: getDoctorPendingRequestsQueryKey(doctorId),
    queryFn: DoctorService.getPendingRequests,
    enabled: Boolean(doctorId) && isDoctor,
  });
}