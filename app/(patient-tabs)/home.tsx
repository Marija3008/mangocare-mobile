import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { AiInsightCard } from "@/features/dashboard/components/AiInsightCard";
import { HealthScoreCard } from "@/features/dashboard/components/HealthScoreCard";
import { LatestLabCard } from "@/features/dashboard/components/LatestLabCard";
import { QuickActions } from "@/features/dashboard/components/QuickActions";
import { UpcomingConsultationCard } from "@/features/dashboard/components/UpcomingConsultationCard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function HomeScreen() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return (
      <Screen>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading dashboard...</Text>
          <Text style={styles.stateText}>
            Preparing your health overview.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Something went wrong</Text>
          <Text style={styles.stateText}>
            We could not load your dashboard right now.
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>
        </View>
      </Screen>
    );
  }

  const quickActions = [
    {
      title: "AI Check-in",
      subtitle: "Ask about symptoms",
      emoji: "🤖",
      onPress: () => router.push("/ai-chat"),
    },
    {
      title: "Mood",
      subtitle: "Log how you feel",
      emoji: "😊",
      onPress: () => router.push("/mood"),
    },
    {
      title: "Labs",
      subtitle: "View blood results",
      emoji: "🧪",
      onPress: () => router.push("/labs"),
    },
    {
      title: "Cases",
      subtitle: "Contact your doctor",
      emoji: "💬",
      onPress: () => router.push("/cases"),
    },
  ];

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MangoCare Patient</Text>
        <Text style={styles.title}>Good morning, {data.patient.firstName}</Text>
        <Text style={styles.subtitle}>
          Here is your personal health overview for today.
        </Text>
      </View>

      <HealthScoreCard healthScore={data.healthScore} />

      <AiInsightCard insight={data.aiInsight} />

      <QuickActions actions={quickActions} />

      <LatestLabCard
        lab={data.latestLab}
        onPress={() => router.push("/labs")}
      />

      <UpcomingConsultationCard
        consultation={data.upcomingConsultation}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.largeTitle,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  centerState: {
    flex: 1,
    minHeight: 400,
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