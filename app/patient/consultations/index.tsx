import { FlatList, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { ConsultationCard } from "@/features/consultations/components/ConsultationCard";
import { useConsultations } from "@/features/consultations/hooks/useConsultations";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function ConsultationsScreen() {
  const { data, isLoading, isError, refetch } = useConsultations();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading consultations...</Text>
          <Text style={styles.stateText}>
            Preparing your upcoming and past appointments.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load consultations</Text>
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
        <View style={styles.topBar}>
          <Text style={styles.backText} onPress={() => router.back()}>
            ← Back
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>Appointments</Text>
          <Text style={styles.title}>Consultations</Text>
          <Text style={styles.subtitle}>
            View upcoming consultations, past appointments, and preparation
            notes.
          </Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConsultationCard
              consultation={item}
              onPress={() =>
                router.push({
                  pathname: "/patient/consultations/[consultationId]",
                  params: {
                    consultationId: item.id,
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