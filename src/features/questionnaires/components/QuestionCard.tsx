import { Pressable, StyleSheet, Text, View } from "react-native";

import { QuestionnaireQuestion } from "@/features/questionnaires/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type QuestionCardProps = {
  question: QuestionnaireQuestion;
  questionNumber: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
};

export function QuestionCard({
  question,
  questionNumber,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.questionNumber}>Question {questionNumber}</Text>
      <Text style={styles.questionText}>{question.text}</Text>

      {question.helperText ? (
        <Text style={styles.helperText}>{question.helperText}</Text>
      ) : null}

      <View style={styles.options}>
        {question.options.map((option) => {
          const selected = selectedOptionId === option.id;

          return (
            <Pressable
              key={option.id}
              onPress={() => onSelectOption(option.id)}
              style={[
                styles.option,
                selected ? styles.optionSelected : styles.optionInactive,
              ]}
            >
              <View
                style={[
                  styles.radioOuter,
                  selected && styles.radioOuterSelected,
                ]}
              >
                {selected ? <View style={styles.radioInner} /> : null}
              </View>

              <Text
                style={[
                  styles.optionLabel,
                  selected && styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  questionNumber: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  questionText: {
    ...typography.subtitle,
    color: colors.text,
    lineHeight: 22,
  },
  helperText: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  options: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  optionInactive: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionLabel: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
  },
  optionLabelSelected: {
    color: colors.text,
    fontWeight: "600",
  },
});