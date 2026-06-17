import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";

type CaseMessageInputProps = {
  disabled?: boolean;
  onSend: (message: string) => void;
};

export function CaseMessageInput({
  disabled = false,
  onSend,
}: CaseMessageInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmedValue = value.trim();

    if (!trimmedValue || disabled) return;

    onSend(trimmedValue);
    setValue("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Write a message..."
        placeholderTextColor={colors.textSoft}
        multiline
        editable={!disabled}
        style={styles.input}
      />

      <Pressable
        onPress={handleSend}
        disabled={disabled || !value.trim()}
        style={({ pressed }) => [
          styles.sendButton,
          (disabled || !value.trim()) && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="send" size={18} color={colors.surface} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    maxHeight: 120,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    maxHeight: 90,
    color: colors.text,
    fontSize: 15,
    paddingVertical: spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.8,
  },
});