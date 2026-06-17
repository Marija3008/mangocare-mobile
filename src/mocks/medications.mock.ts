import { Medication } from "@/features/medications/types";

export const medicationsMock: Medication[] = [
  {
    id: "medication-1",
    name: "Vitamin D3",
    dosage: "1000 IU",
    instructions: "Take one capsule with food in the evening.",
    prescribedBy: "Dr. Emma Wilson",
    frequency: "once_daily",
    status: "active",
    startDate: "2026-06-12",
    reminderEnabled: true,
    dosesToday: [
      {
        id: "dose-1",
        time: "18:00",
        taken: false,
      },
    ],
    notes:
      "Recommended after low Vitamin D result. Follow-up testing may be discussed later.",
  },
  {
    id: "medication-2",
    name: "Magnesium",
    dosage: "250 mg",
    instructions: "Take one tablet before sleep.",
    prescribedBy: "Dr. Michael Stone",
    frequency: "once_daily",
    status: "active",
    startDate: "2026-06-10",
    reminderEnabled: true,
    dosesToday: [
      {
        id: "dose-2",
        time: "21:00",
        taken: true,
      },
    ],
    notes: "Used as supportive supplement for sleep and muscle relaxation.",
  },
  {
    id: "medication-3",
    name: "Iron supplement",
    dosage: "18 mg",
    instructions:
      "Take in the morning. Avoid taking with coffee or dairy products.",
    prescribedBy: "Dr. Emma Wilson",
    frequency: "once_daily",
    status: "paused",
    startDate: "2026-06-01",
    reminderEnabled: false,
    dosesToday: [
      {
        id: "dose-3",
        time: "09:00",
        taken: false,
      },
    ],
    notes:
      "Paused until doctor confirms whether supplementation is needed based on full blood work.",
  },
];