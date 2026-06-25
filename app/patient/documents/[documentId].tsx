import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { DocumentPreview } from "@/features/documents/components/DocumentPreview";
import { useDocumentDetails } from "@/features/documents/hooks/useDocumentDetails";
import { useMoveDocumentToTrash } from "@/features/documents/hooks/useMoveDocumentToTrash";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

function getTypeLabel(type: string) {
  if (type === "lab_report") return "Lab Report";
  if (type === "clinical_note") return "Clinical Note";
  if (type === "prescription") return "Prescription";
  if (type === "imaging") return "Imaging";
  if (type === "insurance") return "Insurance";
  if (type === "discharge_summary") return "Discharge Summary";

  return "Other";
}

export default function DocumentDetailsScreen() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();

  const { data, isLoading, isError, refetch } = useDocumentDetails(documentId);

  const moveToTrashMutation = useMoveDocumentToTrash();

  if (isLoading) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Loading document...</Text>
          <Text style={styles.stateText}>Preparing document details.</Text>
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen scroll={false}>
        <View style={styles.centerState}>
          <Text style={styles.stateTitle}>Document not found</Text>
          <Text style={styles.stateText}>
            We could not load this document right now.
          </Text>
          <Text style={styles.retryText} onPress={() => refetch()}>
            Try again
          </Text>
        </View>
      </Screen>
    );
  }

  const handleAskAi = () => {
    router.push({
      pathname: "/ai-chat",
      params: {
        initialQuestion: `Can you explain this medical document in simple words? Title: ${data.title}. Type: ${getTypeLabel(data.type)}. Summary: ${data.summary}. Tags: ${data.tags.join(", ")}.`,
      },
    });
  };

  const handleMoveToTrash = () => {
    Alert.alert(
      "Move document to Trash?",
      "The document will be hidden from your library. You can restore it within 30 days before it is permanently removed.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Move to Trash",
          style: "destructive",
          onPress: async () => {
            try {
              await moveToTrashMutation.mutateAsync(data.id);

              router.replace("/patient/documents");
            } catch (error) {
              Alert.alert(
                "Could not move document",
                error instanceof Error ? error.message : "Please try again.",
              );
            }
          },
        },
      ],
    );
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
            <Text style={styles.eyebrow}>Document Details</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{data.fileName}</Text>
          </View>

          <Card style={styles.fileCard}>
            <View style={styles.fileHeader}>
              <View>
                <Text style={styles.label}>File</Text>
                <Text style={styles.fileName}>{data.fileName}</Text>
              </View>

              <View style={styles.iconCircle}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{data.status}</Text>
            </View>

            <Text style={styles.summary}>{data.summary}</Text>

            <DocumentPreview
              fileUrl={data.fileUrl}
              contentType={data.contentType}
              fileName={data.fileName}
            />
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Document Info</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{getTypeLabel(data.type)}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Uploaded by</Text>
              <Text style={styles.infoValue}>{data.uploadedBy}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Uploaded at</Text>
              <Text style={styles.infoValue}>
                {new Date(data.uploadedAt).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Size</Text>
              <Text style={styles.infoValue}>{data.sizeLabel}</Text>
            </View>

            {data.linkedRecordLabel ? (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Linked record</Text>
                <Text style={styles.infoValue}>{data.linkedRecordLabel}</Text>
              </View>
            ) : null}
          </Card>

          <Card style={styles.tagsCard}>
            <Text style={styles.sectionTitle}>Tags</Text>

            <View style={styles.tags}>
              {data.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </Card>

          <View style={styles.button}>
            <AppButton
              title="Ask AI to explain document"
              onPress={handleAskAi}
            />
          </View>

          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>Remove document</Text>

            <Text style={styles.dangerText}>
              Move this document to Trash. It can be restored for 30 days.
            </Text>

            <AppButton
              title={
                moveToTrashMutation.isPending
                  ? "Moving to Trash..."
                  : "Move to Trash"
              }
              variant="secondary"
              onPress={handleMoveToTrash}
            />
          </View>
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
    marginTop: spacing.xs,
  },
  fileCard: {
    marginBottom: spacing.lg,
  },
  fileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
  },
  fileName: {
    ...typography.subtitle,
    color: colors.text,
    marginTop: spacing.xs,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginTop: spacing.lg,
  },
  statusText: {
    ...typography.caption,
    color: colors.primary,
    textTransform: "capitalize",
  },
  summary: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  infoRow: {
    marginBottom: spacing.md,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textSoft,
  },
  infoValue: {
    ...typography.bodyMedium,
    color: colors.text,
    marginTop: spacing.xs,
  },
  tagsCard: {
    marginBottom: spacing.lg,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  tagText: {
    ...typography.caption,
    color: colors.primary,
  },
  button: {
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
  dangerSection: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },

  dangerTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  dangerText: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
});
