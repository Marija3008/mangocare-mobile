//useQuery() returns an object with state nad helper methods: data, error, isLoading, isFetching, isError, isSuccess, status, refetch, etc.

// It manages loading, error, caching, and refetching for async data.
import { useQuery } from "@tanstack/react-query";

// DoctorService contains the actual data action.
import { DoctorService } from "@/features/doctor/services/doctorService";

// A query key is React Query's unique name for cached data.
//
// "doctor" = feature area
// "dashboard" = exact data inside that feature
//
// Later, after accepting a request, we can tell React Query:
// "the doctor dashboard changed, load it again".
export const DOCTOR_DASHBOARD_QUERY_KEY = ["doctor", "dashboard"] as const;

export function useDoctorDashboard() {
  return useQuery({
    // React Query stores dashboard data under this key.
    queryKey: DOCTOR_DASHBOARD_QUERY_KEY, //unique key for caching and identifying the query
    queryFn: DoctorService.getDashboard, //async function that fetches the data, must return a promise
    // Right now it reads mock arrays.
    // Later it can call the company API without changing this hook.
  });
}
