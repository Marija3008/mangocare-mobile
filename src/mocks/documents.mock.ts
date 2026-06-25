import { MedicalDocument } from "@/features/documents/types";

export const medicalDocumentsMock: MedicalDocument[] = [
  {
    id: "document-1",
    title: "Blood Analysis Report",
    fileName: "blood-analysis-june-2026.pdf",
    type: "lab_report",
    status: "reviewed",
    uploadedAt: "2026-06-14T08:30:00.000Z",
    uploadedBy: "MangoCare Lab",
    sizeLabel: "1.8 MB",
    summary:
      "Blood analysis report with Vitamin D and iron markers requiring attention.",
    tags: ["Blood analysis", "Vitamin D", "Iron"],
    linkedRecordLabel: "Lab Report: Blood Analysis",
  },
  {
    id: "document-2",
    title: "General Consultation Note",
    fileName: "consultation-note-emma-wilson.pdf",
    type: "clinical_note",
    status: "reviewed",
    uploadedAt: "2026-06-16T10:15:00.000Z",
    uploadedBy: "Dr. Emma Wilson",
    sizeLabel: "620 KB",
    summary:
      "Clinical note about tiredness, sleep, hydration, stress, and recent lab review.",
    tags: ["Consultation", "Fatigue", "Follow-up"],
    linkedRecordLabel: "Clinical Record: General consultation note",
  },
  {
    id: "document-3",
    title: "Vitamin D Prescription",
    fileName: "vitamin-d-prescription.pdf",
    type: "prescription",
    status: "reviewed",
    uploadedAt: "2026-06-12T11:20:00.000Z",
    uploadedBy: "Dr. Michael Stone",
    sizeLabel: "480 KB",
    summary:
      "Prescription and supportive recommendation for Vitamin D supplementation.",
    tags: ["Prescription", "Vitamin D", "Supplement"],
    linkedRecordLabel: "Medication: Vitamin D3",
  },
  {
    id: "document-4",
    title: "Insurance Confirmation",
    fileName: "insurance-confirmation.pdf",
    type: "insurance",
    status: "pending_review",
    uploadedAt: "2026-06-08T13:40:00.000Z",
    uploadedBy: "Patient",
    sizeLabel: "740 KB",
    summary:
      "Insurance confirmation document connected to the patient profile.",
    tags: ["Insurance", "Profile"],
  },
];