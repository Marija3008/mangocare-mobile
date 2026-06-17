import { PatientProfile } from "@/features/profile/types";

export const patientProfileMock: PatientProfile = {
  id: "patient-1",

  firstName: "Alex",
  lastName: "Morgan",
  dateOfBirth: "1994-04-18",
  gender: "Female",
  bloodType: "A+",
  height: "168 cm",
  weight: "62 kg",

  email: "alex.morgan@example.com",
  phone: "+389 70 123 456",
  address: "Ohrid, North Macedonia",

  insuranceProvider: "MangoCare Health Plan",
  insuranceNumber: "MC-2048-9931",

  emergencyContactName: "Jamie Morgan",
  emergencyContactPhone: "+389 70 555 111",
  emergencyContactRelation: "Sibling",

  allergies: ["Penicillin", "Dust"],
  chronicConditions: ["Low Vitamin D"],
};