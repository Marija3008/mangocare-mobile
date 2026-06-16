export type HealthScoreStatus = "excellent" | "good" | "warning" | "critical";

export type TrendDirection = "up" | "down" | "stable";

export interface PatientSummary {
  id: string;
  firstName: string;
  lastName: string;
}

export interface HealthScore {
  value: number;
  status: HealthScoreStatus;
  label: string;
  description: string;
  trend: TrendDirection;
}

export interface LatestLabSummary {
  id: string;
  title: string;
  date: string;
  status: "normal" | "attention" | "urgent";
  summary: string;
  abnormalMarkersCount: number;
}

export interface AiInsight {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "success";
}

export interface UpcomingConsultation {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: "video" | "audio" | "chat";
}

export interface PrescriptionSummary {
  id: string;
  name: string;
  dosage: string;
  nextDoseTime: string;
}

export interface DashboardData {
  patient: PatientSummary;
  healthScore: HealthScore;
  latestLab: LatestLabSummary;
  aiInsight: AiInsight;
  upcomingConsultation: UpcomingConsultation;
  prescriptions: PrescriptionSummary[];
}