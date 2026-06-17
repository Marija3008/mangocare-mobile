import { StyleSheet, Text, View } from "react-native";

import { MoodEntry } from "@/features/mood/types";
import { getMoodMeta } from "@/features/mood/utils/moodMeta";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type MoodEntryCardProps = {
  entry: MoodEntry;
};

function formatEntryDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MoodEntryCard({ entry }: MoodEntryCardProps) {
  const meta = getMoodMeta(entry.mood);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.moodRow}>
          <View
            style={[
              styles.emojiCircle,
              { backgroundColor: meta.backgroundColor },
            ]}
          >
            <Text style={styles.emoji}>{meta.emoji}</Text>
          </View>

          <View>
            <Text style={styles.moodLabel}>{meta.label}</Text>
            <Text style={styles.date}>{formatEntryDate(entry.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.metrics}>
          <Text style={styles.metricText}>Energy {entry.energyLevel}/10</Text>
          <Text style={styles.metricText}>Stress {entry.stressLevel}/10</Text>
        </View>
      </View>

      {entry.note ? <Text style={styles.note}>{entry.note}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    gap: spacing.md,
  },
  moodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 24,
  },
  moodLabel: {
    ...typography.subtitle,
    color: colors.text,
  },
  date: {
    ...typography.caption,
    color: colors.textSoft,
    marginTop: spacing.xs,
  },
  metrics: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  metricText: {
    ...typography.caption,
    color: colors.primary,
    backgroundColor: colors.blueSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  note: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.md,
  },
});
