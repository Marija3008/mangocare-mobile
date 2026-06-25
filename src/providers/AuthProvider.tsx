import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthenticatedUser,
  AuthService,
  LoginRequest,
  RegisterRequest,
} from "@/services/api/authService";
import { ApiError } from "@/services/api/httpClient";
import {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
} from "@/services/api/tokenStorage";

type AuthContextValue = {
  user: AuthenticatedUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (payload: LoginRequest) => Promise<AuthenticatedUser>;
  register: (payload: RegisterRequest) => Promise<AuthenticatedUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<AuthenticatedUser | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser =
    useCallback(async (): Promise<AuthenticatedUser | null> => {
      setIsLoading(true);

      try {
        const accessToken = await getAccessToken();

        if (!accessToken) {
          setUser(null);
          return null;
        }

        const currentUser = await AuthService.getMe();

        setUser(currentUser);

        return currentUser;
      } catch (error) {
        if (
          error instanceof ApiError &&
          (error.status === 401 || error.status === 403)
        ) {
          await removeAccessToken();
        }

        setUser(null);

        return null;
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const login = async (payload: LoginRequest): Promise<AuthenticatedUser> => {
    const response = await AuthService.login(payload);

    await saveAccessToken(response.accessToken);

    setUser(response.user);

    return response.user;
  };

  const register = async (
    payload: RegisterRequest,
  ): Promise<AuthenticatedUser> => {
    const response = await AuthService.register(payload);

    await saveAccessToken(response.accessToken);

    setUser(response.user);

    return response.user;
  };

  const logout = async (): Promise<void> => {
    await removeAccessToken();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}


/*
App opens
→ reads saved token from SecureStore
→ calls GET /api/auth/me
→ restores the logged-in user

Login/register succeeds
→ saves JWT token
→ saves user in React state

Logout
→ removes JWT token
→ removes logged-in user from React state
*/