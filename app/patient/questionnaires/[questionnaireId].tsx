import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { QuestionCard } from "@/features/questionnaires/components/QuestionCard";
import { useQuestionnaireDetails } from "@/features/questionnaires/hooks/useQuestionnaireDetails";
import { useSubmitQuestionnaire } from "@/features/questionnaires/hooks/useSubmitQuestionnaire";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function QuestionnaireDetailsScreen() {
  const { questionnaireId } = useLocalSearchParams<{
    questionnaireId: string;
  }>();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { data, isLoading, isError, refetch } =
    useQuestionnaireDetails(questionnaireId);

  const submitMutation = useSubmitQuestionnaire();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading questionnaire...</Text>
          <Text style={styles.stateText}>
            Preparing your assessment questions.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Questionnaire not found</Text>
          <Text style={styles.stateText}>
            We could not load this assessment right now.
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>
          <Text style={styles.backTextCenter} onPress={() => router.back()}>
            Go back
          </Text>
        </View>
      </Screen>
    );
  }

  const answeredCount = data.questions.filter(
    (question) => answers[question.id]
  ).length;

  const canSubmit =
    answeredCount === data.questions.length && !submitMutation.isPending;

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const result = await submitMutation.mutateAsync({
      questionnaireId: data.id,
      answers,
    });

    router.replace({
      pathname: "/patient/results/[resultId]",
      params: {
        resultId: result.id,
      },
    });
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.backText} onPress={() => router.back()}>
            ← Back
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Assessment</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{data.description}</Text>
          </View>

          <Card style={styles.progressCard}>
            <Text style={styles.progressLabel}>
              Progress: {answeredCount}/{data.questions.length} answered
            </Text>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(answeredCount / data.questions.length) * 100}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.disclaimer}>
              This assessment is supportive only and does not replace medical
              evaluation.
            </Text>
          </Card>

          {data.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
              selectedOptionId={answers[question.id]}
              onSelectOption={(optionId) =>
                handleSelectAnswer(question.id, optionId)
              }
            />
          ))}

          {submitMutation.isError && (
            <Text style={styles.errorText}>
              Could not submit questionnaire. Please try again.
            </Text>
          )}

          <View style={styles.submitButton}>
            <AppButton
              title={
                submitMutation.isPending
                  ? "Submitting..."
                  : "Submit assessment"
              }
              onPress={handleSubmit}
            />
          </View>

          {!canSubmit && !submitMutation.isPending && (
            <Text style={styles.helperText}>
              Please answer all questions before submitting.
            </Text>
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  topBar: {
    marginBottom: spacing.md,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  backTextCenter: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  progressCard: {
    marginBottom: spacing.lg,
  },
  progressLabel: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: spacing.md,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.md,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSoft,
    textAlign: "center",
    marginTop: spacing.md,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginBottom: spacing.md,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  stateTitle: {
    ...typography.heading,
    color: colors.text,
    textAlign: "center",
  },
  stateText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  retryText: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.lg,
  },
});