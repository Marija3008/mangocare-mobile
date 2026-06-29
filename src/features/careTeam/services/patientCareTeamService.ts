// These are the shapes returned to Patient screens
// and accepted from Patient actions.
import type {
  CareRelationship,
  CareTeamDoctor,
  PatientDoctorConnection,
  PatientDoctorDirectoryItem,
  PatientDoctorRelationshipSummary,
  RequestDoctorConnectionPayload,
} from "@/features/careTeam/types";

// This is the shared mock source used by both Patient and Doctor services.
import {
  MOCK_CARE_RELATIONSHIPS,
  MOCK_CARE_TEAM_DOCTORS,
} from "@/mocks/careTeam.mock";

import { getCurrentMockUserWithRole } from "@/mocks/mockSession";

// This contract describes what the Patient Care Team service must provide.
//
// Later, mock logic can be replaced with company API calls while
// Patient hooks and screens continue calling the same methods.
export type PatientCareTeamServiceContract = {
  getDoctorDirectory: () => Promise<PatientDoctorDirectoryItem[]>;
  getMyDoctorConnections: () => Promise<PatientDoctorConnection[]>;
  requestDoctorConnection: (
    payload: RequestDoctorConnectionPayload,
  ) => Promise<PatientDoctorConnection>;
};

// Returns all relationships that belong to the current mock Patient.
//
// In real API mode, the backend identifies the signed-in Patient
// from the access token. This hardcoded ID is only for mock mode.
function getRelationshipsForPatient(patientId: string): CareRelationship[] {
  return MOCK_CARE_RELATIONSHIPS.filter(
    (relationship) => relationship.patientId === patientId,
  );
}

// Finds full doctor information by doctor ID.
function getDoctorOrThrow(doctorId: string): CareTeamDoctor {
  const doctor = MOCK_CARE_TEAM_DOCTORS.find((item) => item.id === doctorId);

  if (!doctor) {
    throw new Error("The selected doctor could not be found.");
  }

  return doctor;
}

// Converts shared relationship data into the smaller shape
// needed by Patient-side UI.
function toPatientDoctorRelationshipSummary(
  relationship: CareRelationship,
): PatientDoctorRelationshipSummary {
  return {
    relationshipId: relationship.id,
    relationshipStatus: relationship.status,
    requestedAt: relationship.requestedAt,

    // Only include respondedAt when the Doctor has already responded.
    ...(relationship.respondedAt
      ? {
          respondedAt: relationship.respondedAt,
        }
      : {}),
  };
}

// Combines one relationship with the related Doctor information.
//
// CareRelationship contains doctorId, but Patient UI needs
// the Doctor's name, initials, specialty, and biography.
function toPatientDoctorConnection(
  relationship: CareRelationship,
): PatientDoctorConnection {
  const doctor = getDoctorOrThrow(relationship.doctorId);

  return {
    ...toPatientDoctorRelationshipSummary(relationship),

    // Return a copied Doctor object instead of exposing the original
    // object from the mock store.
    doctor: {
      ...doctor,
    },

    // Include the Patient's request note only when it exists.
    ...(relationship.note
      ? {
          note: relationship.note,
        }
      : {}),
  };
}

// SERVICE OBJECT
//
// It currently uses local shared mock data.
// Later, its methods can call real company API endpoints.
export const PatientCareTeamService: PatientCareTeamServiceContract = {
  // Returns all Doctors available in the Patient Doctor Directory.
  //
  // Each directory item may include this Patient's current relationship
  // with that Doctor, for example Active or Pending.
  getDoctorDirectory: async () => {
    const patient = await getCurrentMockUserWithRole("Patient");
    const patientRelationships = getRelationshipsForPatient(patient.id);

    return MOCK_CARE_TEAM_DOCTORS.map((doctor) => {
      // This mock version permits one relationship per Patient-Doctor pair.
      const relationship = patientRelationships.find(
        (item) => item.doctorId === doctor.id,
      );

      return {
        doctor: {
          ...doctor,
        },

        // Add relationship only when one exists.
        ...(relationship
          ? {
              relationship: toPatientDoctorRelationshipSummary(relationship),
            }
          : {}),
      };
    });
  },

  // Returns every Doctor connection belonging to the current Patient.
  //
  // This includes Active, Pending, and Rejected relationships,
  // so the Patient can understand the status of each request.
  getMyDoctorConnections: async () => {
    const patient = await getCurrentMockUserWithRole("Patient");

    return (
      getRelationshipsForPatient(patient.id)
        // filter() created a new array, so sorting here does not reorder
        // the original shared MOCK_CARE_RELATIONSHIPS array.
        .sort(
          (first, second) =>
            Date.parse(second.requestedAt) - Date.parse(first.requestedAt),
        )
        .map(toPatientDoctorConnection)
    );
  },

  // Creates a new Pending request from the current Patient to one Doctor.
  requestDoctorConnection: async (payload) => {
    const patient = await getCurrentMockUserWithRole("Patient");
    // First ensure the selected doctor really exists.
    getDoctorOrThrow(payload.doctorId);

    // Check whether this Patient already has any relationship
    // with the chosen Doctor.
    const existingRelationship = getRelationshipsForPatient(patient.id).find(
      (relationship) => relationship.doctorId === payload.doctorId,
    );

    // For now, one Patient can have one relationship record
    // with one Doctor.
    if (existingRelationship) {
      throw new Error(
        "You already have a connection request or relationship with this doctor.",
      );
    }

    // trim() removes accidental spaces before and after the note.
    const cleanedNote = payload.note?.trim();

    const newRelationship: CareRelationship = {
      // Date.now() is sufficient for unique temporary mock IDs.
      id: `mock-relationship-${Date.now()}`,

      patientId: patient.id,
      doctorId: payload.doctorId,
      status: "Pending",
      requestedAt: new Date().toISOString(),

      // Add note only when the Patient actually entered text.
      ...(cleanedNote
        ? {
            note: cleanedNote,
          }
        : {}),
    };

    // This modifies the same shared array that DoctorService reads.
    //
    // Therefore, after React Query refreshes:
    // Patient sees Pending
    // Doctor sees the request in Requests
    MOCK_CARE_RELATIONSHIPS.unshift(newRelationship);

    return toPatientDoctorConnection(newRelationship);
  },
};
