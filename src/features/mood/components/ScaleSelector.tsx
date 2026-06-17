import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type ScaleSelectorProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const scaleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function ScaleSelector({ label, value, onChange }: ScaleSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}: {value}/10
      </Text>

      <View style={styles.values}>
        {scaleValues.map((item) => {
          const selected = item === value;

          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              style={[
                styles.valueButton,
                selected && styles.valueButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.valueText,
                  selected && styles.valueTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  values: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  valueButton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  valueButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  valueText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  valueTextSelected: {
    color: colors.surface,
    fontWeight: "800",
  },
});