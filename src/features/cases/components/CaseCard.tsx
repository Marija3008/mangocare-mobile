import { Pressable, StyleSheet, Text, View } from "react-native";

import { MedicalCase } from "@/features/cases/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type CaseCardProps = {
  item: MedicalCase;
  onPress: () => void;
};

function getStatusLabel(status: MedicalCase["status"]) {
  if (status === "open") return "Open";
  if (status === "waiting_doctor") return "Waiting doctor";
  return "Closed";
}

function getStatusColor(status: MedicalCase["status"]) {
  if (status === "open") return colors.success;
  if (status === "waiting_doctor") return colors.warning;
  return colors.textSoft;
}

function getStatusBackground(status: MedicalCase["status"]) {
  if (status === "open") return colors.greenSoft;
  if (status === "waiting_doctor") return colors.orangeSoft;
  return colors.blueSoft;
}

export function CaseCard({ item, onPress }: CaseCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.doctor}>
                {item.doctorName} • {item.specialty}
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusBackground(item.status) },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(item.status) },
                ]}
              >
                {getStatusLabel(item.status)}
              </Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.footer}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{item.consultationType}</Text>
            </View>

            <View style={styles.pill}>
              <Text style={styles.pillText}>{item.priority} priority</Text>
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
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
  },
  doctor: {
    ...typography.caption,
    color: colors.textSoft,
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
  description: {
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
    textTransform: "capitalize",
  },
});