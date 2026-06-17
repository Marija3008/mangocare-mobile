import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

import { useCreateCase } from "@/features/cases/hooks/useCreateCase";
import {
  CasePriority,
  ConsultationType,
} from "@/features/cases/types";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

const consultationTypes: ConsultationType[] = ["chat", "audio", "video"];
const priorities: CasePriority[] = ["low", "medium", "high"];

export default function NewCaseScreen() {
  const createCaseMutation = useCreateCase();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [consultationType, setConsultationType] =
    useState<ConsultationType>("chat");
  const [priority, setPriority] = useState<CasePriority>("medium");

  const canSubmit =
    title.trim().length > 2 &&
    description.trim().length > 10 &&
    !createCaseMutation.isPending;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const newCase = await createCaseMutation.mutateAsync({
      title: title.trim(),
      description: description.trim(),
      consultationType,
      priority,
    });

    router.replace({
      pathname: "/patient/cases/[caseId]",
      params: {
        caseId: newCase.id,
      },
    });
  };

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
            <Text style={styles.eyebrow}>New Consultation</Text>
            <Text style={styles.title}>Open a Case</Text>
            <Text style={styles.subtitle}>
              Describe your concern so your healthcare team can review it.
            </Text>
          </View>

          <Card style={styles.formCard}>
            <Text style={styles.label}>Case title</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Example: Feeling tired recently"
              placeholderTextColor={colors.textSoft}
              style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your symptoms, concerns, or questions..."
              placeholderTextColor={colors.textSoft}
              style={[styles.input, styles.textArea]}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.label}>Consultation type</Text>
            <View style={styles.optionRow}>
              {consultationTypes.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setConsultationType(item)}
                  style={[
                    styles.optionPill,
                    consultationType === item && styles.optionPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      consultationType === item && styles.optionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Priority</Text>
            <View style={styles.optionRow}>
              {priorities.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setPriority(item)}
                  style={[
                    styles.optionPill,
                    priority === item && styles.optionPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      priority === item && styles.optionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            {createCaseMutation.isError && (
              <Text style={styles.errorText}>
                Could not create case. Please try again.
              </Text>
            )}

            <View style={styles.submitButton}>
              <AppButton
                title={
                  createCaseMutation.isPending
                    ? "Creating case..."
                    : "Create case"
                }
                onPress={handleSubmit}
              />
            </View>

            {!canSubmit && !createCaseMutation.isPending && (
              <Text style={styles.helperText}>
                Add a clear title and at least a short description.
              </Text>
            )}
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
  formCard: {
    gap: spacing.md,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    backgroundColor: colors.background,
    fontSize: 15,
  },
  textArea: {
    minHeight: 130,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  optionPill: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: "capitalize",
  },
  optionTextActive: {
    color: colors.surface,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSoft,
    textAlign: "center",
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
  },
});