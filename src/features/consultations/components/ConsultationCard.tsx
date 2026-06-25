import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Consultation } from "@/features/consultations/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type ConsultationCardProps = {
  consultation: Consultation;
  onPress: () => void;
};

function getTypeIcon(type: Consultation["type"]): keyof typeof Ionicons.glyphMap {
  if (type === "video") return "videocam-outline";
  if (type === "audio") return "call-outline";
  return "chatbubble-ellipses-outline";
}

function getStatusMeta(status: Consultation["status"]) {
  if (status === "upcoming") {
    return {
      label: "Upcoming",
      color: colors.primary,
      backgroundColor: colors.primaryLight,
    };
  }

  if (status === "completed") {
    return {
      label: "Completed",
      color: colors.success,
      backgroundColor: colors.greenSoft,
    };
  }

  return {
    label: "Cancelled",
    color: colors.danger,
    backgroundColor: colors.redSoft,
  };
}

export function ConsultationCard({
  consultation,
  onPress,
}: ConsultationCardProps) {
  const status = getStatusMeta(consultation.status);

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={getTypeIcon(consultation.type)}
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.titleBlock}>
              <Text style={styles.doctor}>{consultation.doctorName}</Text>
              <Text style={styles.specialty}>{consultation.specialty}</Text>
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

          <Text style={styles.reason}>{consultation.reason}</Text>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>
                {consultation.date} at {consultation.time}
              </Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>{consultation.type}</Text>
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
    alignItems: "center",
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
  doctor: {
    ...typography.subtitle,
    color: colors.text,
  },
  specialty: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  statusBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: "flex-start",
  },
  statusText: {
    ...typography.caption,
  },
  reason: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    textTransform: "capitalize",
  },
});