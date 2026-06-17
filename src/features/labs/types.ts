export type BiomarkerStatus = "optimal" | "low" | "high" | "attention";

export type BiomarkerTrend = "up" | "down" | "stable";

export interface Biomarker {
  id: string;
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: BiomarkerStatus;
  trend: BiomarkerTrend;
  description: string;
}

export interface LabReport {
  id: string;
  title: string;
  labName: string;
  collectedAt: string;
  reviewedBy: string;
  wellnessScore: number;
  summary: string;
  markers: Biomarker[];
}