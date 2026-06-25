import { StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/providers/AuthProvider";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DoctorDashboardScreen() {
  // useAuth reads the current authenticated user from AuthProvider.
  const { user } = useAuth();

  // ?. means: read displayName only when user exists.
  // ?? means: use "Doctor" when displayName is null or undefined.
  const doctorName = user?.displayName ?? "Doctor";

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Doctor Portal</Text>

        <Text style={styles.title}>Welcome, {doctorName}</Text>

        <Text style={styles.description}>
          You are currently using mock mode. Next, we will connect your patient
          requests, active patients, and dashboard statistics.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});