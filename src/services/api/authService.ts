import { apiFetch } from "@/services/api/httpClient";

export type UserRole = "Patient" | "Doctor" | "Admin";

export type AuthenticatedUser = {
  id: string;
  displayName: string;
  email: string;
  roles: UserRole[];
};

export type AuthResponse = {
  accessToken: string;
  expiresAt: string;
  user: AuthenticatedUser;
};

export type RegisterRequest = {
  displayName: string;
  email: string;
  password: string;
  role: "Patient" | "Doctor";
  specialty?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const AuthService = {
  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      requiresAuth: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    return apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      requiresAuth: false,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },

  getMe: async (): Promise<AuthenticatedUser> => {
    return apiFetch<AuthenticatedUser>("/auth/me");
  },
};

/*

AuthService.register(...)
→ POST /api/auth/register
→ creates user in SQL Server
→ returns JWT token + user data

AuthService.login(...)
→ POST /api/auth/login
→ verifies email and password
→ returns JWT token + user data

AuthService.getMe()
→ GET /api/auth/me
→ uses the saved JWT automatically
→ returns the currently logged-in user

*/