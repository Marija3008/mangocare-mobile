// useQuery manages async loading, errors, caching, and refetching.
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

import { PatientCareTeamService } from "@/features/careTeam/services/patientCareTeamService";

export function getPatientDoctorDirectoryQueryKey(patientId: string) {
  return ["patient", patientId, "doctor-directory"] as const;
}

export function useDoctorDirectory() {
  const { user } = useAuth();

  const patientId = user?.id ?? "";
  const isPatient = user?.roles.includes("Patient") ?? false;

  return useQuery({
    queryKey: getPatientDoctorDirectoryQueryKey(patientId),
    queryFn: PatientCareTeamService.getDoctorDirectory,
    enabled: Boolean(patientId) && isPatient, //do not fetch before the auth is restored, or when the signed-in account is not a Patient
  });
}
