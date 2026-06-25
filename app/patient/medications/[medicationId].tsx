import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MedicationDoseCard } from "@/features/medications/components/MedicationDoseCard";
import { useMarkDoseTaken } from "@/features/medications/hooks/useMarkDoseTaken";
import { useMedicationDetails } from "@/features/medications/hooks/useMedicationDetails";
import { useToggleMedicationReminder } from "@/features/medications/hooks/useToggleMedicationReminder";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { ErrorState } from "@/shared/components/ErrorState";
import { LoadingState } from "@/shared/components/LoadingState";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

function getFrequencyLabel(frequency: string) {
  if (frequency === "once_daily") return "Once daily";
  if (frequency === "twice_daily") return "Twice daily";
  if (frequency === "three_times_daily") return "Three times daily";
  if (frequency === "weekly") return "Weekly";
  return "As needed";
}

export default function MedicationDetailsScreen() {
  const { medicationId } = useLocalSearchParams<{ medicationId: string }>();

  const { data, isLoading, isError, refetch } =
    useMedicationDetails(medicationId);

  const markDoseTakenMutation = useMarkDoseTaken(medicationId);
  const toggleReminderMutation = useToggleMedicationReminder(medicationId);

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <LoadingState
          title="Loading medication..."
          message="Preparing medication details."
        />
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <ErrorState
          title="Medication not found"
          message="We could not load this medication right now."
          onRetry={() => refetch()}
        />
      </Screen>
    );
  }

  const dosesToday = data.dosesToday ?? [];

const takenCount = dosesToday.filter((dose) => dose.taken).length;

const progress =
  dosesToday.length > 0
    ? Math.round((takenCount / dosesToday.length) * 100)
    : 0;

  const handleToggleReminder = () => {
    toggleReminderMutation.mutate(data.id);
  };

  const handleAskAi = () => {
    router.push({
      pathname: "/ai-chat",
      params: {
        initialQuestion: `Can you explain this medication in simple words? Medication: ${data.name}, dosage: ${data.dosage}, instructions: ${data.instructions}, prescribed by: ${data.prescribedBy}. What should I keep in mind when taking it?`,
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
            <Text style={styles.eyebrow}>Medication Details</Text>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.subtitle}>{data.dosage}</Text>
          </View>

          <Card style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={styles.label}>Today</Text>
                <Text style={styles.doseProgress}>
                  {takenCount}/{dosesToday.length} doses taken
                </Text>
              </View>

              <View style={styles.iconCircle}>
                <Ionicons
                  name="medical-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <Text style={styles.instructions}>{data.instructions}</Text>
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Prescription Info</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Prescribed by</Text>
              <Text style={styles.infoValue}>{data.prescribedBy}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Frequency</Text>
              <Text style={styles.infoValue}>
                {getFrequencyLabel(data.frequency)}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Start date</Text>
              <Text style={styles.infoValue}>{data.startDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{data.status}</Text>
            </View>
          </Card>

          <Card style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <View style={styles.reminderTextBlock}>
                <Text style={styles.sectionTitle}>Reminders</Text>
                <Text style={styles.reminderText}>
                  {data.reminderEnabled
                    ? "Medication reminders are currently enabled."
                    : "Medication reminders are currently disabled."}
                </Text>
              </View>

              <Ionicons
                name={
                  data.reminderEnabled
                    ? "notifications"
                    : "notifications-off-outline"
                }
                size={24}
                color={data.reminderEnabled ? colors.success : colors.warning}
              />
            </View>

            <AppButton
              title={
                toggleReminderMutation.isPending
                  ? "Updating..."
                  : data.reminderEnabled
                    ? "Turn reminder off"
                    : "Turn reminder on"
              }
              variant={data.reminderEnabled ? "secondary" : "primary"}
              onPress={handleToggleReminder}
            />
          </Card>

          <Text style={styles.sectionTitleOutside}>Today's Doses</Text>

          {dosesToday.map((dose) => (
            <MedicationDoseCard
              key={dose.id}
              dose={dose}
              disabled={markDoseTakenMutation.isPending}
              onMarkTaken={() =>
                markDoseTakenMutation.mutate({
                  medicationId: data.id,
                  doseId: dose.id,
                })
              }
            />
          ))}

          {data.notes ? (
            <Card style={styles.notesCard}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <Text style={styles.notes}>{data.notes}</Text>
            </Card>
          ) : null}

          <View style={styles.aiButton}>
            <AppButton
              title="Ask AI about this medication"
              variant="secondary"
              onPress={handleAskAi}
            />
          </View>
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
    ...typography.heading,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  summaryCard: {
    marginBottom: spacing.lg,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
  },
  doseProgress: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: spacing.xs,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: {
    height: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    overflow: "hidden",
    marginTop: spacing.lg,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  instructions: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionTitleOutside: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSoft,
  },
  infoValue: {
    ...typography.bodyMedium,
    color: colors.text,
    marginTop: spacing.xs,
    textTransform: "capitalize",
  },
  reminderCard: {
    marginBottom: spacing.xl,
  },
  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  reminderTextBlock: {
    flex: 1,
  },
  reminderText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  notesCard: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  notes: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  aiButton: {
    marginTop: spacing.md,
  },
});
