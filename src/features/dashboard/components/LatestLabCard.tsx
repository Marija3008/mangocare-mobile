import { Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "@/shared/components/Card";
import { LatestLabSummary } from "@/features/dashboard/types";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type LatestLabCardProps = {
  lab: LatestLabSummary;
  onPress?: () => void;
};

export function LatestLabCard({ lab, onPress }: LatestLabCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View>
              <Text style={styles.label}>Latest Analysis</Text>
              <Text style={styles.title}>{lab.title}</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {lab.abnormalMarkersCount} alerts
              </Text>
            </View>
          </View>

          <Text style={styles.summary}>{lab.summary}</Text>
          <Text style={styles.date}>Collected: {lab.date}</Text>
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
  label: {
    ...typography.caption,
    color: colors.textSoft,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.orangeSoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  badgeText: {
    ...typography.caption,
    color: colors.warning,
  },
  summary: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  date: {
    ...typography.caption,
    color: colors.textSoft,
    marginTop: spacing.md,
  },
});