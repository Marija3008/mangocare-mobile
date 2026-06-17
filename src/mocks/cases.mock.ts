import { CaseMessage, MedicalCase } from "@/features/cases/types";

export const medicalCasesMock: MedicalCase[] = [
  {
    id: "case-1",
    title: "Feeling tired recently",
    description:
      "I have been feeling tired for the past two weeks and would like to understand if it may be connected to my recent lab results.",
    status: "waiting_doctor",
    priority: "medium",
    consultationType: "chat",
    doctorName: "Dr. Emma Wilson",
    specialty: "General Practitioner",
    createdAt: "2026-06-15T09:30:00.000Z",
    lastUpdatedAt: "2026-06-16T10:15:00.000Z",
  },
  {
    id: "case-2",
    title: "Vitamin D follow-up",
    description:
      "I want advice about my low Vitamin D result and whether I should change supplements.",
    status: "open",
    priority: "low",
    consultationType: "video",
    doctorName: "Dr. Michael Stone",
    specialty: "Internal Medicine",
    createdAt: "2026-06-10T14:00:00.000Z",
    lastUpdatedAt: "2026-06-12T11:20:00.000Z",
  },
];

export const caseMessagesMock: Record<string, CaseMessage[]> = {
  "case-1": [
    {
      id: "message-1",
      caseId: "case-1",
      sender: "system",
      senderName: "MangoCare",
      content:
        "Your case has been created. A healthcare professional will review it.",
      createdAt: "2026-06-15T09:30:00.000Z",
    },
    {
      id: "message-2",
      caseId: "case-1",
      sender: "patient",
      senderName: "Alex Morgan",
      content:
        "I have been feeling tired recently. Could this be connected to my low Vitamin D or iron levels?",
      createdAt: "2026-06-15T09:35:00.000Z",
    },
    {
      id: "message-3",
      caseId: "case-1",
      sender: "doctor",
      senderName: "Dr. Emma Wilson",
      content:
        "It could be related, but we should review the full picture. Please tell me about your sleep, diet, and whether you have dizziness or shortness of breath.",
      createdAt: "2026-06-16T10:15:00.000Z",
    },
  ],
  "case-2": [
    {
      id: "message-4",
      caseId: "case-2",
      sender: "system",
      senderName: "MangoCare",
      content:
        "Your video consultation request has been created.",
      createdAt: "2026-06-10T14:00:00.000Z",
    },
  ],
};