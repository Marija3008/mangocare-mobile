import type {
  CareRelationship,
  CareTeamDoctor,
  CareTeamPatient,
} from "@/features/careTeam/types";

export const MOCK_PRIMARY_PATIENT_ID = "mock-patient-001";
export const MOCK_PRIMARY_DOCTOR_ID = "mock-doctor-001";

export const MOCK_CARE_TEAM_PATIENTS: CareTeamPatient[] = [
  {
    id: "mock-patient-001",
    displayName: "Mila Petrovska",
    dateOfBirth: "1997-05-12",
    gender: "Female",
    initials: "MP",
  },
  {
    id: "mock-patient-002",
    displayName: "Aleksandar Stojanovski",
    dateOfBirth: "1989-11-03",
    gender: "Male",
    initials: "AS",
  },
  {
    id: "mock-patient-003",
    displayName: "Sara Ilievska",
    dateOfBirth: "2001-07-21",
    gender: "Female",
    initials: "SI",
  },
  {
    id: "mock-patient-004",
    displayName: "Nikola Trajkoski",
    dateOfBirth: "1994-02-14",
    gender: "Male",
    initials: "NT",
  },
  {
    id: "mock-patient-005",
    displayName: "Elena Ristovska",
    dateOfBirth: "1985-09-08",
    gender: "Female",
    initials: "ER",
  },
];

// Doctors available in the temporary patient-side directory.
export const MOCK_CARE_TEAM_DOCTORS: CareTeamDoctor[] = [
  {
    id: "mock-doctor-001",
    displayName: "Dr. Elena Markovska",
    initials: "EM",
    specialty: "General Medicine",
    biography:
      "General practitioner focused on preventive care, follow-up consultations, and patient education.",
  },
  {
    id: "mock-doctor-002",
    displayName: "Dr. Filip Nacevski",
    initials: "FN",
    specialty: "Cardiology",
    biography:
      "Cardiologist with an interest in cardiovascular risk monitoring and long-term care planning.",
  },
  {
    id: "mock-doctor-003",
    displayName: "Dr. Ana Dimitrovska",
    initials: "AD",
    specialty: "Endocrinology",
    biography:
      "Endocrinologist supporting patients with thyroid, metabolic, and hormone-related conditions.",
  },
];

// This is the single shared source of truth.
//
// Doctor screens and Patient screens will both read and change this array.
//
// Example:
//
// Patient sends request
// → add one relationship with status "Pending"
//
// Doctor accepts request
// → change that same relationship to "Active"
//
// Patient sees updated status
// → reads the same relationship object
export const MOCK_CARE_RELATIONSHIPS: CareRelationship[] = [
  {
    id: "mock-relationship-001",
    patientId: "mock-patient-001",
    doctorId: "mock-doctor-001",
    status: "Active",
    requestedAt: "2026-05-08T09:30:00.000Z",
    respondedAt: "2026-05-12T09:30:00.000Z",
    lastActivityLabel: "Mood entry added today",
    latestDocumentLabel: "Blood analysis report",
    latestLabLabel: "Vitamin D result available",
  },
  {
    id: "mock-relationship-002",
    patientId: "mock-patient-002",
    doctorId: "mock-doctor-001",
    status: "Active",
    requestedAt: "2026-04-20T11:15:00.000Z",
    respondedAt: "2026-04-28T11:15:00.000Z",
    lastActivityLabel: "Document uploaded yesterday",
    latestDocumentLabel: "General consultation note",
  },
  {
    id: "mock-relationship-003",
    patientId: "mock-patient-003",
    doctorId: "mock-doctor-001",
    status: "Active",
    requestedAt: "2026-03-10T08:45:00.000Z",
    respondedAt: "2026-03-19T08:45:00.000Z",
    lastActivityLabel: "No recent activity",
    latestLabLabel: "Complete blood count reviewed",
  },
  {
    id: "mock-relationship-004",
    patientId: "mock-patient-004",
    doctorId: "mock-doctor-001",
    status: "Pending",
    requestedAt: "2026-06-24T10:30:00.000Z",
    note: "I would like to discuss my recent lab results.",
  },
  {
    id: "mock-relationship-005",
    patientId: "mock-patient-005",
    doctorId: "mock-doctor-001",
    status: "Pending",
    requestedAt: "2026-06-23T14:10:00.000Z",
  },
];

// Dashboard values that are unrelated to care relationships for now.
export const MOCK_DOCUMENTS_TO_REVIEW_COUNT = 3;
export const MOCK_UPCOMING_CONSULTATIONS_COUNT = 2;