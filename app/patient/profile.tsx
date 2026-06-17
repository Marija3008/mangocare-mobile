import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MedicalTagsCard } from "@/features/profile/components/MedicalTagsCard";
import { ProfileHeaderCard } from "@/features/profile/components/profileHeaderCard";
import { ProfileInfoCard } from "@/features/profile/components/profileInfoCard";
import { SettingsRow } from "@/features/profile/components/SettingsRow";
import { useProfile } from "@/features/profile/hooks/useProfile";

import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function ProfileScreen() {
  const { data, isLoading, isError, refetch } = useProfile();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading profile...</Text>
          <Text style={styles.stateText}>
            Preparing your patient information.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load profile</Text>
          <Text style={styles.stateText}>Please try again in a moment.</Text>

          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>

          <Text style={styles.backTextCenter} onPress={() => router.back()}>
            Go back
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.backText} onPress={() => router.back()}>
            ← Back
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Patient Portal</Text>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>
              Manage your personal, medical, and contact information.
            </Text>
          </View>

          <ProfileHeaderCard profile={data} />

          <ProfileInfoCard
            title="Personal Information"
            items={[
              {
                label: "Date of birth",
                value: data.dateOfBirth,
              },
              {
                label: "Gender",
                value: data.gender,
              },
              {
                label: "Blood type",
                value: data.bloodType,
              },
              {
                label: "Height",
                value: data.height,
              },
              {
                label: "Weight",
                value: data.weight,
              },
            ]}
          />

          <ProfileInfoCard
            title="Contact Information"
            items={[
              {
                label: "Email",
                value: data.email,
              },
              {
                label: "Phone",
                value: data.phone,
              },
              {
                label: "Address",
                value: data.address,
              },
            ]}
          />

          <ProfileInfoCard
            title="Insurance"
            items={[
              {
                label: "Provider",
                value: data.insuranceProvider,
              },
              {
                label: "Insurance number",
                value: data.insuranceNumber,
              },
            ]}
          />

          <ProfileInfoCard
            title="Emergency Contact"
            items={[
              {
                label: "Name",
                value: data.emergencyContactName,
              },
              {
                label: "Phone",
                value: data.emergencyContactPhone,
              },
              {
                label: "Relation",
                value: data.emergencyContactRelation,
              },
            ]}
          />

          <MedicalTagsCard
            title="Allergies"
            tags={data.allergies}
            emptyText="No allergies added."
          />

          <MedicalTagsCard
            title="Chronic Conditions"
            tags={data.chronicConditions}
            emptyText="No chronic conditions added."
          />

          <Card style={styles.settingsCard}>
            <Text style={styles.settingsTitle}>Settings</Text>

            <SettingsRow
              icon="notifications-outline"
              title="Notifications"
              subtitle="Medication, mood, and consultation reminders"
              onPress={() => {}}
            />

            <SettingsRow
              icon="shield-checkmark-outline"
              title="Privacy & Security"
              subtitle="Manage patient data and app access"
              onPress={() => {}}
            />

            <SettingsRow
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Contact MangoCare support"
              onPress={() => {}}
            />
          </Card>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  topBar: {
    marginBottom: spacing.md,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  backTextCenter: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
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
  settingsCard: {
    marginBottom: spacing.xxl,
  },
  settingsTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
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
