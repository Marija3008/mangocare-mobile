import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type MenuItem = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
};

type SideMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const menuItems: MenuItem[] = [
  {
    title: "Profile",
    subtitle: "Personal and medical information",
    icon: "person-outline",
    href: "/patient/profile",
  },
  {
    title: "Consultations",
    subtitle: "Appointments with your healthcare team",
    icon: "calendar-outline",
    href: "/patient/consultations",
  },
  {
    title: "Clinicals",
    subtitle: "Clinical notes, documents, and care data",
    icon: "medkit-outline",
    href: "/patient/clinicals",
  },
  {
    title: "Documents",
    subtitle: "Medical files, reports, and uploaded records",
    icon: "folder-open-outline",
    href: "/patient/documents",
  },
  {
    title: "Questionnaires",
    subtitle: "Assigned assessments and health check-ins",
    icon: "clipboard-outline",
    href: "/patient/questionnaires",
  },
  {
    title: "Medications",
    subtitle: "Prescriptions, doses, and reminders",
    icon: "medical-outline",
    href: "/patient/medications",
  },
  {
    title: "History",
    subtitle: "Past activity, visits, and health timeline",
    icon: "time-outline",
    href: "/patient/history",
  },
  {
    title: "Lab Reports",
    subtitle: "Blood analysis and biomarkers",
    icon: "flask-outline",
    href: "/labs",
  },
  {
    title: "Cases",
    subtitle: "Consultations with healthcare team",
    icon: "chatbubbles-outline",
    href: "/cases",
  },
  {
    title: "AI Assistant",
    subtitle: "Ask health-related questions",
    icon: "sparkles-outline",
    href: "/ai-chat",
  },
];

export function SideMenu({ visible, onClose }: SideMenuProps) {
  const handleNavigate = (href: Href) => {
    onClose();
    router.push(href);
  };

  return (
    
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <SafeAreaView style={styles.menu}>
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>M</Text>
            </View>

            <View style={styles.headerText}>
              <Text style={styles.appName}>MangoCare</Text>
              <Text style={styles.appSubtitle}>Patient Portal</Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </Pressable>
          </View>

          <View style={styles.items}>
            {menuItems.map((item) => (
              <Pressable
                key={item.title}
                onPress={() => handleNavigate(item.href)}
                style={({ pressed }) => [
                  styles.menuItem,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>

                <View style={styles.itemText}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textSoft}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              AI guidance is supportive only and does not replace medical care.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(25, 28, 32, 0.35)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  menu: {
    width: "82%",
    maxWidth: 340,
    height: "100%",
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.surface,
  },
  headerText: {
    flex: 1,
  },
  appName: {
    ...typography.subtitle,
    color: colors.text,
  },
  appSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  items: {
    gap: spacing.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.84,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  itemSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
  footer: {
    marginTop: "auto",
    paddingVertical: spacing.xl,
  },
  footerText: {
    ...typography.caption,
    color: colors.textSoft,
    lineHeight: 18,
  },
});
