export interface PatientProfile {
  id: string;

  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  height: string;
  weight: string;

  email: string;
  phone: string;
  address: string;

  insuranceProvider: string;
  insuranceNumber: string;

  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;

  allergies: string[];
  chronicConditions: string[];
}