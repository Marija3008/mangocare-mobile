import { StyleSheet, Text, View } from "react-native";

import { MoodSummary } from "@/features/mood/types";
import { getMoodMeta } from "@/features/mood/utils/moodMeta";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type MoodSummaryCardProps = {
  summary: MoodSummary;
};

export function MoodSummaryCard({ summary }: MoodSummaryCardProps) {
  const moodMeta = getMoodMeta(summary.mostCommonMood);

  return (
    <Card style={styles.card}>
      <Text style={styles.label}>Mood Summary</Text>

      <View style={styles.mainRow}>
        <View>
          <Text style={styles.emoji}>{moodMeta.emoji}</Text>
          <Text style={[styles.moodLabel, { color: moodMeta.color }]}>
            Mostly {moodMeta.label}
          </Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{summary.averageEnergy}/10</Text>
            <Text style={styles.statLabel}>Energy</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{summary.averageStress}/10</Text>
            <Text style={styles.statLabel}>Stress</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>
        Based on {summary.entriesCount} mood check-ins.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
    marginBottom: spacing.md,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.lg,
  },
  emoji: {
    fontSize: 42,
    marginBottom: spacing.xs,
  },
  moodLabel: {
    ...typography.subtitle,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
});
