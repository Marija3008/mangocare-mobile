import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MedicalDocument } from "@/features/documents/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type DocumentCardProps = {
  document: MedicalDocument;
  onPress: () => void;
};

function getDocumentIcon(
  type: MedicalDocument["type"]
): keyof typeof Ionicons.glyphMap {
  if (type === "lab_report") return "flask-outline";
  if (type === "clinical_note") return "document-text-outline";
  if (type === "prescription") return "medical-outline";
  if (type === "imaging") return "scan-outline";
  if (type === "insurance") return "shield-checkmark-outline";
  if (type === "discharge_summary") return "clipboard-outline";

  return "folder-outline";
}

function getTypeLabel(type: MedicalDocument["type"]) {
  if (type === "lab_report") return "Lab Report";
  if (type === "clinical_note") return "Clinical Note";
  if (type === "prescription") return "Prescription";
  if (type === "imaging") return "Imaging";
  if (type === "insurance") return "Insurance";
  if (type === "discharge_summary") return "Discharge Summary";

  return "Other";
}

function getStatusMeta(status: MedicalDocument["status"]) {
  if (status === "reviewed") {
    return {
      label: "Reviewed",
      color: colors.success,
      backgroundColor: colors.greenSoft,
    };
  }

  if (status === "pending_review") {
    return {
      label: "Pending",
      color: colors.warning,
      backgroundColor: colors.orangeSoft,
    };
  }

  return {
    label: "Archived",
    color: colors.textSoft,
    backgroundColor: colors.blueSoft,
  };
}

export function DocumentCard({ document, onPress }: DocumentCardProps) {
  const status = getStatusMeta(document.status);

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={getDocumentIcon(document.type)}
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.titleBlock}>
              <Text style={styles.type}>{getTypeLabel(document.type)}</Text>
              <Text style={styles.title}>{document.title}</Text>
              <Text style={styles.fileName}>{document.fileName}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: status.backgroundColor },
              ]}
            >
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.label}
              </Text>
            </View>
          </View>

          <Text style={styles.summary} numberOfLines={2}>
            {document.summary}
          </Text>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{document.sizeLabel}</Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {new Date(document.uploadedAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Card>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  pressed: {
    opacity: 0.88,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: {
    flex: 1,
  },
  type: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  fileName: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statusBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  statusText: {
    ...typography.caption,
  },
  summary: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  pill: {
    backgroundColor: colors.blueSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  pillText: {
    ...typography.caption,
    color: colors.primary,
  },
});