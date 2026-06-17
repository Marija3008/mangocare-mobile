import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { SuggestedPrompt } from "@/features/aiChat/types";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type SuggestedPromptsProps = {
  prompts: SuggestedPrompt[];
  onSelectPrompt: (message: string) => void;
};

export function SuggestedPrompts({
  prompts,
  onSelectPrompt,
}: SuggestedPromptsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {prompts.map((prompt) => (
        <Pressable
          key={prompt.id}
          onPress={() => onSelectPrompt(prompt.message)}
          style={({ pressed }) => [
            styles.promptCard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.promptTitle}>{prompt.title}</Text>
          <Text style={styles.promptMessage} numberOfLines={2}>
            {prompt.message}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  promptCard: {
    width: 210,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.82,
  },
  promptTitle: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  promptMessage: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 18,
  },
});