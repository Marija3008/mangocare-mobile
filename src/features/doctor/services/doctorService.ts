// These are the shapes of data returned by doctor-related actions.
import type {
  DoctorDashboardSummary,
  DoctorPatient,
  PatientConnectionRequest,
} from "@/features/doctor/types";

//tmporary data source; later these values will come from the company api instead
import {
  MOCK_DOCTOR_PATIENTS,
  MOCK_DOCUMENTS_TO_REVIEW_COUNT,
  MOCK_PATIENT_CONNECTION_REQUESTS,
  MOCK_UPCOMING_CONSULTATIONS_COUNT,
} from "@/mocks/doctor.mock";

//this contract describes what the DoctorService must provide
//a future api version should expose the same methods, so screens and hooks do not need to change

export type DoctorServiceContract = {
  getDashboard: () => Promise<DoctorDashboardSummary>;
  getPatients: () => Promise<DoctorPatient[]>;
  getPendingRequests: () => Promise<PatientConnectionRequest[]>;
  acceptRequest: (requestId: string) => Promise<DoctorPatient>;
  rejectRequest: (requestId: string) => Promise<void>;
};

// Finds the position of a pending request in the array.
//
// findIndex returns:
// - 0, 1, 2, etc. when a request is found
// - -1 when no request matches
//
// Throwing an error here stops the app from trying to accept/reject
// a request that does not exist.
function getRequestIndexOrThrow(requestId: string): number {
  const requestIndex = MOCK_PATIENT_CONNECTION_REQUESTS.findIndex(
    (request) => request.id === requestId,
  );

  if (requestIndex === -1) {
    throw new Error("The patient request could not be found.");
  }

  return requestIndex;
}

// Converts a pending request into an active doctor-patient relationship.
//
// This is a mapper function:
// input:  PatientConnectionRequest
// output: DoctorPatient
function createActivePatientFromRequest(
  request: PatientConnectionRequest,
): DoctorPatient {
  //DoctorPatient props need to be returned
  return {
    // Date.now creates a temporary unique relationship ID.
    relationshipId: `mock-relationship-${Date.now()}`,

    relationshipStatus: "Active",

    // Current date/time in a format that real APIs commonly use.
    relationshipStartedAt: new Date().toISOString(),

    // We create a new patient object with ...request.patient.
    // This avoids sharing the exact same nested object reference.
    patient: {
      ...request.patient, //to the patient prop, props from PatientConnectionRequest need to be assigned from that same patient
    },

    lastActivityLabel: "Connection accepted today",
  };
}


//SERVICE OBJECT
// The service object used by future hooks and screens.
//
// It currently reads local arrays.
// Later we can keep this same public interface and replace
// the internal mock logic with company API calls.
export const DoctorService: DoctorServiceContract = {
  // Returns the small summary used by Doctor Dashboard.
  //
  // async makes this return a Promise now.
  // This matches how a real fetch/API method behaves later.
  getDashboard: async () => {
    return {
      activePatientsCount: MOCK_DOCTOR_PATIENTS.length,
      pendingRequestsCount: MOCK_PATIENT_CONNECTION_REQUESTS.length,
      documentsToReviewCount: MOCK_DOCUMENTS_TO_REVIEW_COUNT,
      upcomingConsultationsCount: MOCK_UPCOMING_CONSULTATIONS_COUNT,
    };
  },

  // Returns active patients for the current doctor.
  getPatients: async () => {
    // [...array] makes a new outer array.
    //
    // This prevents a screen from accidentally doing something like:
    // patients.pop()
    // and changing the original mock data source.
    return [...MOCK_DOCTOR_PATIENTS];
  },

  // Returns patient requests that are still waiting for a decision.
  getPendingRequests: async () => {
    return [...MOCK_PATIENT_CONNECTION_REQUESTS];
  },

  // Accepts one pending request.
  acceptRequest: async (requestId) => {
    const requestIndex = getRequestIndexOrThrow(requestId);

    // Array access can theoretically return undefined,
    // so we check before using the request.
    const request = MOCK_PATIENT_CONNECTION_REQUESTS[requestIndex];

    if (!request) {
      throw new Error("The patient request could not be loaded.");
    }

    // First create the active patient relationship.
    const activePatient = createActivePatientFromRequest(request);

    // unshift adds the new patient at the beginning of the list.
    // Newest accepted patients appear first.
    MOCK_DOCTOR_PATIENTS.unshift(activePatient);

    // splice removes one item starting at requestIndex.
    // This removes the request from the pending list.
    MOCK_PATIENT_CONNECTION_REQUESTS.splice(requestIndex, 1);

    // Returning this lets a future screen immediately show
    // the new active patient if needed.
    return activePatient;
  },

  // Rejects one pending request.
  rejectRequest: async (requestId) => {
    const requestIndex = getRequestIndexOrThrow(requestId);

    // Remove the request from the pending mock data.
    MOCK_PATIENT_CONNECTION_REQUESTS.splice(requestIndex, 1);
  },
};
