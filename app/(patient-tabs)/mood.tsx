import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { MoodEntryCard } from "@/features/mood/components/MoodEntryCard";
import { MoodOption } from "@/features/mood/components/MoodOption";
import { MoodSummaryCard } from "@/features/mood/components/MoodSummaryCard";
import { ScaleSelector } from "@/features/mood/components/ScaleSelector";
import { useCreateMoodEntry } from "@/features/mood/hooks/useCreateMoodEntry";
import { useMoodEntries } from "@/features/mood/hooks/useMoodEntries";
import { useMoodSummary } from "@/features/mood/hooks/useMoodSummary";
import { MoodLevel } from "@/features/mood/types";
import { getMoodMeta } from "@/features/mood/utils/moodMeta";

import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

const moodOptions: MoodLevel[] = [
  "very_bad",
  "bad",
  "neutral",
  "good",
  "great",
];

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<MoodLevel>("neutral");
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [note, setNote] = useState("");

  const {
    data: entries,
    isLoading: entriesLoading,
    isError: entriesError,
    refetch: refetchEntries,
  } = useMoodEntries();

  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useMoodSummary();

  const createMoodEntryMutation = useCreateMoodEntry();

  const isLoading = entriesLoading || summaryLoading;
  const isError = entriesError || summaryError;

  const selectedMoodMeta = getMoodMeta(selectedMood);

  const aiMoodQuestion = useMemo(() => {
    return `I just completed a mood check-in. My mood is ${selectedMoodMeta.label}, my energy level is ${energyLevel}/10, my stress level is ${stressLevel}/10. My note is: ${
      note.trim() || "No note added."
    }. Can you help me understand what this might mean and suggest healthy next steps?`;
  }, [selectedMoodMeta.label, energyLevel, stressLevel, note]);

  const handleSaveMood = async () => {
    await createMoodEntryMutation.mutateAsync({
      mood: selectedMood,
      energyLevel,
      stressLevel,
      note: note.trim() || undefined,
    });

    setSelectedMood("neutral");
    setEnergyLevel(5);
    setStressLevel(5);
    setNote("");
  };

  const handleAskAi = () => {
    router.push({
      pathname: "/ai-chat",
      params: {
        initialQuestion: aiMoodQuestion,
      },
    });
  };

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading mood tracker...</Text>
          <Text style={styles.stateText}>Preparing your check-in history.</Text>
        </View>
      </Screen>
    );
  }

  if (isError || !entries || !summary) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load mood data</Text>
          <Text style={styles.stateText}>Please try again in a moment.</Text>
          <Text
            style={styles.retryText}
            onPress={() => {
              refetchEntries();
              refetchSummary();
            }}
          >
            Try again
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Mental Wellness</Text>
          <Text style={styles.title}>Mood Check-in</Text>
          <Text style={styles.subtitle}>
            Track how you feel and notice patterns in your energy, stress, and
            daily notes.
          </Text>
        </View>

        <MoodSummaryCard summary={summary} />

        <Card style={styles.checkInCard}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>

          <View style={styles.moodGrid}>
            {moodOptions.map((mood) => (
              <MoodOption
                key={mood}
                mood={mood}
                selected={selectedMood === mood}
                onPress={() => setSelectedMood(mood)}
              />
            ))}
          </View>

          <View style={styles.separator} />

          <ScaleSelector
            label="Energy"
            value={energyLevel}
            onChange={setEnergyLevel}
          />

          <ScaleSelector
            label="Stress"
            value={stressLevel}
            onChange={setStressLevel}
          />

          <View style={styles.noteBlock}>
            <Text style={styles.inputLabel}>Journal note</Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Write a few words about your day..."
              placeholderTextColor={colors.textSoft}
              multiline
              textAlignVertical="top"
              style={styles.noteInput}
            />
          </View>

          {createMoodEntryMutation.isError && (
            <Text style={styles.errorText}>
              Could not save mood entry. Please try again.
            </Text>
          )}

          <View style={styles.actions}>
            <AppButton
              title={
                createMoodEntryMutation.isPending
                  ? "Saving..."
                  : "Save check-in"
              }
              onPress={handleSaveMood}
            />

            <AppButton
              title="Ask AI about this mood"
              variant="secondary"
              onPress={handleAskAi}
            />
          </View>
        </Card>

        <Text style={styles.recentTitle}>Recent Check-ins</Text>

        {entries.map((entry) => (
          <MoodEntryCard key={entry.id} entry={entry} />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.xl,
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
  checkInCard: {
    marginBottom: spacing.xl,
    gap: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  noteBlock: {
    gap: spacing.sm,
  },
  inputLabel: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  noteInput: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    backgroundColor: colors.background,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.md,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
  },
  recentTitle: {
    ...typography.heading,
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
