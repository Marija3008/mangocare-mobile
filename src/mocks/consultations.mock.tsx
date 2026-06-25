import { Consultation } from "@/features/consultations/types";

export const consultationsMock: Consultation[] = [
  {
    id: "consultation-1",
    doctorName: "Dr. Emma Wilson",
    specialty: "General Practitioner",
    date: "2026-06-18",
    time: "10:30",
    type: "video",
    status: "upcoming",
    reason: "Review recent blood analysis and tiredness symptoms.",
    notes:
      "Prepare questions about Vitamin D, iron levels, sleep, and fatigue.",
  },
  {
    id: "consultation-2",
    doctorName: "Dr. Michael Stone",
    specialty: "Internal Medicine",
    date: "2026-06-22",
    time: "14:00",
    type: "chat",
    status: "upcoming",
    reason: "Follow-up about supplements and lifestyle plan.",
    notes:
      "Discuss whether current supplementation plan should continue.",
  },
  {
    id: "consultation-3",
    doctorName: "Dr. Emma Wilson",
    specialty: "General Practitioner",
    date: "2026-06-10",
    time: "09:15",
    type: "video",
    status: "completed",
    reason: "Initial consultation about low energy.",
    notes:
      "Doctor recommended checking recent lab reports and tracking mood and energy.",
  },
];