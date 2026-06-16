import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/shared/components/Card";
import { UpcomingConsultation } from "@/features/dashboard/types";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type UpcomingConsultationCardProps = {
  consultation: UpcomingConsultation;
};

export function UpcomingConsultationCard({
  consultation,
}: UpcomingConsultationCardProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.label}>Next Consultation</Text>

      <Text style={styles.doctor}>{consultation.doctorName}</Text>
      <Text style={styles.specialty}>{consultation.specialty}</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailPill}>
          <Text style={styles.detailText}>{consultation.date}</Text>
        </View>

        <View style={styles.detailPill}>
          <Text style={styles.detailText}>{consultation.time}</Text>
        </View>

        <View style={styles.detailPill}>
          <Text style={styles.detailText}>{consultation.type}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
    marginBottom: spacing.sm,
  },
  doctor: {
    ...typography.subtitle,
    color: colors.text,
  },
  specialty: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  detailsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  detailPill: {
    backgroundColor: colors.blueSoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  detailText: {
    ...typography.caption,
    color: colors.primary,
    textTransform: "capitalize",
  },
});