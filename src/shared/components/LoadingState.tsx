import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type LoadingStateProps = {
  title?: string;
  message?: string;
};

export function LoadingState({
  title = "Loading...",
  message = "Please wait a moment."
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    textAlign: "center",
    marginTop: spacing.lg,
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 22,
  },
});