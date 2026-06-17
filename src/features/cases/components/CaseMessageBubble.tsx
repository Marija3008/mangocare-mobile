import { StyleSheet, Text, View } from "react-native";

import { CaseMessage } from "@/features/cases/types";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type CaseMessageBubbleProps = {
  message: CaseMessage;
};

export function CaseMessageBubble({ message }: CaseMessageBubbleProps) {
  const isPatient = message.sender === "patient";
  const isSystem = message.sender === "system";

  if (isSystem) {
    return (
      <View style={styles.systemWrapper}>
        <Text style={styles.systemText}>{message.content}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.row, isPatient ? styles.patientRow : styles.doctorRow]}>
      <View
        style={[
          styles.bubble,
          isPatient ? styles.patientBubble : styles.doctorBubble,
        ]}
      >
        {!isPatient && <Text style={styles.sender}>{message.senderName}</Text>}
        <Text style={[styles.content, isPatient && styles.patientText]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: spacing.md,
  },
  patientRow: {
    alignItems: "flex-end",
  },
  doctorRow: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "84%",
    borderRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  patientBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: radius.sm,
  },
  doctorBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: radius.sm,
  },
  sender: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  content: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
  },
  patientText: {
    color: colors.surface,
  },
  systemWrapper: {
    alignSelf: "center",
    backgroundColor: colors.blueSoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  systemText: {
    ...typography.caption,
    color: colors.primary,
    textAlign: "center",
  },
});