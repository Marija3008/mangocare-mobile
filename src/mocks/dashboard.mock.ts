import { DashboardData } from "@/features/dashboard/types";

export const dashboardMock: DashboardData = {
  patient: {
    id: "patient-1",
    firstName: "Alex",
    lastName: "Morgan",
  },

  healthScore: {
    value: 82,
    status: "good",
    label: "Stable",
    description:
      "Your health indicators are mostly within a healthy range. Keep monitoring your sleep, hydration, and recent blood analysis.",
    trend: "stable",
  },

  latestLab: {
    id: "lab-1",
    title: "Blood Analysis",
    date: "2026-06-14",
    status: "attention",
    summary:
      "Most markers are normal, but Vitamin D and iron levels may need attention.",
    abnormalMarkersCount: 2,
  },

  aiInsight: {
    id: "insight-1",
    title: "AI Health Insight",
    message:
      "Your latest results suggest focusing on Vitamin D intake and hydration this week.",
    severity: "info",
  },

  upcomingConsultation: {
    id: "consultation-1",
    doctorName: "Dr. Emma Wilson",
    specialty: "General Practitioner",
    date: "2026-06-18",
    time: "10:30",
    type: "video",
  },

  prescriptions: [
    {
      id: "prescription-1",
      name: "Vitamin D3",
      dosage: "1000 IU",
      nextDoseTime: "18:00",
    },
    {
      id: "prescription-2",
      name: "Magnesium",
      dosage: "250 mg",
      nextDoseTime: "21:00",
    },
  ],
};