// These are the data shapes returned to Doctor screens and hooks.
import type {
  DoctorDashboardSummary,
  DoctorPatient,
  PatientConnectionRequest,
} from "@/features/doctor/types";

// These are shared Care Team shapes used internally by this service.
import type {
  CareRelationship,
  CareTeamPatient,
} from "@/features/careTeam/types";

// This shared mock store is now the single source of truth.
//
// Both the Patient side and Doctor side will eventually read/change
// the same MOCK_CARE_RELATIONSHIPS array.
import {
  MOCK_CARE_RELATIONSHIPS,
  MOCK_CARE_TEAM_PATIENTS,
  MOCK_DOCUMENTS_TO_REVIEW_COUNT,
  MOCK_UPCOMING_CONSULTATIONS_COUNT,
} from "@/mocks/careTeam.mock";
import { getCurrentMockUserWithRole } from "@/mocks/mockSession";

// This contract describes what DoctorService must provide.
//
// Later, we can replace the internal mock logic with company API calls
// while keeping the same methods for hooks and screens.
export type DoctorServiceContract = {
  getDashboard: () => Promise<DoctorDashboardSummary>;
  getPatients: () => Promise<DoctorPatient[]>;
  getPatientById: (patientId: string) => Promise<DoctorPatient>;
  getPendingRequests: () => Promise<PatientConnectionRequest[]>;
  acceptRequest: (requestId: string) => Promise<DoctorPatient>;
  rejectRequest: (requestId: string) => Promise<void>;
};

// Returns all relationships that belong to the current mock doctor.
//
// In real API mode, the backend will identify the signed-in doctor
// from their access token. We will not keep a hardcoded doctor ID then.
function getRelationshipsForDoctor(doctorId: string): CareRelationship[] {
  return MOCK_CARE_RELATIONSHIPS.filter(
    (relationship) => relationship.doctorId === doctorId,
  );
}

// Finds patient information by ID.
//
// A relationship stores only patientId, so we use this function
// to find the full patient details in MOCK_CARE_TEAM_PATIENTS.
function getPatientOrThrow(patientId: string): CareTeamPatient {
  const patient = MOCK_CARE_TEAM_PATIENTS.find((item) => item.id === patientId);

  if (!patient) {
    throw new Error("The patient information could not be found.");
  }

  return patient;
}

// Converts one Active CareRelationship into the shape used
// by the Doctor Patients screen and Doctor Patient Details screen.
function toDoctorPatient(relationship: CareRelationship): DoctorPatient {
  // This mapper must only receive active relationships.
  if (relationship.status !== "Active") {
    throw new Error("Only active relationships can be shown as patients.");
  }

  const patient = getPatientOrThrow(relationship.patientId);

  return {
    // relationship.id becomes the ID used by the Doctor side.
    relationshipId: relationship.id,

    relationshipStatus: relationship.status,

    // For an active relationship, respondedAt is when the Doctor accepted it.
    // requestedAt is a safe fallback in case mock/API data is incomplete.
    relationshipStartedAt: relationship.respondedAt ?? relationship.requestedAt,

    // Create a new patient object instead of exposing the exact object
    // from the central mock store.
    patient: {
      ...patient,
    },

    // A relationship without activity should still show useful UI text.
    lastActivityLabel: relationship.lastActivityLabel ?? "No recent activity",

    // Add optional properties only when values exist.
    ...(relationship.latestDocumentLabel
      ? {
          latestDocumentLabel: relationship.latestDocumentLabel,
        }
      : {}),

    ...(relationship.latestLabLabel
      ? {
          latestLabLabel: relationship.latestLabLabel,
        }
      : {}),
  };
}

// Converts one Pending CareRelationship into the shape used
// by the Doctor Requests screen.
function toPatientConnectionRequest(
  relationship: CareRelationship,
): PatientConnectionRequest {
  if (relationship.status !== "Pending") {
    throw new Error(
      "Only pending relationships can be shown as patient requests.",
    );
  }

  const patient = getPatientOrThrow(relationship.patientId);

  return {
    // Existing Accept/Reject buttons already pass request.id.
    // We use the relationship ID as that request ID.
    id: relationship.id,

    requestedAt: relationship.requestedAt,

    patient: {
      ...patient,
    },

    ...(relationship.note
      ? {
          note: relationship.note,
        }
      : {}),
  };
}

// Finds one pending request belonging to the current mock doctor.
//
// Accept and Reject may only be performed on a Pending relationship.
function getPendingRelationshipOrThrow(
  requestId: string,
  doctorId: string,
): CareRelationship {
  const relationship = MOCK_CARE_RELATIONSHIPS.find(
    (item) =>
      item.id === requestId &&
      item.doctorId === doctorId &&
      item.status === "Pending",
  );

  if (!relationship) {
    throw new Error(
      "The patient request could not be found or has already been processed.",
    );
  }

  return relationship;
}

// Finds one Active relationship for a specific patient.
//
// This prevents the Doctor Patient Details screen from loading
// a patient who is not currently part of this doctor's active care team.
function getActiveRelationshipForPatientOrThrow(
  patientId: string,
  doctorId: string,
): CareRelationship {
  const relationship = MOCK_CARE_RELATIONSHIPS.find(
    (item) =>
      item.patientId === patientId &&
      item.doctorId === doctorId &&
      item.status === "Active",
  );

  if (!relationship) {
    throw new Error(
      "This patient could not be found or is not available to this doctor.",
    );
  }

  return relationship;
}

// SERVICE OBJECT
//
// It currently works with local mock data.
// Later, these same methods can call the company API instead.
export const DoctorService: DoctorServiceContract = {
  // Returns summary numbers for Doctor Dashboard.
  getDashboard: async () => {
    const doctor = await getCurrentMockUserWithRole("Doctor");
    const relationships = getRelationshipsForDoctor(doctor.id);

    return {
      activePatientsCount: relationships.filter(
        (relationship) => relationship.status === "Active",
      ).length,

      pendingRequestsCount: relationships.filter(
        (relationship) => relationship.status === "Pending",
      ).length,

      documentsToReviewCount: MOCK_DOCUMENTS_TO_REVIEW_COUNT,

      upcomingConsultationsCount: MOCK_UPCOMING_CONSULTATIONS_COUNT,
    };
  },

  // Returns all active patients for the current mock doctor.
  getPatients: async () => {
    const doctor = await getCurrentMockUserWithRole("Doctor");
    return (
      getRelationshipsForDoctor(doctor.id)
        .filter((relationship) => relationship.status === "Active")

        // Sort newest accepted patients first.
        //
        // filter() already creates a new array, so sort() does not change
        // the original MOCK_CARE_RELATIONSHIPS array.
        .sort((first, second) => {
          const firstDate = first.respondedAt ?? first.requestedAt;

          const secondDate = second.respondedAt ?? second.requestedAt;

          return Date.parse(secondDate) - Date.parse(firstDate);
        })

        // Convert shared relationship data into Doctor screen data.
        .map(toDoctorPatient)
    );
  },

  // Returns one active patient for the Doctor Patient Details screen.
  getPatientById: async (patientId) => {
    const doctor = await getCurrentMockUserWithRole("Doctor");

    const relationship = getActiveRelationshipForPatientOrThrow(
      patientId,
      doctor.id,
    );

    return toDoctorPatient(relationship);
  },

  // Returns patient connection requests that are still waiting
  // for the Doctor's decision.
  getPendingRequests: async () => {
    const doctor = await getCurrentMockUserWithRole("Doctor");
    return (
      getRelationshipsForDoctor(doctor.id)
        .filter((relationship) => relationship.status === "Pending")

        // Newest requests appear first.
        .sort(
          (first, second) =>
            Date.parse(second.requestedAt) - Date.parse(first.requestedAt),
        )

        .map(toPatientConnectionRequest)
    );
  },

  // Accepts one Pending relationship.
  //
  // We do not remove it from the shared array.
  // We change its status, so the Patient can later see "Active"
  // and the Doctor can see the patient in My Patients.
  acceptRequest: async (requestId) => {
    const doctor = await getCurrentMockUserWithRole("Doctor");

    const relationship = getPendingRelationshipOrThrow(requestId, doctor.id);

    relationship.status = "Active";
    relationship.respondedAt = new Date().toISOString();
    relationship.lastActivityLabel = "Connection accepted today";

    return toDoctorPatient(relationship);
  },

  // Rejects one Pending relationship.
  //
  // The relationship remains in the shared array with status "Rejected".
  // This is important because the Patient must later see that the request
  // was declined instead of having it disappear with no explanation.
  rejectRequest: async (requestId) => {
    const doctor = await getCurrentMockUserWithRole("Doctor");
    const relationship = getPendingRelationshipOrThrow(requestId, doctor.id);

    relationship.status = "Rejected";
    relationship.respondedAt = new Date().toISOString();
  },
};
