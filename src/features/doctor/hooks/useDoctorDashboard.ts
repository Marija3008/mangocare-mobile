import { useQuery } from "@tanstack/react-query";

import { DoctorService } from "@/features/doctor/services/doctorService";
import { useAuth } from "@/providers/AuthProvider";

// Each Doctor gets a separate dashboard cache entry.
//
// Example:
// ["doctor", "mock-doctor-001", "dashboard"]
export function getDoctorDashboardQueryKey(doctorId: string) {
  return ["doctor", doctorId, "dashboard"] as const;
}

export function useDoctorDashboard() {
  const { user } = useAuth();

  const doctorId = user?.id ?? "";
  const isDoctor = user?.roles.includes("Doctor") ?? false;

  return useQuery({
    queryKey: getDoctorDashboardQueryKey(doctorId),
    queryFn: DoctorService.getDashboard,

    // Do not load Doctor data before authentication finishes,
    // or when the signed-in user is not a Doctor.
    enabled: Boolean(doctorId) && isDoctor,
  });
}