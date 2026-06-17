import { StyleSheet, Text, View } from "react-native";

import {
  QuestionnaireResult,
  QuestionnaireSeverity,
} from "@/features/questionnaires/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type ResultSummaryCardProps = {
  result: QuestionnaireResult;
};

function getSeverityMeta(severity: QuestionnaireSeverity) {
  if (severity === "low") {
    return {
      label: "Low",
      color: colors.success,
      backgroundColor: colors.greenSoft,
    };
  }

  if (severity === "mild") {
    return {
      label: "Mild",
      color: colors.primary,
      backgroundColor: colors.primaryLight,
    };
  }

  if (severity === "moderate") {
    return {
      label: "Moderate",
      color: colors.warning,
      backgroundColor: colors.orangeSoft,
    };
  }

  return {
    label: "High",
    color: colors.danger,
    backgroundColor: colors.redSoft,
  };
}

export function ResultSummaryCard({ result }: ResultSummaryCardProps) {
  const severity = getSeverityMeta(result.severity);
  const progress = Math.round((result.totalScore / result.maxScore) * 100);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Assessment Result</Text>
          <Text style={styles.title}>{result.questionnaireTitle}</Text>
        </View>

        <View
          style={[
            styles.severityBadge,
            { backgroundColor: severity.backgroundColor },
          ]}
        >
          <Text style={[styles.severityText, { color: severity.color }]}>
            {severity.label}
          </Text>
        </View>
      </View>

      <Text style={styles.score}>
        {result.totalScore}/{result.maxScore}
      </Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.summary}>{result.summary}</Text>
      <Text style={styles.recommendation}>{result.recommendation}</Text>
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
    marginBottom: spacing.lg,
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
  severityBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  severityText: {
    ...typography.caption,
  },
  score: {
    fontSize: 48,
    fontWeight: "800",
    color: colors.primary,
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  summary: {
    ...typography.bodyMedium,
    color: colors.text,
    lineHeight: 22,
    marginTop: spacing.lg,
  },
  recommendation: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});