import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useCancelConsultation } from "@/features/consultations/hooks/useCancelConsultation";
import { useConsultationDetails } from "@/features/consultations/hooks/useConsultationDetails";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

function getTypeLabel(type: string) {
  if (type === "video") return "Video consultation";
  if (type === "audio") return "Audio consultation";
  return "Chat consultation";
}

export default function ConsultationDetailsScreen() {
  const { consultationId } = useLocalSearchParams<{
    consultationId: string;
  }>();

  const { data, isLoading, isError, refetch } =
    useConsultationDetails(consultationId);

  const cancelMutation = useCancelConsultation(consultationId);

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading consultation...</Text>
          <Text style={styles.stateText}>
            Preparing appointment details.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Consultation not found</Text>
          <Text style={styles.stateText}>
            We could not load this consultation right now.
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>
        </View>
      </Screen>
    );
  }

  const canJoin = data.status === "upcoming";
  const canCancel = data.status === "upcoming";

  const handlePrepareWithAi = () => {
    router.push({
      pathname: "/ai-chat",
      params: {
        initialQuestion: `Help me prepare for my consultation with ${data.doctorName}, ${data.specialty}. Reason: ${data.reason}. Notes: ${data.notes ?? "No notes"}. What questions should I ask?`,
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
            <Text style={styles.eyebrow}>Consultation Details</Text>
            <Text style={styles.title}>{data.doctorName}</Text>
            <Text style={styles.subtitle}>{data.specialty}</Text>
          </View>

          <Card style={styles.mainCard}>
            <View style={styles.mainHeader}>
              <View>
                <Text style={styles.label}>Appointment</Text>
                <Text style={styles.appointmentTime}>
                  {data.date} at {data.time}
                </Text>
              </View>

              <View style={styles.iconCircle}>
                <Ionicons
                  name={
                    data.type === "video"
                      ? "videocam-outline"
                      : data.type === "audio"
                        ? "call-outline"
                        : "chatbubble-ellipses-outline"
                  }
                  size={24}
                  color={colors.primary}
                />
              </View>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{data.status}</Text>
            </View>

            <Text style={styles.reason}>{data.reason}</Text>
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Consultation Info</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{getTypeLabel(data.type)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Doctor</Text>
              <Text style={styles.infoValue}>{data.doctorName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Specialty</Text>
              <Text style={styles.infoValue}>{data.specialty}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{data.status}</Text>
            </View>
          </Card>

          {data.notes ? (
            <Card style={styles.notesCard}>
              <Text style={styles.sectionTitle}>Preparation Notes</Text>
              <Text style={styles.notes}>{data.notes}</Text>
            </Card>
          ) : null}

          {canJoin ? (
            <View style={styles.button}>
              <AppButton
                title="Join consultation"
                onPress={() => {}}
              />
            </View>
          ) : null}

          <View style={styles.button}>
            <AppButton
              title="Prepare questions with AI"
              variant="secondary"
              onPress={handlePrepareWithAi}
            />
          </View>

          {canCancel ? (
            <View style={styles.button}>
              <AppButton
                title={
                  cancelMutation.isPending
                    ? "Cancelling..."
                    : "Cancel consultation"
                }
                variant="secondary"
                onPress={() => cancelMutation.mutate(data.id)}
              />
            </View>
          ) : null}
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
  mainCard: {
    marginBottom: spacing.lg,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
  },
  appointmentTime: {
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
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginTop: spacing.lg,
  },
  statusText: {
    ...typography.caption,
    color: colors.primary,
    textTransform: "capitalize",
  },
  reason: {
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
  notesCard: {
    marginBottom: spacing.lg,
  },
  notes: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  button: {
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