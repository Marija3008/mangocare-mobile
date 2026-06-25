import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import type { DoctorPatient } from "@/features/doctor/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

// Props are the values the parent screen must provide to this component.
type DoctorPatientCardProps = {
  doctorPatient: DoctorPatient;
};

// Date of birth is stored as YYYY-MM-DD.
//
// We format it manually instead of using new Date(...),
// because dates of birth should not accidentally shift because of time zones.
function formatDateOnly(dateValue: string): string {
  const [year, month, day] = dateValue.split("-");

  // Return the original value if it does not have the expected format.
  if (!year || !month || !day) {
    return dateValue;
  }

  return `${day}.${month}.${year}`;
}

// This component only displays one patient card.
// It does not fetch data and does not contain navigation logic yet.
export function DoctorPatientCard({ doctorPatient }: DoctorPatientCardProps) {
  // Rename the nested patient object for clearer reading.
  const patientInfo = doctorPatient.patient;

  return (
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

          <Text style={styles.detailText}>{doctorPatient.latestLabLabel}</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
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
});
