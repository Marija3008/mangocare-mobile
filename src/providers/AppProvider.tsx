import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}