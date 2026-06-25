// useQuery manages async data, loading state, errors, caching, and refetching.
import { useQuery } from "@tanstack/react-query";

// DoctorService contains the method that loads one active patient.
import { DoctorService } from "@/features/doctor/services/doctorService";

// This creates a query key for one specific patient.
//
// Example:
// ["doctor", "patient", "mock-patient-001"]
//
// Including patientId is important because every patient must have
// separate cached data.
export function getDoctorPatientQueryKey(patientId: string) {
  return ["doctor", "patient", patientId] as const;
}

// This hook loads one active patient for the currently signed-in doctor.
export function useDoctorPatient(patientId: string) {
  return useQuery({
    // React Query uses this to identify and cache this patient's data.
    queryKey: getDoctorPatientQueryKey(patientId),

    // This function runs when React Query needs the patient data.
    queryFn: () => DoctorService.getPatientById(patientId),

    // Do not run the query when patientId is empty.
    //
    // This prevents calling the service with an invalid ID
    // while a dynamic route is still loading its parameters.
    enabled: Boolean(patientId),
  });
}