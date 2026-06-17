import { Pressable, StyleSheet, Text } from "react-native";

import { MoodLevel } from "@/features/mood/types";
import { getMoodMeta } from "@/features/mood/utils/moodMeta";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type MoodOptionProps = {
  mood: MoodLevel;
  selected: boolean;
  onPress: () => void;
};

export function MoodOption({ mood, selected, onPress }: MoodOptionProps) {
  const meta = getMoodMeta(mood);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: selected ? meta.backgroundColor : colors.surface,
          borderColor: selected ? meta.color : colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.emoji}>{meta.emoji}</Text>
      <Text
        style={[
          styles.label,
          { color: selected ? meta.color : colors.textMuted },
        ]}
      >
        {meta.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    width: "30%",
    minHeight: 92,
    borderWidth: 1,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.sm,
  },
  pressed: {
    opacity: 0.82,
  },
  emoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    textAlign: "center",
  },
});
