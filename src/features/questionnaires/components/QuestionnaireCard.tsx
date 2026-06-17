import { Pressable, StyleSheet, Text, View } from "react-native";

import { Questionnaire } from "@/features/questionnaires/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type QuestionnaireCardProps = {
  questionnaire: Questionnaire;
  onPress: () => void;
};

function getCategoryLabel(category: Questionnaire["category"]) {
  if (category === "mental_health") return "Mental Health";
  if (category === "sleep") return "Sleep";
  if (category === "lifestyle") return "Lifestyle";
  return "General Health";
}

export function QuestionnaireCard({
  questionnaire,
  onPress,
}: QuestionnaireCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.category}>
                {getCategoryLabel(questionnaire.category)}
              </Text>
              <Text style={styles.title}>{questionnaire.title}</Text>
            </View>

            {questionnaire.isAssigned ? (
              <View style={styles.assignedBadge}>
                <Text style={styles.assignedText}>Assigned</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.description}>{questionnaire.description}</Text>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {questionnaire.questions.length} questions
              </Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {questionnaire.estimatedMinutes} min
              </Text>
            </View>
          </View>

          {questionnaire.lastCompletedAt ? (
            <Text style={styles.completedText}>
              Last completed:{" "}
              {new Date(questionnaire.lastCompletedAt).toLocaleDateString()}
            </Text>
          ) : null}
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
  category: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  assignedBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  assignedText: {
    ...typography.caption,
    color: colors.primary,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
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
  completedText: {
    ...typography.caption,
    color: colors.textSoft,
    marginTop: spacing.md,
  },
});