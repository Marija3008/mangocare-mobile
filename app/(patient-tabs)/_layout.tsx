import { Tabs } from "expo-router";

import { colors } from "@/shared/theme/colors";

export default function PatientTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSoft,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="mood"
        options={{
          title: "Mood",
        }}
      />

      <Tabs.Screen
        name="cases"
        options={{
          title: "Cases",
        }}
      />

      <Tabs.Screen
        name="labs"
        options={{
          title: "Labs",
        }}
      />

      <Tabs.Screen
        name="ai-chat"
        options={{
          title: "AI Chat",
        }}
      />
    </Tabs>
  );
}
