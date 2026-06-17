import { MoodLevel } from "@/features/mood/types";
import { colors } from "@/shared/theme/colors";

export function getMoodMeta(mood: MoodLevel) {
  switch (mood) {
    case "very_bad":
      return {
        label: "Very bad",
        emoji: "😞",
        color: colors.danger,
        backgroundColor: colors.redSoft,
      };

    case "bad":
      return {
        label: "Bad",
        emoji: "🙁",
        color: colors.warning,
        backgroundColor: colors.orangeSoft,
      };

    case "neutral":
      return {
        label: "Neutral",
        emoji: "😐",
        color: colors.textMuted,
        backgroundColor: colors.blueSoft,
      };

    case "good":
      return {
        label: "Good",
        emoji: "🙂",
        color: colors.success,
        backgroundColor: colors.greenSoft,
      };

    case "great":
      return {
        label: "Great",
        emoji: "😄",
        color: colors.primary,
        backgroundColor: colors.primaryLight,
      };

    default:
      return {
        label: "Neutral",
        emoji: "😐",
        color: colors.textMuted,
        backgroundColor: colors.blueSoft,
      };
  }
}