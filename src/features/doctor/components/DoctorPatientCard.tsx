import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { DoctorPatient } from "@/features/doctor/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type DoctorPatientCardProps = {
  doctorPatient: DoctorPatient;

  // The parent decides what should happen when this card is tapped.
  onPress: (patientId: string) => void;
};

function formatDateOnly(dateValue: string): string {
  const [year, month, day] = dateValue.split("-");

  if (!year || !month || !day) {
    return dateValue;
  }

  return `${day}.${month}.${year}`;
}

export function DoctorPatientCard({
  doctorPatient,
  onPress,
}: DoctorPatientCardProps) {
  const patientInfo = doctorPatient.patient;

  return (
    <Pressable
      // Tell the parent which patient was selected.
      onPress={() => onPress(patientInfo.id)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${patientInfo.displayName}'s patient overview`}
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressedContainer,
      ]}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.initialsCircle}>
            <Text style={styles.initials}>{patientInfo.initials}</Text>
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.name}>{patientInfo.displayName}</Text>

            <Text style={styles.meta}>
              Born {formatDateOnly(patientInfo.dateOfBirth)} •{" "}
              {patientInfo.gender}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {doctorPatient.relationshipStatus}
            </Text>
          </View>
        </View>

        <View style={styles.activityRow}>
          <Ionicons name="time-outline" size={18} color={colors.textMuted} />

          <Text style={styles.activityText}>
            {doctorPatient.lastActivityLabel}
          </Text>
        </View>

        {doctorPatient.latestDocumentLabel && (
          <View style={styles.detailRow}>
            <Ionicons
              name="document-text-outline"
              size={18}
              color={colors.primary}
            />

            <Text style={styles.detailText}>
              {doctorPatient.latestDocumentLabel}
            </Text>
          </View>
        )}

        {doctorPatient.latestLabLabel && (
          <View style={styles.detailRow}>
            <Ionicons name="flask-outline" size={18} color={colors.primary} />

            <Text style={styles.detailText}>
              {doctorPatient.latestLabLabel}
            </Text>
          </View>
        )}

        <Text style={styles.openHint}>Tap to view overview</Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    marginBottom: spacing.md,
  },
  pressedContainer: {
    opacity: 0.78,
  },
  card: {
    marginBottom: 0,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  initialsCircle: {
    alignItems: "center",
    backgroundColor: "#E4F4F0",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  initials: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  patientInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.subtitle,
    color: colors.text,
  },
  meta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statusBadge: {
    backgroundColor: "#E4F4F0",
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    ...typography.caption,
    color: colors.primary,
  },
  activityRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  activityText: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
    marginLeft: spacing.sm,
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.sm,
  },
  detailText: {
    ...typography.bodyMedium,
    color: colors.text,
    flex: 1,
    marginLeft: spacing.sm,
  },
  openHint: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.md,
  },
});
