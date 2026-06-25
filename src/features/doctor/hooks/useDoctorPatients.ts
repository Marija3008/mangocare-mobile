import { useQuery } from "@tanstack/react-query";
import { DoctorService } from "../services/doctorService";

export const DOCTOR_PATIENTS_QUERY_KEY = ["doctor", "patients"] as const;

export function useDoctorPatients() {
  return useQuery({
    queryKey: DOCTOR_PATIENTS_QUERY_KEY,
    queryFn: DoctorService.getPatients,
  });
}


