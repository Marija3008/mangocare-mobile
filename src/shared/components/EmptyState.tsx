import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/shared/components/AppButton";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type EmptyStateProps = {
  icon?: string;
  title: string;
  message: string;
  buttonTitle?: string;
  onAction?: () => void;
};

export function EmptyState({
  icon = "📭",
  title,
  message,
  buttonTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {buttonTitle && onAction ? (
        <View style={styles.buttonWrapper}>
          <AppButton title={buttonTitle} onPress={onAction} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  icon: {
    fontSize: 42,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    textAlign: "center",
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  buttonWrapper: {
    width: "100%",
    marginTop: spacing.xl,
  },
});