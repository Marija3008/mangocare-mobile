import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MedicationDose } from "@/features/medications/types";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type MedicationDoseCardProps = {
  dose: MedicationDose;
  disabled?: boolean;
  onMarkTaken: () => void;
};

export function MedicationDoseCard({
  dose,
  disabled = false,
  onMarkTaken,
}: MedicationDoseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.timeBlock}>
        <Ionicons
          name={dose.taken ? "checkmark-circle" : "time-outline"}
          size={24}
          color={dose.taken ? colors.success : colors.primary}
        />

        <View>
          <Text style={styles.time}>{dose.time}</Text>
          <Text style={styles.status}>
            {dose.taken ? "Taken" : "Scheduled"}
          </Text>
        </View>
      </View>

      {!dose.taken ? (
        <Pressable
          onPress={onMarkTaken}
          disabled={disabled}
          style={({ pressed }) => [
            styles.button,
            disabled && styles.disabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Mark taken</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  timeBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  time: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  status: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  buttonText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.82,
  },
});