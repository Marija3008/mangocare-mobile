import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getDoctorDashboardQueryKey,
} from "@/features/doctor/hooks/useDoctorDashboard";
import {
  getDoctorPatientsQueryKey,
} from "@/features/doctor/hooks/useDoctorPatients";
import {
  getDoctorPendingRequestsQueryKey,
} from "@/features/doctor/hooks/useDoctorPendingRequests";
import { DoctorService } from "@/features/doctor/services/doctorService";
import { useAuth } from "@/providers/AuthProvider";

export function useDoctorRequestActions() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const doctorId = user?.id ?? "";
  const isDoctor = user?.roles.includes("Doctor") ?? false;

  const acceptRequestMutation = useMutation({
    mutationFn: async (requestId: string) => {
      if (!doctorId || !isDoctor) {
        throw new Error(
          "You must be signed in as a Doctor to accept a patient request.",
        );
      }

      return DoctorService.acceptRequest(requestId);
    },

    onSuccess: async () => {
      if (!doctorId) {
        return;
      }

      // Accepting changes all three Doctor data areas:
      // dashboard counts, active patients, and pending requests.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getDoctorDashboardQueryKey(doctorId),
        }),
        queryClient.invalidateQueries({
          queryKey: getDoctorPatientsQueryKey(doctorId),
        }),
        queryClient.invalidateQueries({
          queryKey: getDoctorPendingRequestsQueryKey(doctorId),
        }),
      ]);
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: async (requestId: string) => {
      if (!doctorId || !isDoctor) {
        throw new Error(
          "You must be signed in as a Doctor to reject a patient request.",
        );
      }

      return DoctorService.rejectRequest(requestId);
    },

    onSuccess: async () => {
      if (!doctorId) {
        return;
      }

      // Rejecting changes only dashboard counts and pending requests.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getDoctorDashboardQueryKey(doctorId),
        }),
        queryClient.invalidateQueries({
          queryKey: getDoctorPendingRequestsQueryKey(doctorId),
        }),
      ]);
    },
  });

  return {
    acceptRequest: acceptRequestMutation.mutateAsync,
    rejectRequest: rejectRequestMutation.mutateAsync,

    isAccepting: acceptRequestMutation.isPending,
    isRejecting: rejectRequestMutation.isPending,

    error: acceptRequestMutation.error ?? rejectRequestMutation.error,
  };
}