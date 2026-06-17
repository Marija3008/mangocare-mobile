import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ResultSummaryCard } from "@/features/questionnaires/components/ResultSummaryCard";
import { useQuestionnaireResult } from "@/features/questionnaires/hooks/useQuestionnaireResult";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function QuestionnaireResultScreen() {
  const { resultId } = useLocalSearchParams<{ resultId: string }>();

  const { data, isLoading, isError, refetch } =
    useQuestionnaireResult(resultId);

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading result...</Text>
          <Text style={styles.stateText}>
            Preparing your assessment summary.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Result not found</Text>
          <Text style={styles.stateText}>
            This mock result may have been reset after reloading the app.
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>
          <Text
            style={styles.backTextCenter}
            onPress={() => router.replace("/patient/questionnaires")}
          >
            Back to questionnaires
          </Text>
        </View>
      </Screen>
    );
  }

  const aiQuestion = `I completed the ${data.questionnaireTitle} assessment. My score is ${data.totalScore}/${data.maxScore}, severity: ${data.severity}. Summary: ${data.summary}. Recommendation: ${data.recommendation}. Can you explain what this means in simple words and suggest healthy next steps?`;

  const handleAskAi = () => {
    router.push({
      pathname: "/ai-chat",
      params: {
        initialQuestion: aiQuestion,
      },
    });
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text
            style={styles.backText}
            onPress={() => router.replace("/patient/questionnaires")}
          >
            ← Questionnaires
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Assessment Complete</Text>
            <Text style={styles.title}>Your Result</Text>
            <Text style={styles.subtitle}>
              Review your score and use it to prepare better questions for your
              healthcare provider.
            </Text>
          </View>

          <ResultSummaryCard result={data} />

          <View style={styles.aiButton}>
            <AppButton title="Ask AI to explain result" onPress={handleAskAi} />
          </View>

          <Text style={styles.sectionTitle}>Your Answers</Text>

          {data.answers.map((answer) => (
            <Card key={answer.questionId} style={styles.answerCard}>
              <Text style={styles.questionText}>{answer.questionText}</Text>
              <Text style={styles.answerText}>
                Answer: {answer.selectedOptionLabel}
              </Text>
              <Text style={styles.scoreText}>Score: {answer.score}</Text>
            </Card>
          ))}
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
  aiButton: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  answerCard: {
    marginBottom: spacing.md,
  },
  questionText: {
    ...typography.bodyMedium,
    color: colors.text,
    lineHeight: 22,
  },
  answerText: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  scoreText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
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
