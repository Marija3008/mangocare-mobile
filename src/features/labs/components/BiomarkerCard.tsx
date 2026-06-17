import { StyleSheet, Text, View } from "react-native";

import { Biomarker } from "@/features/labs/types";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type BiomarkerCardProps = {
  marker: Biomarker;
};

function getStatusStyles(status: Biomarker["status"]) {
  if (status === "optimal") {
    return {
      backgroundColor: colors.greenSoft,
      color: colors.success,
      label: "Optimal",
    };
  }

  if (status === "low") {
    return {
      backgroundColor: colors.orangeSoft,
      color: colors.warning,
      label: "Low",
    };
  }

  if (status === "high") {
    return {
      backgroundColor: colors.redSoft,
      color: colors.danger,
      label: "High",
    };
  }

  return {
    backgroundColor: colors.orangeSoft,
    color: colors.warning,
    label: "Attention",
  };
}

export function BiomarkerCard({ marker }: BiomarkerCardProps) {
  const status = getStatusStyles(marker.status);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{marker.name}</Text>
          <Text style={styles.range}>Range: {marker.referenceRange}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: status.backgroundColor }]}>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{marker.value}</Text>
        <Text style={styles.unit}>{marker.unit}</Text>
      </View>

      <Text style={styles.description}>{marker.description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    ...typography.subtitle,
    color: colors.text,
  },
  range: {
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
  valueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  value: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.primary,
  },
  unit: {
    ...typography.bodyMedium,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.md,
  },
});