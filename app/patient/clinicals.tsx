import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function ClinicalsScreen() {
  return (
    <Screen>
      <View style={styles.topBar}>
        <Text style={styles.backText} onPress={() => router.back()}>
          ← Back
        </Text>
      </View>

      <Text style={styles.eyebrow}>Medical Records</Text>
      <Text style={styles.title}>Clinicals</Text>
      <Text style={styles.subtitle}>
        Clinical documents, care notes, diagnoses, and treatment data will be
        shown here.
      </Text>

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Coming soon</Text>
        <Text style={styles.cardText}>
          This area is prepared for future clinical records integration.
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
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
    marginBottom: spacing.xl,
  },
  card: {
    marginTop: spacing.md,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  cardText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});