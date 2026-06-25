// useQuery manages async loading, error state, caching, and refetching.
import { useQuery } from "@tanstack/react-query";

// DoctorService contains the data action.
// It reads mock data now and will call the company API later.
import { DoctorService } from "@/features/doctor/services/doctorService";

// Unique cache key for pending patient requests.
//
// React Query uses this key to know:
// - what data is cached
// - what should be refreshed later after Accept/Reject
export const DOCTOR_PENDING_REQUESTS_QUERY_KEY = [
  "doctor",
  "pending-requests",
] as const;

// Custom hook used by the Doctor Requests screen.
export function useDoctorPendingRequests() {
  return useQuery({
    // Where React Query stores this result in its cache.
    queryKey: DOCTOR_PENDING_REQUESTS_QUERY_KEY,

    // The async function React Query runs to get the data.
    queryFn: DoctorService.getPendingRequests,
  });
}