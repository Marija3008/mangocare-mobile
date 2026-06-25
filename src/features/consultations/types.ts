export type ConsultationType = "video" | "audio" | "chat";

export type ConsultationStatus =
  | "upcoming"
  | "completed"
  | "cancelled";

export interface Consultation {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: ConsultationType;
  status: ConsultationStatus;
  reason: string;
  notes?: string;
  location?: string;
}