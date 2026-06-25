import { Pressable, StyleSheet, Text, View } from "react-native";

import { DoctorStatCard } from "@/features/doctor/components/DoctorStatCard";
import { useDoctorDashboard } from "@/features/doctor/hooks/useDoctorDashboard";
import { useAuth } from "@/providers/AuthProvider";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DoctorDashboardScreen() {
  // This reads the currently signed-in doctor from AuthProvider.
  const { user } = useAuth();

  // This hook gives the screen:
  // data      -> dashboard numbers after loading
  // isLoading -> true while data is loading
  // isError   -> true when loading fails
  // refetch   -> loads dashboard data again
  const { data, isLoading, isError, refetch } = useDoctorDashboard();

  // Optional chaining prevents an error if user is temporarily null.
  // Nullish coalescing uses "Doctor" as a fallback.
  const doctorName = user?.displayName ?? "Doctor";

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading dashboard...</Text>
          <Text style={styles.stateText}>Preparing your patient overview.</Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load dashboard</Text>

          <Text style={styles.stateText}>Please try again in a moment.</Text>

          <Pressable onPress={() => void refetch()}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Doctor Portal</Text>

        <Text style={styles.title}>Welcome, {doctorName}</Text>

        <Text style={styles.subtitle}>
          Here is an overview of your current patient activity.
        </Text>

        <View style={styles.statsGrid}>
          <DoctorStatCard
            icon="people-outline"
            label="Active Patients"
            value={data.activePatientsCount}
            description="Patients currently connected to you"
          />

          <DoctorStatCard
            icon="mail-unread-outline"
            label="Pending Requests"
            value={data.pendingRequestsCount}
            description="Requests waiting for your decision"
          />

          <DoctorStatCard
            icon="document-text-outline"
            label="Documents to Review"
            value={data.documentsToReviewCount}
            description="Documents waiting for review"
          />

          <DoctorStatCard
            icon="calendar-outline"
            label="Consultations"
            value={data.upcomingConsultationsCount}
            description="Upcoming consultations"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.xl,
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
});
