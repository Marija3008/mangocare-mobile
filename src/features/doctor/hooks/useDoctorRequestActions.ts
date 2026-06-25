// useMutation is for actions that change data.
// useQueryClient gives access to React Query's cached data.
import { useMutation, useQueryClient } from "@tanstack/react-query";

// DoctorService performs the actual accept/reject action.
import { DoctorService } from "@/features/doctor/services/doctorService";

// These keys identify the cached data that must refresh after an action.
import { DOCTOR_DASHBOARD_QUERY_KEY } from "@/features/doctor/hooks/useDoctorDashboard";
import { DOCTOR_PATIENTS_QUERY_KEY } from "@/features/doctor/hooks/useDoctorPatients";
import { DOCTOR_PENDING_REQUESTS_QUERY_KEY } from "@/features/doctor/hooks/useDoctorPendingRequests";

// This hook groups actions related to a doctor's pending requests.
export function useDoctorRequestActions() {
  // queryClient manages all React Query cached data.
  const queryClient = useQueryClient();

  // This mutation accepts one pending patient request.
  const acceptRequestMutation = useMutation({
    // mutationFn receives the value passed into mutateAsync().
    //
    // Later the Requests screen will call:
    // await acceptRequest("mock-request-001")
    mutationFn: (requestId: string) => DoctorService.acceptRequest(requestId),

    // onSuccess runs only after DoctorService.acceptRequest succeeds.
    onSuccess: async () => {
      // Accepting a request changes:
      // - pending request count/list
      // - active patient count/list
      // - dashboard statistics
      //
      // Promise.all runs these refresh requests in parallel.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: DOCTOR_PENDING_REQUESTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: DOCTOR_PATIENTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: DOCTOR_DASHBOARD_QUERY_KEY,
        }),
      ]);
    },
  });

  // This mutation rejects one pending patient request.
  const rejectRequestMutation = useMutation({
    mutationFn: (requestId: string) => DoctorService.rejectRequest(requestId),

    onSuccess: async () => {
      // Rejecting a request changes:
      // - pending requests list
      // - pending requests count on dashboard
      //
      // It does NOT change the active patients list.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: DOCTOR_PENDING_REQUESTS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: DOCTOR_DASHBOARD_QUERY_KEY,
        }),
      ]);
    },
  });

  // We return simple names that the screen can use.
  return {
    // mutateAsync returns a Promise, so screens can write:
    // await acceptRequest(requestId)
    acceptRequest: acceptRequestMutation.mutateAsync,
    rejectRequest: rejectRequestMutation.mutateAsync,

    // These are useful for disabling buttons while an action runs.
    isAccepting: acceptRequestMutation.isPending,
    isRejecting: rejectRequestMutation.isPending,

    // A screen can display an error when either action fails.
    error: acceptRequestMutation.error ?? rejectRequestMutation.error,
  };
}