import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";
import { ApiError } from "@/services/api/httpClient";

export default function LoginScreen() {
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password."
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const user = await login({
        email: normalizedEmail,
        password,
      });

      if (user.roles.includes("Patient")) {
        router.replace("/(patient-tabs)/home");
        return;
      }

      await logout();

      Alert.alert(
        "Doctor account",
        "Doctor screens are not connected yet. We will build that area after the patient authentication flow is complete."
      );
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Something went wrong while trying to log in.";

      Alert.alert("Could not log in", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.appName}>MangoCare</Text>

          <Text style={styles.title}>Welcome back</Text>

          <Text style={styles.subtitle}>
            Sign in to view your health information securely.
          </Text>

          <Text style={styles.label}>Email</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#8A8A8A"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            editable={!isSubmitting}
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            textContentType="password"
            editable={!isSubmitting}
            style={styles.input}
          />

          <Pressable
            onPress={() => router.push("/forgot-password")}
            disabled={isSubmitting}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>
              Forgot password?
            </Text>
          </Pressable>

          <Pressable
            onPress={handleLogin}
            disabled={isSubmitting}
            style={[
              styles.loginButton,
              isSubmitting && styles.disabledButton,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Sign in</Text>
            )}
          </Pressable>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Do not have an account? </Text>

            <Pressable
              onPress={() => router.push("/register")}
              disabled={isSubmitting}
            >
              <Text style={styles.registerLink}>Create one</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#F5FAF9",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  appName: {
    color: "#1F8A70",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 24,
  },

  title: {
    color: "#1B1B1B",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#666666",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },

  label: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D6E3E0",
    borderRadius: 14,
    color: "#1B1B1B",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
  },

  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: -6,
    marginBottom: 24,
  },

  forgotPasswordText: {
    color: "#1F8A70",
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    alignItems: "center",
    backgroundColor: "#1F8A70",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 52,
  },

  disabledButton: {
    opacity: 0.65,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  registerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  registerText: {
    color: "#666666",
    fontSize: 14,
  },

  registerLink: {
    color: "#1F8A70",
    fontSize: 14,
    fontWeight: "700",
  },
});