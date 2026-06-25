import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PatientConnectionRequest } from "@/features/doctor/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

// These are the values that the parent Requests screen must provide.
type DoctorRequestCardProps = {
  request: PatientConnectionRequest;

  // The card does not accept/reject data itself.
  // It tells its parent screen which request was pressed.
  onAccept: (request: PatientConnectionRequest) => void;
  onReject: (request: PatientConnectionRequest) => void;

  // Disables buttons while an Accept or Reject action is running.
  isProcessing: boolean;
};

// Formats the ISO date received from mock data/API into readable text.
function formatRequestedAt(dateValue: string): string {
  const date = new Date(dateValue);

  // Prevents Invalid Date from appearing if the API sends bad data.
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function DoctorRequestCard({
  request,
  onAccept,
  onReject,
  isProcessing,
}: DoctorRequestCardProps) {
  const patient = request.patient;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initials}>{patient.initials}</Text>
        </View>

        <View style={styles.patientInfo}>
          <Text style={styles.name}>{patient.displayName}</Text>

          <Text style={styles.meta}>
            Born {patient.dateOfBirth} • {patient.gender}
          </Text>
        </View>
      </View>

      <View style={styles.requestedRow}>
        <Ionicons name="time-outline" size={18} color={colors.textMuted} />

        <Text style={styles.requestedText}>
          Requested on {formatRequestedAt(request.requestedAt)}
        </Text>
      </View>

      {request.note && (
        <View style={styles.noteContainer}>
          <Text style={styles.noteLabel}>Patient note</Text>
          <Text style={styles.noteText}>{request.note}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Pressable
          disabled={isProcessing}
          onPress={() => onReject(request)}
          style={[styles.rejectButton, isProcessing && styles.disabledButton]}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </Pressable>

        <Pressable
          disabled={isProcessing}
          onPress={() => onAccept(request)}
          style={[styles.acceptButton, isProcessing && styles.disabledButton]}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </Pressable>
      </View>
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
  requestedRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  requestedText: {
    ...typography.body,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
  noteContainer: {
    backgroundColor: "#F5FAF9",
    borderRadius: 12,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  noteLabel: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  noteText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 21,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  rejectButton: {
    alignItems: "center",
    borderColor: colors.danger,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  rejectButtonText: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
  acceptButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  acceptButtonText: {
    ...typography.bodyMedium,
    color: colors.surface,
  },
  disabledButton: {
    opacity: 0.55,
  },
});
