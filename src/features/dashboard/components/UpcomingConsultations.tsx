import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { UpcomingConsultation } from "@/features/dashboard/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type UpcomingConsultationCardProps = {
  consultation: UpcomingConsultation;
  onPress: () => void;
};

export function UpcomingConsultationCard({
  consultation,
  onPress,
}: UpcomingConsultationCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.titleBlock}>
              <Text style={styles.label}>Upcoming consultation</Text>
              <Text style={styles.doctor}>{consultation.doctorName}</Text>
              <Text style={styles.specialty}>{consultation.specialty}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {consultation.date} at {consultation.time}
              </Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>{consultation.type}</Text>
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
  doctor: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: spacing.xs,
  },
  specialty: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
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
    textTransform: "capitalize",
  },
});