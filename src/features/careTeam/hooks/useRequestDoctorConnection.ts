import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RequestDoctorConnectionPayload } from "@/features/careTeam/types";
import { useDoctorDirectory } from "@/features/careTeam/hooks/useDoctorDirectory";
import { useMyDoctorConnections } from "@/features/careTeam/hooks/useMyDoctorConnections";
import { PatientCareTeamService } from "@/features/careTeam/services/patientCareTeamService";

// We need the exported cache keys, not the hook functions themselves.
import {
  getPatientDoctorDirectoryQueryKey,
} from "@/features/careTeam/hooks/useDoctorDirectory";

import {
  getPatientDoctorConnectionsQueryKey,
} from "@/features/careTeam/hooks/useMyDoctorConnections";
import { useAuth } from "@/providers/AuthProvider";

// This hook handles the Patient action:
// “Send a connection request to a Doctor.”
export function useRequestDoctorConnection() {
  // queryClient lets us refresh cached query data after the request succeeds.
  const queryClient = useQueryClient();
  const {user} = useAuth();

  const patientId = user?.id ?? "";
  const isPatient = user?.roles.includes("Patient") ?? false;

  return useMutation({
    mutationFn: (payload: RequestDoctorConnectionPayload) =>{
      if (!patientId || !isPatient) {
        throw new Error(
          "You must besigned in as a patient to request a doctor connection.",
        );
      }

      return PatientCareTeamService.requestDoctorConnection(payload);
    },
      

    // This runs only when the request was created successfully.
    onSuccess: async () => {
      if (!patientId) {
        return;
      }

      //refresh only the currently signed-in Patient's cached data.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getPatientDoctorDirectoryQueryKey(patientId),
        }),
        queryClient.invalidateQueries({
          queryKey: getPatientDoctorConnectionsQueryKey(patientId),
        }),
      ]);
    },
  });
}