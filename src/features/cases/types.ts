export type CaseStatus = "open" | "waiting_doctor" | "closed";
export type CasePriority = "low" | "medium" | "high";
export type ConsultationType = "chat" | "audio" | "video";

export interface MedicalCase {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  consultationType: ConsultationType;
  doctorName?: string;
  specialty?: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export type CaseMessageSender = "patient" | "doctor" | "system";

export interface CaseMessage {
  id: string;
  caseId: string;
  sender: CaseMessageSender;
  senderName: string;
  content: string;
  createdAt: string;
}

export interface CreateCasePayload {
  title: string;
  description: string;
  priority: CasePriority;
  consultationType: ConsultationType;
}

export interface SendCaseMessagePayload {
  caseId: string;
  content: string;
}