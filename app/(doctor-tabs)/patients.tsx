import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { DoctorPatientCard } from "@/features/doctor/components/DoctorPatientCard";
import { useDoctorPatients } from "@/features/doctor/hooks/useDoctorPatients";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DoctorPatientsScreen() {
  // React Query values created by useDoctorPatients().
  const { data, isLoading, isError, isRefetching, refetch } =
    useDoctorPatients();

  // During the first render, data may still be undefined.
  // ?? [] gives FlatList a safe empty array until data exists.
  const patients = data ?? [];

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading patients...</Text>

          <Text style={styles.stateText}>
            Preparing your active patient list.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load patients</Text>

          <Text style={styles.stateText}>Please try again in a moment.</Text>

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
        // The array we want to render.
        data={patients}
        // React needs a stable unique key for every item.
        // We use relationshipId instead of array index because
        // the list can change after accepting a request.
        keyExtractor={(item) => item.relationshipId}
        // FlatList calls this function once for every patient.
        renderItem={({ item }) => <DoctorPatientCard doctorPatient={item} />}
        // Enables pull-down refresh on phone.
        refreshing={isRefetching}
        onRefresh={() => void refetch()}
        // Content shown above the patient cards.
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Doctor Portal</Text>

            <Text style={styles.title}>My Patients</Text>

            <Text style={styles.subtitle}>
              View the patients currently connected to your care team.
            </Text>
          </View>
        }
        // Content shown when there are no active patients.
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No active patients yet</Text>

            <Text style={styles.emptyText}>
              Accepted patient requests will appear here.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,

          // Empty lists need flexGrow so the empty state can be centered.
          patients.length === 0 && styles.emptyListContent,
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
