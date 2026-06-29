// These types belong to the shared Care Team feature.
//
// Both Patient and Doctor features will use them.
// That is why they do not belong only inside the doctor folder.

// A connection between a patient and doctor can have one of these states.
export type CareRelationshipStatus =
  | "Pending"
  | "Active"
  | "Rejected"
  | "Ended";

// Basic patient information needed by care-team screens.
//
// This is not a full medical profile.
export type CareTeamPatient = {
  id: string;
  displayName: string;
  dateOfBirth: string;
  gender: string;
  initials: string;
};

// Basic doctor information shown to patients in the doctor directory.
export type CareTeamDoctor = {
  id: string;
  displayName: string;
  initials: string;
  specialty: string;
  biography: string;
};

// One connection/request between a patient and a doctor.
//
// This is the important shared object.
// The same relationship will be visible from both sides:
//
// Patient:
// "My request is Pending"
//
// Doctor:
// "I have a Pending request from this patient"
export type CareRelationship = {
  id: string;

  // IDs connect this relationship to a patient and doctor.
  patientId: string;
  doctorId: string;

  status: CareRelationshipStatus;

  // The moment the patient sent the request.
  requestedAt: string;

  // The moment the doctor accepted or rejected it.
  // Optional because a Pending request has not received a response yet.
  respondedAt?: string;

  // Optional message written by the patient with the request.
  note?: string;

  // These fields are currently used by the Doctor patient list/dashboard.
  // They are optional because Pending requests do not need them.
  lastActivityLabel?: string;
  latestDocumentLabel?: string;
  latestLabLabel?: string;
};

export type PatientDoctorRelationshipSummary = {
  relationshipId: string;
  relationshipStatus: CareRelationshipStatus;
  requestedAt: string;
  respondedAt?: string;
};

export type PatientDoctorConnection =
  PatientDoctorRelationshipSummary & {
    doctor: CareTeamDoctor;
    note?: string;
  };

export type PatientDoctorDirectoryItem = {
  doctor: CareTeamDoctor;
  relationship?: PatientDoctorRelationshipSummary;
};

export type RequestDoctorConnectionPayload = {
  doctorId: string;
  note?: string;
};


