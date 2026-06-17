import { Pressable, StyleSheet, Text, View } from "react-native";

import { LabReport } from "@/features/labs/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type LabReportCardProps = {
  report: LabReport;
  onPress: () => void;
};

export function LabReportCard({ report, onPress }: LabReportCardProps) {
  const attentionCount = report.markers.filter(
    (marker) => marker.status !== "optimal"
  ).length;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.label}>{report.labName}</Text>
              <Text style={styles.title}>{report.title}</Text>
              <Text style={styles.date}>Collected: {report.collectedAt}</Text>
            </View>

            <View style={styles.scoreCircle}>
              <Text style={styles.score}>{report.wellnessScore}</Text>
            </View>
          </View>

          <Text style={styles.summary}>{report.summary}</Text>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {report.markers.length} markers
              </Text>
            </View>

            <View
              style={[
                styles.pill,
                attentionCount > 0 ? styles.warningPill : styles.successPill,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  attentionCount > 0
                    ? styles.warningText
                    : styles.successText,
                ]}
              >
                {attentionCount} need attention
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
  label: {
    ...typography.caption,
    color: colors.textSoft,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  scoreCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primary,
  },
  summary: {
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
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.blueSoft,
  },
  successPill: {
    backgroundColor: colors.greenSoft,
  },
  warningPill: {
    backgroundColor: colors.orangeSoft,
  },
  pillText: {
    ...typography.caption,
    color: colors.primary,
  },
  successText: {
    color: colors.success,
  },
  warningText: {
    color: colors.warning,
  },
});