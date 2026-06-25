// Authentication data shapes used by this service.
import type {
  AuthenticatedUser,
  AuthResponse,
  AuthServiceContract,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types";

// We reuse ApiError so mock login errors behave like API errors.
import { ApiError } from "@/services/api/httpClient";

// This reads the previously saved token from SecureStore/localStorage.
import { getAccessToken } from "@/services/api/tokenStorage";

// Our temporary fake user list.
import { MOCK_USERS } from "@/mocks/mockUsers";

// The shape of one fake user.
import type { MockUser } from "@/mocks/mockUsers";

// Every fake token starts with this prefix.
//
// Example:
// mock-user:mock-patient-001
//
// This is not a real JWT.
// It only tells mock mode which demo user is signed in.
const MOCK_TOKEN_PREFIX = "mock-user:";

// One hour expressed in milliseconds.
//
// 60 seconds × 60 minutes × 1000 milliseconds.
const MOCK_SESSION_DURATION_MS = 60 * 60 * 1000;

// Converts a MockUser into the safe user shape used by the app.
//
// We do not return password here.
function toAuthenticatedUser(mockUser: MockUser): AuthenticatedUser {
  return {
    id: mockUser.id,
    displayName: mockUser.displayName,
    email: mockUser.email,
    roles: mockUser.roles,
  };
}

// Creates a response shaped like a real backend login response.
//
// AuthProvider expects:
// - accessToken
// - expiresAt
// - user
//
// By returning the same shape, AuthProvider can work
// with mock data and later with the company API.
function createMockAuthResponse(mockUser: MockUser): AuthResponse {
  return {
    // A template literal combines text with a value.
    //
    // Example result:
    // mock-user:mock-patient-001
    accessToken: `${MOCK_TOKEN_PREFIX}${mockUser.id}`,

    // Date.now() gives the current time in milliseconds.
    // We add one hour, then convert it to ISO date text.
    expiresAt: new Date(
      Date.now() + MOCK_SESSION_DURATION_MS,
    ).toISOString(),

    user: toAuthenticatedUser(mockUser),
  };
}

// Reads a saved fake token and returns its matching mock user.
//
// It returns MockUser, not MockUser | null,
// because invalid cases throw an error before the return.
function getMockUserFromToken(token: string | null): MockUser {
  // null means no user has logged in yet.
  // startsWith checks that the token belongs to mock mode.
  if (!token || !token.startsWith(MOCK_TOKEN_PREFIX)) {
    throw new ApiError(
      "Your mock session is no longer valid. Please sign in again.",
      401,
      null,
    );
  }

  // Remove "mock-user:" and keep only the user ID.
  //
  // "mock-user:mock-patient-001"
  // becomes
  // "mock-patient-001"
  const userId = token.slice(MOCK_TOKEN_PREFIX.length);

  // find() returns:
  // - the first matching user
  // - undefined when no match exists
  const mockUser = MOCK_USERS.find((user) => user.id === userId);

  if (!mockUser) {
    throw new ApiError(
      "The saved mock user could not be found. Please sign in again.",
      401,
      null,
    );
  }

  return mockUser;
}

// Finds a demo user based on login email and password.
function findMockUser(payload: LoginRequest): MockUser {
  // trim removes spaces before/after the email.
  // toLowerCase makes email comparison case-insensitive.
  const normalizedEmail = payload.email.trim().toLowerCase();

  const mockUser = MOCK_USERS.find(
    (user) =>
      user.email.toLowerCase() === normalizedEmail &&
      user.password === payload.password,
  );

  if (!mockUser) {
    throw new ApiError(
      "Incorrect email or password. Use one of the demo accounts.",
      401,
      null,
    );
  }

  return mockUser;
}

// Creates a temporary fake account from RegisterScreen data.
//
// It exists only while the current app session is running.
// After a full reload, the array returns to the original demo users.
function registerMockUser(payload: RegisterRequest): AuthResponse {
  const normalizedEmail = payload.email.trim().toLowerCase();

  // some() returns true when at least one item matches.
  const userAlreadyExists = MOCK_USERS.some(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (userAlreadyExists) {
    throw new ApiError(
      "A mock user with this email already exists.",
      409,
      null,
    );
  }

  const newMockUser: MockUser = {
    // Date.now helps create a different temporary ID.
    id: `mock-${payload.role.toLowerCase()}-${Date.now()}`,
    displayName: payload.displayName.trim(),
    email: normalizedEmail,
    password: payload.password,
    roles: [payload.role],
  };

  // Only doctors need a specialty.
  if (payload.role === "Doctor" && payload.specialty?.trim()) {
    newMockUser.specialty = payload.specialty.trim();
  }

  // push adds the new user into our local fake array.
  MOCK_USERS.push(newMockUser);

  return createMockAuthResponse(newMockUser);
}

// This object must follow AuthServiceContract.
//
// TypeScript checks that it has:
// - register()
// - login()
// - getMe()
export const MockAuthService: AuthServiceContract = {
  // async automatically wraps the returned value in a Promise.
  register: async (payload) => {
    return registerMockUser(payload);
  },

  login: async (payload) => {
    const mockUser = findMockUser(payload);

    return createMockAuthResponse(mockUser);
  },

  getMe: async () => {
    // AuthProvider saved the token during login.
    const savedToken = await getAccessToken();

    // Use it to restore the signed-in mock user.
    const mockUser = getMockUserFromToken(savedToken);

    return toAuthenticatedUser(mockUser);
  },
};