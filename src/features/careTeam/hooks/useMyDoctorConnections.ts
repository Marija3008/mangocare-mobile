import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { PatientCareTeamService } from "@/features/careTeam/services/patientCareTeamService";

// This key identifies the Patient's own doctor requests and relationships.
//
// It is separate from the Doctor Directory because they are different data:
//
// Doctor Directory:
// all doctors, with an optional relationship status
//
// My Doctor Connections:
// only doctors this Patient has interacted with
export function getPatientDoctorConnectionsQueryKey(patientId: string) {
  return ["patient", patientId, "doctor-cinnections"] as const;
};

export function useMyDoctorConnections() {
  const {user} = useAuth();

  const patientId = user?.id ?? "";
  const isPatient = user?.roles.includes("Patient") ?? false;

  return useQuery({
    queryKey: getPatientDoctorConnectionsQueryKey(patientId),
    queryFn: PatientCareTeamService.getMyDoctorConnections,
    enabled: Boolean(patientId) && isPatient,
  });
}