import { router } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  usePermanentlyDeleteDocument,
  useRestoreDocument,
  useTrashDocuments,
} from "@/features/documents/hooks/useTrashDocuments";
import { MedicalDocument } from "@/features/documents/types";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

function getDaysRemaining(deletedAt?: string | null) {
  if (!deletedAt) {
    return 30;
  }

  const deletedTime = new Date(deletedAt).getTime();
  const expiresAt = deletedTime + 30 * 24 * 60 * 60 * 1000;
  const difference = expiresAt - Date.now();

  return Math.max(0, Math.ceil(difference / (24 * 60 * 60 * 1000)));
}

export default function TrashScreen() {
  const {
    data: documents = [],
    isLoading,
    isError,
    refetch,
  } = useTrashDocuments();

  const restoreMutation = useRestoreDocument();
  const permanentDeleteMutation = usePermanentlyDeleteDocument();

  const handleRestore = async (document: MedicalDocument) => {
    try {
      await restoreMutation.mutateAsync(document.id);

      Alert.alert(
        "Document restored",
        `"${document.title}" is back in your document library.`
      );
    } catch (error) {
      Alert.alert(
        "Could not restore document",
        error instanceof Error ? error.message : "Please try again."
      );
    }
  };

  const handlePermanentDelete = (document: MedicalDocument) => {
    Alert.alert(
      "Delete permanently?",
      `"${document.title}" will be permanently removed. This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete permanently",
          style: "destructive",
          onPress: async () => {
            try {
              await permanentDeleteMutation.mutateAsync(document.id);
            } catch (error) {
              Alert.alert(
                "Could not delete document",
                error instanceof Error ? error.message : "Please try again."
              );
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading Trash...</Text>
          <Text style={styles.stateText}>
            Checking deleted documents.
          </Text>
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Could not load Trash</Text>
          <Text style={styles.stateText}>
            Please check your connection and try again.
          </Text>

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Document Management</Text>
            <Text style={styles.title}>Trash</Text>
            <Text style={styles.subtitle}>
              Documents remain here for 30 days before they are permanently
              removed.
            </Text>
          </View>

          {documents.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Trash is empty</Text>
              <Text style={styles.emptyText}>
                Documents moved to Trash will appear here.
              </Text>
            </Card>
          ) : (
            documents.map((document) => {
              const daysRemaining = getDaysRemaining(document.deletedAt);

              return (
                <Card key={document.id} style={styles.documentCard}>
                  <Text style={styles.documentTitle}>{document.title}</Text>

                  <Text style={styles.fileName}>{document.fileName}</Text>

                  <Text style={styles.deletedText}>
                    Moved to Trash:{" "}
                    {document.deletedAt
                      ? new Date(document.deletedAt).toLocaleDateString()
                      : "Unknown"}
                  </Text>

                  <Text style={styles.daysRemaining}>
                    {daysRemaining === 1
                      ? "1 day remaining before permanent removal"
                      : `${daysRemaining} days remaining before permanent removal`}
                  </Text>

                  <View style={styles.actions}>
                    <AppButton
                      title={
                        restoreMutation.isPending
                          ? "Restoring..."
                          : "Restore document"
                      }
                      variant="secondary"
                      onPress={() => handleRestore(document)}
                    />

                    <Pressable
                      style={styles.permanentDeleteButton}
                      onPress={() => handlePermanentDelete(document)}
                    >
                      <Text style={styles.permanentDeleteText}>
                        Delete permanently
                      </Text>
                    </Pressable>
                  </View>
                </Card>
              );
            })
          )}
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
  documentCard: {
    marginBottom: spacing.lg,
  },
  documentTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  fileName: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  deletedText: {
    ...typography.caption,
    color: colors.textSoft,
    marginTop: spacing.lg,
  },
  daysRemaining: {
    ...typography.bodyMedium,
    color: colors.text,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  permanentDeleteButton: {
    alignItems: "center",
    borderColor: colors.danger,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  permanentDeleteText: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    ...typography.subtitle,
    color: colors.text,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: "center",
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
    lineHeight: 22,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  retryText: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: spacing.lg,
  },
});