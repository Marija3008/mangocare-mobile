export type MedicationFrequency =
  | "once_daily"
  | "twice_daily"
  | "three_times_daily"
  | "weekly"
  | "as_needed";

export type MedicationStatus = "active" | "paused" | "completed";

export interface MedicationDose {
  id: string;
  time: string;
  taken: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  prescribedBy: string;
  frequency: MedicationFrequency;
  status: MedicationStatus;
  startDate: string;
  endDate?: string;
  reminderEnabled: boolean;
  dosesToday: MedicationDose[];
  notes?: string;
}