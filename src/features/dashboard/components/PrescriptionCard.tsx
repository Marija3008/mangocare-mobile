import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PrescriptionSummary } from "@/features/dashboard/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type PrescriptionsCardProps = {
  prescriptions: PrescriptionSummary[];
  onPress: () => void;
};

export function PrescriptionsCard({
  prescriptions,
  onPress,
}: PrescriptionsCardProps) {
  const safePrescriptions = prescriptions ?? [];
  const nextPrescription = safePrescriptions[0];

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="medical-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.titleBlock}>
              <Text style={styles.label}>Medications</Text>
              <Text style={styles.title}>
                {safePrescriptions.length} active prescriptions
              </Text>
            </View>
          </View>

          {nextPrescription ? (
            <View style={styles.nextDose}>
              <Text style={styles.nextDoseLabel}>Next dose</Text>
              <Text style={styles.nextDoseText}>
                {nextPrescription.name} • {nextPrescription.dosage} at{" "}
                {nextPrescription.nextDoseTime}
              </Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>
              No medication reminders scheduled.
            </Text>
          )}
        </Card>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  pressed: {
    opacity: 0.88,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: {
    flex: 1,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: spacing.xs,
  },
  nextDose: {
    backgroundColor: colors.blueSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  nextDoseLabel: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  nextDoseText: {
    ...typography.bodyMedium,
    color: colors.text,
    lineHeight: 22,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});