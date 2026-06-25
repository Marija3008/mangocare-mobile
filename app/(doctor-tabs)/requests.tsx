import { StyleSheet, Text, View } from "react-native";

import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

export default function DoctorRequestsScreen() {
  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Patient Requests</Text>

        <Text style={styles.description}>
          Pending patient connection requests will appear here. We will add mock
          request data and Accept/Reject actions next.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
});