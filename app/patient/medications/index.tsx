import { FlatList, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { MedicationCard } from "@/features/medications/components/MedicationCard";
import { useMedications } from "@/features/medications/hooks/useMedications";
import { EmptyState } from "@/shared/components/EmptyState";
import { ErrorState } from "@/shared/components/ErrorState";
import { LoadingState } from "@/shared/components/LoadingState";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function MedicationsScreen() {
  const { data, isLoading, isError, refetch } = useMedications();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <LoadingState
          title="Loading medications..."
          message="Preparing your prescriptions and reminders."
        />
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <ErrorState
          title="Could not load medications"
          message="Please try again in a moment."
          onRetry={() => refetch()}
        />
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.backText} onPress={() => router.back()}>
            ← Back
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>Prescriptions</Text>
          <Text style={styles.title}>Medications</Text>
          <Text style={styles.subtitle}>
            Track active medications, daily doses, and reminder status.
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MedicationCard
              medication={item}
              onPress={() =>
                router.push({
                  pathname: "/patient/medications/[medicationId]",
                  params: {
                    medicationId: item.id,
                  },
                })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="💊"
              title="No medications"
              message="Your active medications and prescriptions will appear here."
            />
          }
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
    paddingTop: spacing.lg,
  },
  topBar: {
    marginBottom: spacing.md,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
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
});