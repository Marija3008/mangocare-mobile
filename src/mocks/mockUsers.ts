// Import only the type because this file only needs TypeScript checking.
import type { UserRole } from "@/features/auth/types";

// MockUser is used only for temporary local testing.
//
// It contains password because this is fake demo data.
// A real API must never return passwords to the mobile app.
export type MockUser = {
  id: string;
  displayName: string;
  email: string;
  password: string;
  roles: UserRole[];
  specialty?: string;
};

// Temporary local fake database.
//
// This array resets to its original values after a full app reload.
export const MOCK_USERS: MockUser[] = [
  {
    id: "mock-patient-001",
    displayName: "Mila Petrovska",
    email: "patient.demo@mangocare.test",
    password: "Demo123!",
    roles: ["Patient"],
  },
  {
    id: "mock-doctor-001",
    displayName: "Dr. Elena Markovska",
    email: "doctor.demo@mangocare.test",
    password: "Demo123!",
    roles: ["Doctor"],
    specialty: "General Medicine",
  },
];