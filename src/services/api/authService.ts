// APP_MODE decides whether authentication uses:
// - local mock users
// - real company API later
import { APP_MODE } from "@/config/appMode";

// Temporary local authentication implementation.
import { MockAuthService } from "@/mocks/mockAuthService";

// Used by the real API implementation.
import { apiFetch } from "@/services/api/httpClient";

// Shared auth types.
//
// They belong to the auth feature, not specifically to an API service.
import type {
  AuthenticatedUser,
  AuthResponse,
  AuthServiceContract,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types";

// Re-export types so existing files can continue using imports like:
//
// import { AuthenticatedUser } from "@/services/api/authService";
//
// This means we do not need to update AuthProvider yet.
export type {
  AuthenticatedUser,
  AuthResponse,
  AuthServiceContract,
  LoginRequest,
  RegisterRequest,
  UserRole,
} from "@/features/auth/types";

// Real API implementation.
//
// It is not used while APP_MODE is "mock".
// We keep it ready for when the company backend API arrives.
const ApiAuthService: AuthServiceContract = {
  register: async (payload) => {
    return apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      requiresAuth: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  login: async (payload) => {
    return apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      requiresAuth: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  getMe: async () => {
    return apiFetch<AuthenticatedUser>("/auth/me");
  },
};

// This is the service imported by AuthProvider and other app files.
//
// In mock mode:
// AuthService is MockAuthService.
//
// In API mode later:
// AuthService is ApiAuthService.
export const AuthService: AuthServiceContract =
  APP_MODE === "mock" ? MockAuthService : ApiAuthService;




















// import { apiFetch } from "@/services/api/httpClient";

// export type UserRole = "Patient" | "Doctor" | "Admin";

// export type AuthenticatedUser = {
//   id: string;
//   displayName: string;
//   email: string;
//   roles: UserRole[];
// };

// export type AuthResponse = {
//   accessToken: string;
//   expiresAt: string;
//   user: AuthenticatedUser;
// };

// export type RegisterRequest = {
//   displayName: string;
//   email: string;
//   password: string;
//   role: "Patient" | "Doctor";
//   specialty?: string;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };

// export const AuthService = {
//   register: async (payload: RegisterRequest): Promise<AuthResponse> => {
//     return apiFetch<AuthResponse>("/auth/register", {
//       method: "POST",
//       requiresAuth: false,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//   },

//   login: async (payload: LoginRequest): Promise<AuthResponse> => {
//     return apiFetch<AuthResponse>("/auth/login", {
//       method: "POST",
//       requiresAuth: false,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//   },

//   getMe: async (): Promise<AuthenticatedUser> => {
//     return apiFetch<AuthenticatedUser>("/auth/me");
//   },
// };

// /*

// AuthService.register(...)
// → POST /api/auth/register
// → creates user in SQL Server
// → returns JWT token + user data

// AuthService.login(...)
// → POST /api/auth/login
// → verifies email and password
// → returns JWT token + user data

// AuthService.getMe()
// → GET /api/auth/me
// → uses the saved JWT automatically
// → returns the currently logged-in user

// */