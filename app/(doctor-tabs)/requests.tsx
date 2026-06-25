import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { DoctorRequestCard } from "@/features/doctor/components/DoctorRequestCard";
import { useDoctorPendingRequests } from "@/features/doctor/hooks/useDoctorPendingRequests";
import { useDoctorRequestActions } from "@/features/doctor/hooks/useDoctorRequestActions";
import type { PatientConnectionRequest } from "@/features/doctor/types";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DoctorRequestsScreen() {
  // Reads pending requests and query state.
  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useDoctorPendingRequests();

  // Provides the two actions that change request data.
  const {
    acceptRequest,
    rejectRequest,
    isAccepting,
    isRejecting,
  } = useDoctorRequestActions();

  // While one request action is running, disable all request buttons.
  // This prevents accidental double presses.
  const isProcessing = isAccepting || isRejecting;

  // During the first render data may be undefined.
  // FlatList always receives a safe array.
  const requests = data ?? [];

  const performAccept = async (requestId: string): Promise<void> => {
    try {
      await acceptRequest(requestId);

      Alert.alert(
        "Request accepted",
        "The patient was added to your active patient list.",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not accept the patient request.";

      Alert.alert("Could not accept request", message);
    }
  };

  const performReject = async (requestId: string): Promise<void> => {
    try {
      await rejectRequest(requestId);

      Alert.alert(
        "Request rejected",
        "The patient request was removed.",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not reject the patient request.";

      Alert.alert("Could not reject request", message);
    }
  };

  // Confirmation functions do not change data directly.
  // They ask the doctor first, then call performAccept/performReject.
  const handleAccept = (request: PatientConnectionRequest): void => {
    Alert.alert(
      "Accept patient request?",
      `${request.patient.displayName} will be added to your active patients.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {
            void performAccept(request.id);
          },
        },
      ],
    );
  };

  const handleReject = (request: PatientConnectionRequest): void => {
    Alert.alert(
      "Reject patient request?",
      `Remove ${request.patient.displayName}'s pending request?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            void performReject(request.id);
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading requests...</Text>
          <Text style={styles.stateText}>
            Preparing your pending patient requests.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load requests</Text>
          <Text style={styles.stateText}>
            Please try again in a moment.
          </Text>

          <Pressable onPress={() => void refetch()}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorRequestCard
            request={item}
            onAccept={handleAccept}
            onReject={handleReject}
            isProcessing={isProcessing}
          />
        )}
        refreshing={isRefetching}
        onRefresh={() => void refetch()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Doctor Portal</Text>
            <Text style={styles.title}>Patient Requests</Text>
            <Text style={styles.subtitle}>
              Review patient requests and decide whether to add them to your
              active care team.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No pending requests</Text>
            <Text style={styles.emptyText}>
              New patient connection requests will appear here.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          requests.length === 0 && styles.emptyListContent,
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  centerState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  stateTitle: {
    ...typography.heading,
    color: colors.text,
    textAlign: "center",
  },
  stateText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  retryText: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.lg,
  },
  emptyState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.subtitle,
    color: colors.text,
    textAlign: "center",
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: "center",
  },
});