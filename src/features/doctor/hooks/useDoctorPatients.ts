import { useQuery } from "@tanstack/react-query";

import { DoctorService } from "@/features/doctor/services/doctorService";
import { useAuth } from "@/providers/AuthProvider";

// Each Doctor gets a separate active-patients cache entry.
//
// Example:
// ["doctor", "mock-doctor-001", "patients"]
export function getDoctorPatientsQueryKey(doctorId: string) {
  return ["doctor", doctorId, "patients"] as const;
}

export function useDoctorPatients() {
  const { user } = useAuth();

  const doctorId = user?.id ?? "";
  const isDoctor = user?.roles.includes("Doctor") ?? false;

  return useQuery({
    queryKey: getDoctorPatientsQueryKey(doctorId),
    queryFn: DoctorService.getPatients,
    enabled: Boolean(doctorId) && isDoctor,
  });
}