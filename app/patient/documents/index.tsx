import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { DocumentCard } from "@/features/documents/components/DocumentCard";
import { useDocuments } from "@/features/documents/hooks/useDocuments";
import { AppButton } from "@/shared/components/AppButton";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DocumentsScreen() {
  const { data, isLoading, isError, refetch } = useDocuments();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading documents...</Text>
          <Text style={styles.stateText}>
            Preparing your medical files and records.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load documents</Text>
          <Text style={styles.stateText}>Please try again in a moment.</Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
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

        <View style={styles.header}>
          <Text style={styles.eyebrow}>Medical Files</Text>
          <Text style={styles.title}>Documents</Text>
          <Text style={styles.subtitle}>
            View lab files, prescriptions, clinical notes, insurance documents,
            and uploaded records.
          </Text>
        </View>

        <View style={styles.uploadButton}>
          <AppButton
            title="Upload document"
            onPress={() => router.push("/patient/documents/upload")}
          />
        </View>

        <View style={styles.trashButton}>
          <AppButton
            title="View Trash"
            variant="secondary"
            onPress={() => router.push("/patient/documents/trash")}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DocumentCard
              document={item}
              onPress={() =>
                router.push({
                  pathname: "/patient/documents/[documentId]",
                  params: {
                    documentId: item.id,
                  },
                })
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  listContent: {
    paddingBottom: spacing.xxl,
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
  uploadButton: {
    marginBottom: spacing.lg,
  },
  trashButton: {
    marginBottom: spacing.lg,
  },
});
