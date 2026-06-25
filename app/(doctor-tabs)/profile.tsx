import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DoctorProfileScreen() {
  const { user, logout } = useAuth();

  const performLogout = async (): Promise<void> => {
    await logout();

    // replace prevents Back navigation to a protected doctor screen.
    router.replace("/login");
  };

  const handleLogout = (): void => {
    Alert.alert(
      "Sign out?",
      "You will need to sign in again to access the doctor portal.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign out",
          style: "destructive",
          onPress: () => {
            void performLogout();
          },
        },
      ],
    );
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{user?.displayName ?? "Doctor"}</Text>

        <Text style={styles.email}>{user?.email ?? ""}</Text>

        <Text style={styles.role}>Doctor account</Text>

        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sign out</Text>
        </Pressable>
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
  title: {
    ...typography.title,
    color: colors.text,
  },
  email: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  role: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.md,
  },
  logoutButton: {
    alignItems: "center",
    borderColor: colors.danger,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
  },
  logoutButtonText: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
});

