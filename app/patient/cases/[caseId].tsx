import { router, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { CaseMessageBubble } from "@/features/cases/components/CaseMessageBubble";
import { CaseMessageInput } from "@/features/cases/components/CaseMessageInput";
import { useCaseDetails } from "@/features/cases/hooks/useCaseDetails";
import { useCaseMessages } from "@/features/cases/hooks/useCaseMessages";
import { useSendCaseMessage } from "@/features/cases/hooks/useSendCaseMessage";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function CaseDetailsScreen() {
  const { caseId } = useLocalSearchParams<{ caseId: string }>();

  const {
    data: caseDetails,
    isLoading: caseLoading,
    isError: caseError,
    refetch: refetchCase,
  } = useCaseDetails(caseId);

  const {
    data: messages,
    isLoading: messagesLoading,
    isError: messagesError,
    refetch: refetchMessages,
  } = useCaseMessages(caseId);

  const sendMessageMutation = useSendCaseMessage(caseId);

  const isLoading = caseLoading || messagesLoading;
  const isError = caseError || messagesError;

  const handleSendMessage = async (content: string) => {
    if (!caseId) return;

    await sendMessageMutation.mutateAsync({
      caseId,
      content,
    });
  };

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading case...</Text>
          <Text style={styles.stateText}>
            Preparing your consultation thread.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !caseDetails || !messages) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Case not found</Text>
          <Text style={styles.stateText}>
            We could not load this case right now.
          </Text>
          <Text
            style={styles.retryText}
            onPress={() => {
              refetchCase();
              refetchMessages();
            }}
          >
            Try again
          </Text>
          <Text style={styles.backTextCenter} onPress={() => router.back()}>
            Go back
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

        <Card style={styles.caseHeader}>
          <Text style={styles.eyebrow}>Consultation Case</Text>
          <Text style={styles.title}>{caseDetails.title}</Text>
          <Text style={styles.subtitle}>{caseDetails.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>{caseDetails.status}</Text>
            </View>

            <View style={styles.metaPill}>
              <Text style={styles.metaText}>
                {caseDetails.consultationType}
              </Text>
            </View>

            <View style={styles.metaPill}>
              <Text style={styles.metaText}>{caseDetails.priority}</Text>
            </View>
          </View>

          <Text style={styles.doctor}>
            {caseDetails.doctorName} • {caseDetails.specialty}
          </Text>
        </Card>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CaseMessageBubble message={item} />}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {sendMessageMutation.isError && (
          <Text style={styles.errorText}>
            Could not send message. Please try again.
          </Text>
        )}

        {sendMessageMutation.isPending && (
          <Text style={styles.sendingText}>Sending message...</Text>
        )}

        <View style={styles.inputWrapper}>
          <CaseMessageInput
            disabled={sendMessageMutation.isPending}
            onSend={handleSendMessage}
          />
        </View>
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
  caseHeader: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  metaPill: {
    backgroundColor: colors.blueSoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  metaText: {
    ...typography.caption,
    color: colors.primary,
    textTransform: "capitalize",
  },
  doctor: {
    ...typography.caption,
    color: colors.textSoft,
    marginTop: spacing.md,
  },
  messagesContent: {
    paddingBottom: spacing.lg,
  },
  inputWrapper: {
    paddingBottom: spacing.md,
  },
  sendingText: {
    ...typography.caption,
    color: colors.textSoft,
    marginBottom: spacing.sm,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginBottom: spacing.sm,
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
