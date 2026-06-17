import { StyleSheet, Text, View } from "react-native";

import { PatientProfile } from "@/features/profile/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type ProfileHeaderCardProps = {
  profile: PatientProfile;
};

export function ProfileHeaderCard({ profile }: ProfileHeaderCardProps) {
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  return (
    <Card style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>

        <Text style={styles.subtitle}>Patient ID: {profile.id}</Text>
        <Text style={styles.subtitle}>{profile.email}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.surface,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});