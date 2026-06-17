import { Pressable, StyleSheet, Text, View } from "react-native";

import { Medication } from "@/features/medications/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type MedicationCardProps = {
  medication: Medication;
  onPress: () => void;
};

function getStatusMeta(status: Medication["status"]) {
  if (status === "active") {
    return {
      label: "Active",
      color: colors.success,
      backgroundColor: colors.greenSoft,
    };
  }

  if (status === "paused") {
    return {
      label: "Paused",
      color: colors.warning,
      backgroundColor: colors.orangeSoft,
    };
  }

  return {
    label: "Completed",
    color: colors.textSoft,
    backgroundColor: colors.blueSoft,
  };
}

function getNextDose(medication: Medication) {
  return medication.dosesToday.find((dose) => !dose.taken);
}

export function MedicationCard({ medication, onPress }: MedicationCardProps) {
  const status = getStatusMeta(medication.status);
  const nextDose = getNextDose(medication);
  const takenCount = medication.dosesToday.filter((dose) => dose.taken).length;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.name}>{medication.name}</Text>
              <Text style={styles.dosage}>{medication.dosage}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: status.backgroundColor },
              ]}
            >
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          </View>

          <Text style={styles.instructions} numberOfLines={2}>
            {medication.instructions}
          </Text>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                Next: {nextDose ? nextDose.time : "Done today"}
              </Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {takenCount}/{medication.dosesToday.length} taken
              </Text>
            </View>

            <View
              style={[
                styles.pill,
                medication.reminderEnabled
                  ? styles.reminderOn
                  : styles.reminderOff,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  medication.reminderEnabled
                    ? styles.reminderOnText
                    : styles.reminderOffText,
                ]}
              >
                {medication.reminderEnabled ? "Reminder on" : "Reminder off"}
              </Text>
            </View>
          </View>
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
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  titleBlock: {
    flex: 1,
  },
  name: {
    ...typography.subtitle,
    color: colors.text,
  },
  dosage: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statusBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  statusText: {
    ...typography.caption,
  },
  instructions: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  pill: {
    backgroundColor: colors.blueSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  pillText: {
    ...typography.caption,
    color: colors.primary,
  },
  reminderOn: {
    backgroundColor: colors.greenSoft,
  },
  reminderOff: {
    backgroundColor: colors.orangeSoft,
  },
  reminderOnText: {
    color: colors.success,
  },
  reminderOffText: {
    color: colors.warning,
  },
});