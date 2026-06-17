import { FlatList, StyleSheet, Text, View } from "react-native";

import { ChatBubble } from "@/features/aiChat/components/ChatBubble";
import { ChatInput } from "@/features/aiChat/components/ChatInput";
import { SuggestedPrompts } from "@/features/aiChat/components/SuggestedPrompts";
import { useAiChat } from "@/features/aiChat/hooks/useAiChat";

import { useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function AiChatScreen() {
  const {
    messages,
    suggestedPrompts,
    loading,
    sending,
    error,
    sendMessage,
    retry,
  } = useAiChat();

  const { initialQuestion } = useLocalSearchParams<{
    initialQuestion?: string;
  }>();

  const hasSentInitialQuestion = useRef(false);

  useEffect(() => {
    if(
      initialQuestion &&
      !loading &&
      !sending &&
      !hasSentInitialQuestion.current
    ) {
      hasSentInitialQuestion.current = true;
      sendMessage(initialQuestion);
    }
  }, [initialQuestion, loading, sending, sendMessage]);

  if (loading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading AI assistant...</Text>
          <Text style={styles.stateText}>
            Preparing your personal health chat.
          </Text>
        </View>
      </Screen>
    );
  }

  if (error && messages.length === 0) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>AI chat unavailable</Text>
          <Text style={styles.stateText}>{error}</Text>
          <Text style={styles.retryText} onPress={retry}>
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
          <Text style={styles.eyebrow}>MangoCare AI</Text>
          <Text style={styles.title}>Health Assistant</Text>
          <Text style={styles.subtitle}>
            Ask questions, prepare for consultations, or understand health data.
          </Text>
        </View>

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            AI guidance is not a medical diagnosis. For urgent symptoms, contact
            emergency care or your healthcare provider.
          </Text>
        </View>

        {messages.length === 1 && (
          <View style={styles.promptsSection}>
            <Text style={styles.promptsTitle}>Suggested questions</Text>
            <SuggestedPrompts
              prompts={suggestedPrompts}
              onSelectPrompt={sendMessage}
            />
          </View>
        )}

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        />

        {error && <Text style={styles.inlineError}>{error}</Text>}

        {sending && (
          <Text style={styles.sendingText}>MangoCare AI is typing...</Text>
        )}

        <View style={styles.inputWrapper}>
          <ChatInput disabled={sending} onSend={sendMessage} />
        </View>
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
    marginBottom: spacing.md,
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
  disclaimer: {
    backgroundColor: colors.orangeSoft,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.warning,
    lineHeight: 18,
  },
  promptsSection: {
    marginBottom: spacing.md,
  },
  promptsTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.sm,
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
  inlineError: {
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
