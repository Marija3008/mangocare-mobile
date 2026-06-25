// These imports are only TypeScript types.
// They help TypeScript check the mock data shape.
import type {
  DoctorPatient,
  PatientConnectionRequest,
} from "@/features/doctor/types";

// This array represents patients who already have an active
// relationship with the current mock doctor.
//
// It is our temporary local data source until the company API is connected.
export const MOCK_DOCTOR_PATIENTS: DoctorPatient[] = [
  {
    relationshipId: "mock-relationship-001",
    relationshipStatus: "Active",
    relationshipStartedAt: "2026-05-12T09:30:00.000Z",

    patient: {
      id: "mock-patient-001",
      displayName: "Mila Petrovska",
      dateOfBirth: "1997-05-12",
      gender: "Female",
      initials: "MP",
    },

    lastActivityLabel: "Mood entry added today",
    latestDocumentLabel: "Blood analysis report",
    latestLabLabel: "Vitamin D result available",
  },
  {
    relationshipId: "mock-relationship-002",
    relationshipStatus: "Active",
    relationshipStartedAt: "2026-04-28T11:15:00.000Z",

    patient: {
      id: "mock-patient-002",
      displayName: "Aleksandar Stojanovski",
      dateOfBirth: "1989-11-03",
      gender: "Male",
      initials: "AS",
    },

    lastActivityLabel: "Document uploaded yesterday",
    latestDocumentLabel: "General consultation note",
  },
  {
    relationshipId: "mock-relationship-003",
    relationshipStatus: "Active",
    relationshipStartedAt: "2026-03-19T08:45:00.000Z",

    patient: {
      id: "mock-patient-003",
      displayName: "Sara Ilievska",
      dateOfBirth: "2001-07-21",
      gender: "Female",
      initials: "SI",
    },

    lastActivityLabel: "No recent activity",
    latestLabLabel: "Complete blood count reviewed",
  },
];

// These are patient requests that the doctor has not accepted or rejected yet.
//
// Later, the doctor service will:
// - show this list on the Requests screen
// - remove an item after Accept/Reject
// - add an accepted patient into MOCK_DOCTOR_PATIENTS
export const MOCK_PATIENT_CONNECTION_REQUESTS: PatientConnectionRequest[] = [
  {
    id: "mock-request-001",
    requestedAt: "2026-06-24T10:30:00.000Z",
    note: "I would like to discuss my recent lab results.",

    patient: {
      id: "mock-patient-004",
      displayName: "Nikola Trajkoski",
      dateOfBirth: "1994-02-14",
      gender: "Male",
      initials: "NT",
    },
  },
  {
    id: "mock-request-002",
    requestedAt: "2026-06-23T14:10:00.000Z",

    patient: {
      id: "mock-patient-005",
      displayName: "Elena Ristovska",
      dateOfBirth: "1985-09-08",
      gender: "Female",
      initials: "ER",
    },
  },
];

// These are separate dashboard numbers for now.
//
// Later, these could come from dedicated API endpoints or
// be calculated from real appointments/documents.
export const MOCK_DOCUMENTS_TO_REVIEW_COUNT = 3;

export const MOCK_UPCOMING_CONSULTATIONS_COUNT = 2;