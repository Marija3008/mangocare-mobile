import { StyleSheet, Text, View } from "react-native";

import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type InfoItem = {
  label: string;
  value: string;
};

type ProfileInfoCardProps = {
  title: string;
  items: InfoItem[];
};

export function ProfileInfoCard({ title, items }: ProfileInfoCardProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.items}>
        {items.map((item) => (
          <View key={item.label} style={styles.itemRow}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  items: {
    gap: spacing.md,
  },
  itemRow: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textSoft,
  },
  value: {
    ...typography.bodyMedium,
    color: colors.text,
  },
});