// This file contains only TypeScript types.
//
// Types describe the shape of data.
// They do not make API calls, store data, or render UI.

// Roles currently supported by the application.
export type UserRole = "Patient" | "Doctor" | "Admin";

// Safe user information used by the app after login.
//
// Password is intentionally NOT included here.
export type AuthenticatedUser = {
  id: string;
  displayName: string;
  email: string;
  roles: UserRole[];
};

// Response returned after a successful login or registration.
export type AuthResponse = {
  accessToken: string;
  expiresAt: string;
  user: AuthenticatedUser;
};

// Data sent from the register screen.
export type RegisterRequest = {
  displayName: string;
  email: string;
  password: string;
  role: "Patient" | "Doctor";
  specialty?: string;
};

// Data sent from the login screen.
export type LoginRequest = {
  email: string;
  password: string;
};

// Contract for every authentication service.
//
// Both the mock service and the future company API service
// must provide these same methods.
//
// This lets AuthProvider use one consistent interface,
// without caring where authentication data comes from.
export type AuthServiceContract = {
  register: (payload: RegisterRequest) => Promise<AuthResponse>;
  login: (payload: LoginRequest) => Promise<AuthResponse>;
  getMe: () => Promise<AuthenticatedUser>;
};