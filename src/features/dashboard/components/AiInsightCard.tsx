import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/shared/components/Card";
import { AiInsight } from "@/features/dashboard/types";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type AiInsightCardProps = {
  insight: AiInsight;
};

export function AiInsightCard({ insight }: AiInsightCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>AI</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{insight.title}</Text>
        <Text style={styles.message}>{insight.message}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
    flexDirection: "row",
    gap: spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "800",
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
});