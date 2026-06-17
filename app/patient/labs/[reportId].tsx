import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BiomarkerCard } from "@/features/labs/components/BiomarkerCard";
import { useLabReportDetails } from "@/features/labs/hooks/useLabReportDetails";

import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";

import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function LabReportDetailsScreen() {
  const { reportId } = useLocalSearchParams<{ reportId: string }>();

  const { data, isLoading, isError, refetch } = useLabReportDetails(reportId);

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading report...</Text>
          <Text style={styles.stateText}>
            Preparing your lab report details.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Report not found</Text>
          <Text style={styles.stateText}>
            We could not find this lab report.
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

  const attentionMarkers = data.markers.filter(
    (marker) => marker.status !== "optimal",
  );

  const askAiMessage = `Can you explain this lab report in simple words? Report: ${
    data.title
  }, wellness score: ${data.wellnessScore}, summary: ${
    data.summary
  }. Markers: ${data.markers
    .map(
      (marker) =>
        `${marker.name}: ${marker.value} ${marker.unit}, status: ${marker.status}, reference range: ${marker.referenceRange}`,
    )
    .join("; ")}.`;

  const handleAskAi = () => {
    router.push({
      pathname: "/ai-chat",
      params: {
        initialQuestion: askAiMessage,
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
            <Text style={styles.eyebrow}>{data.labName}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>
              Collected on {data.collectedAt} • Reviewed by {data.reviewedBy}
            </Text>
          </View>

          <Card style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Wellness Score</Text>
            <Text style={styles.score}>{data.wellnessScore}</Text>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${data.wellnessScore}%` },
                ]}
              />
            </View>

            <Text style={styles.summaryText}>{data.summary}</Text>
          </Card>

          {attentionMarkers.length > 0 && (
            <Card style={styles.alertCard}>
              <Text style={styles.alertTitle}>Needs attention</Text>
              <Text style={styles.alertText}>
                {attentionMarkers.length} marker(s) may need follow-up. This is
                not a diagnosis, but it can help you prepare better questions
                for your doctor.
              </Text>
            </Card>
          )}

          <View style={styles.aiAction}>
            <AppButton
              title="Ask AI to explain this report"
              onPress={handleAskAi}
            />
          </View>

          <Text style={styles.sectionTitle}>Biomarkers</Text>

          {data.markers.map((marker) => (
            <BiomarkerCard key={marker.id} marker={marker} />
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
  summaryCard: {
    marginBottom: spacing.lg,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSoft,
  },
  score: {
    fontSize: 56,
    fontWeight: "800",
    color: colors.primary,
    marginTop: spacing.sm,
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  summaryText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  alertCard: {
    backgroundColor: colors.orangeSoft,
    marginBottom: spacing.lg,
  },
  alertTitle: {
    ...typography.subtitle,
    color: colors.warning,
  },
  alertText: {
    ...typography.body,
    color: colors.warning,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  aiAction: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
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
