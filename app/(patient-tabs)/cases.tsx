import { FlatList, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { CaseCard } from "@/features/cases/components/CaseCard";
import { useCases } from "@/features/cases/hooks/useCases";
import { AppButton } from "@/shared/components/AppButton";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function CasesScreen() {
  const { data, isLoading, isError, refetch } = useCases();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading cases...</Text>
          <Text style={styles.stateText}>
            Preparing your consultation history.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load cases</Text>
          <Text style={styles.stateText}>Please try again in a moment.</Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Consultations</Text>
          <Text style={styles.title}>My Cases</Text>
          <Text style={styles.subtitle}>
            Contact your healthcare team, follow up on symptoms, and track case
            progress.
          </Text>
        </View>

        <View style={styles.newCaseButton}>
          <AppButton
            title="Open new case"
            onPress={() => router.push("/patient/cases/new")}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CaseCard
              item={item}
              onPress={() =>
                router.push({
                  pathname: "/patient/cases/[caseId]",
                  params: {
                    caseId: item.id,
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
    marginBottom: spacing.lg,
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
  newCaseButton: {
    marginBottom: spacing.xl,
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