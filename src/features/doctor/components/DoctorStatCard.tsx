import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

// Icon names are taken from Ionicons.
// We use a string type here because different cards will use different icons.
type DoctorStatCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  description: string;
};

export function DoctorStatCard({
  icon,
  label,
  value,
  description,
}: DoctorStatCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>

      <Text style={styles.description}>{description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "47%",
  },
  iconContainer: {
    alignItems: "center",
    backgroundColor: "#E4F4F0",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    marginBottom: spacing.md,
    width: 44,
  },
  value: {
    ...typography.title,
    color: colors.text,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.text,
    marginTop: spacing.xs,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});