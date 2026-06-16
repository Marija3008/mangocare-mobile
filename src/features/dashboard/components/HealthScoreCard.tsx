import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";
import { HealthScore } from "@/features/dashboard/types";

type HealthScoreCardProps = {
  healthScore: HealthScore;
};

export function HealthScoreCard({ healthScore }: HealthScoreCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Health Score</Text>
          <Text style={styles.status}>{healthScore.label}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{healthScore.trend}</Text>
        </View>
      </View>

      <Text style={styles.score}>{healthScore.value}</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${healthScore.value}%` }]} />
      </View>

      <Text style={styles.description}>{healthScore.description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  label: {
    ...typography.subtitle,
    color: colors.textMuted,
  },
  status: {
    ...typography.caption,
    color: colors.success,
    marginTop: spacing.xs,
  },
  badge: {
    backgroundColor: colors.greenSoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  badgeText: {
    ...typography.caption,
    color: colors.success,
    textTransform: "capitalize",
  },
  score: {
    fontSize: 64,
    fontWeight: "800",
    color: colors.primary,
    marginTop: spacing.md,
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.md,
  },
});