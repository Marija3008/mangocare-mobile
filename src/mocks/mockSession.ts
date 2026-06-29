// This helper is only used by mock services.
//
// It gets the currently signed-in user through the existing AuthService.
// In mock mode, AuthService resolves the fake token saved after login.

import type { AuthenticatedUser, UserRole } from "@/features/auth/types";
import { AuthService } from "@/services/api/authService";

// Returns the currently signed-in mock user,
// but only when they have the required role.
//
// Example:
// await getCurrentMockUserWithRole("Patient")
//
// This prevents Patient services from accidentally running
// for a Doctor account, and vice versa.
export async function getCurrentMockUserWithRole(
  requiredRole: UserRole,
): Promise<AuthenticatedUser> {
  const user = await AuthService.getMe();

  if (!user.roles.includes(requiredRole)) {
    throw new Error(
      `This action is only available to users with the ${requiredRole} role.`,
    );
  }

  return user;
}
