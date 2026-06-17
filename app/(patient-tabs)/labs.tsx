import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { LabReportCard } from "@/features/labs/components/LabReportCard";
import { useLabReports } from "@/features/labs/hooks/useLabReports";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";
import { AppHeader } from "@/shared/components/AppHeader";
import { ErrorState } from "@/shared/components/ErrorState";
import { LoadingState } from "@/shared/components/LoadingState";

export default function LabsScreen() {
  const { data, isLoading, isError, refetch } = useLabReports();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <LoadingState
          title="Loading lab reports..."
          message="Preparing your blood analysis history."
        />
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <ErrorState
          title="Could not load labs"
          message="Please try again in a moment."
          onRetry={() => refetch()}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <AppHeader
          title="Lab Reports"
          subtitle="Track your blood analysis history and understand key biomarkers."
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LabReportCard
              report={item}
              onPress={() =>
                router.push({
                  pathname: "/patient/labs/[reportId]",
                  params: {
                    reportId: item.id,
                  },
                })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xl,
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
  listContent: {
    paddingBottom: spacing.xxl,
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
