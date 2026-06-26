// A patient-doctor relationship can have one of these states.
//
// A union type prevents accidental values such as "Waiting" or "Connected".
import type {
  CareRelationshipStatus,
  CareTeamPatient,
} from "@/features/careTeam/types";

export type { CareRelationshipStatus } from "@/features/careTeam/types";

// Basic patient information shown to a doctor.
//
// This is a summary for lists/cards, not a full medical record.

export type PatientSummary = CareTeamPatient;
// export type PatientSummary = {
//   id: string;
//   displayName: string;
//   dateOfBirth: string;
//   gender: string;
//   initials: string;
// };

// One active patient shown in the Doctor's “My Patients” area.
export type DoctorPatient = {
  relationshipId: string;
  relationshipStatus: CareRelationshipStatus;
  relationshipStartedAt: string;

  // The patient information is grouped in a nested object
  // because it belongs to the patient, not the relationship itself.
  patient: PatientSummary;

  // These are display-ready summaries for the doctor dashboard/list.
  lastActivityLabel: string;
  latestDocumentLabel?: string;
  latestLabLabel?: string;
};

// A request sent by a patient that the Doctor can accept or reject.
export type PatientConnectionRequest = {
  id: string;
  requestedAt: string;
  note?: string;
  patient: PatientSummary;
};

// Small dashboard summary used by the Doctor Dashboard screen.
export type DoctorDashboardSummary = {
  activePatientsCount: number;
  pendingRequestsCount: number;
  documentsToReviewCount: number;
  upcomingConsultationsCount: number;
};