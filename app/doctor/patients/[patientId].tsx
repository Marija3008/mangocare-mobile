import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useDoctorPatient } from "@/features/doctor/hooks/useDoctorPatient";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

// Date of birth is stored as YYYY-MM-DD.
//
// We format it manually so it does not shift because of time zones.
function formatDateOnly(dateValue: string): string {
  const [year, month, day] = dateValue.split("-");

  if (!year || !month || !day) {
    return dateValue;
  }

  return `${day}.${month}.${year}`;
}

// This formats a full ISO date such as:
// 2026-05-12T09:30:00.000Z
//
// into a readable date for the UI.
function formatDateTime(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DoctorPatientDetailsScreen() {
  // Route parameters come from the URL/path.
  //
  // Example path:
  // /doctor/patients/mock-patient-001
  //
  // means params.patientId is "mock-patient-001".
  const params = useLocalSearchParams<{
    patientId?: string | string[];
  }>();

  // A route value can theoretically be string[].
  // We normalize it so our hook always receives one string.
  const patientId = Array.isArray(params.patientId)
    ? params.patientId[0] ?? ""
    : params.patientId ?? "";

  // This hook loads exactly one active patient.
  const { data, isLoading, isError, refetch } =
    useDoctorPatient(patientId);

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading patient...</Text>

          <Text style={styles.stateText}>
            Preparing the patient overview.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load patient</Text>

          <Text style={styles.stateText}>
            This patient may no longer be available in your active care team.
          </Text>

          <Pressable onPress={() => void refetch()}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backTextCenter}>Go back</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  // data is a DoctorPatient object.
  //
  // The actual patient information is nested inside data.patient.
  const patient = data.patient;

  return (
    <Screen>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back to patients</Text>
        </Pressable>

        <Text style={styles.eyebrow}>Doctor Portal</Text>

        <Text style={styles.title}>{patient.displayName}</Text>

        <Text style={styles.subtitle}>
          Patient overview available to your active care relationship.
        </Text>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Patient Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date of birth</Text>
            <Text style={styles.infoValue}>
              {formatDateOnly(patient.dateOfBirth)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{patient.gender}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Relationship status</Text>
            <Text style={styles.activeStatus}>
              {data.relationshipStatus}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Connected since</Text>
            <Text style={styles.infoValue}>
              {formatDateTime(data.relationshipStartedAt)}
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Recent Activity</Text>

          <Text style={styles.activityText}>
            {data.lastActivityLabel}
          </Text>

          {data.latestDocumentLabel && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Latest document</Text>
              <Text style={styles.detailValue}>
                {data.latestDocumentLabel}
              </Text>
            </View>
          )}

          {data.latestLabLabel && (
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Latest laboratory update</Text>
              <Text style={styles.detailValue}>
                {data.latestLabLabel}
              </Text>
            </View>
          )}
        </Card>

        <Card style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Mock mode notice</Text>

          <Text style={styles.noticeText}>
            This screen currently shows mock summary data. When the company API
            is connected, the backend must verify the active doctor-patient
            relationship before returning any patient information.
          </Text>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: spacing.lg,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
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
  card: {
    marginTop: spacing.lg,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  infoLabel: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
  },
  infoValue: {
    ...typography.bodyMedium,
    color: colors.text,
    textAlign: "right",
  },
  activeStatus: {
    ...typography.bodyMedium,
    color: colors.primary,
    textAlign: "right",
  },
  activityText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },
  detailSection: {
    marginTop: spacing.md,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  detailValue: {
    ...typography.bodyMedium,
    color: colors.text,
    marginTop: spacing.xs,
  },
  noticeCard: {
    marginTop: spacing.lg,
  },
  noticeTitle: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  noticeText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 21,
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
  backTextCenter: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.md,
  },
});