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

type AccountRole = "Patient" | "Doctor";

export default function RegisterScreen() {
  const { register, logout } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("Patient");
  const [specialty, setSpecialty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    const normalizedName = displayName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password || !confirmPassword) {
      Alert.alert(
        "Missing information",
        "Please complete all required fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please make sure both password fields are the same."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password is too short",
        "Your password must contain at least 8 characters."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const user = await register({
        displayName: normalizedName,
        email: normalizedEmail,
        password,
        role,
        specialty:
          role === "Doctor" && specialty.trim()
            ? specialty.trim()
            : undefined,
      });

      if (user.roles.includes("Patient")) {
        router.replace("/(patient-tabs)/home");
        return;
      }

      // Doctor account is created, but the doctor area is not built yet.
      await logout();

      Alert.alert(
        "Doctor account created",
        "Your doctor profile was created. It is currently waiting for approval, and the doctor area will be connected next.",
        [
          {
            text: "Go to sign in",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : error instanceof Error
            ? error.message
            : "Something went wrong while creating your account.";

      Alert.alert("Could not create account", message);
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

          <Text style={styles.title}>Create your account</Text>

          <Text style={styles.subtitle}>
            Start managing your health information securely.
          </Text>

          <Text style={styles.label}>I am registering as</Text>

          <View style={styles.roleRow}>
            <Pressable
              onPress={() => setRole("Patient")}
              disabled={isSubmitting}
              style={[
                styles.roleButton,
                role === "Patient" && styles.roleButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === "Patient" && styles.roleButtonTextSelected,
                ]}
              >
                Patient
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setRole("Doctor")}
              disabled={isSubmitting}
              style={[
                styles.roleButton,
                role === "Doctor" && styles.roleButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === "Doctor" && styles.roleButtonTextSelected,
                ]}
              >
                Doctor
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>Full name</Text>

          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your full name"
            placeholderTextColor="#8A8A8A"
            autoCapitalize="words"
            editable={!isSubmitting}
            style={styles.input}
          />

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

          {role === "Doctor" && (
            <>
              <Text style={styles.label}>Specialty</Text>

              <TextInput
                value={specialty}
                onChangeText={setSpecialty}
                placeholder="For example: General Medicine"
                placeholderTextColor="#8A8A8A"
                autoCapitalize="words"
                editable={!isSubmitting}
                style={styles.input}
              />
            </>
          )}

          <Text style={styles.label}>Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            editable={!isSubmitting}
            style={styles.input}
          />

          <Text style={styles.label}>Confirm password</Text>

          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repeat your password"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            editable={!isSubmitting}
            style={styles.input}
          />

          <Text style={styles.passwordHint}>
            Use at least 8 characters, including uppercase, lowercase, and a
            number.
          </Text>

          <Pressable
            onPress={handleRegister}
            disabled={isSubmitting}
            style={[
              styles.registerButton,
              isSubmitting && styles.disabledButton,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.registerButtonText}>Create account</Text>
            )}
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>

            <Pressable
              onPress={() => router.replace("/login")}
              disabled={isSubmitting}
            >
              <Text style={styles.loginLink}>Sign in</Text>
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

  roleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },

  roleButton: {
    alignItems: "center",
    borderColor: "#D6E3E0",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 13,
  },

  roleButtonSelected: {
    backgroundColor: "#E4F4F0",
    borderColor: "#1F8A70",
  },

  roleButtonText: {
    color: "#666666",
    fontSize: 15,
    fontWeight: "600",
  },

  roleButtonTextSelected: {
    color: "#1F8A70",
  },

  input: {
    borderColor: "#D6E3E0",
    borderRadius: 14,
    borderWidth: 1,
    color: "#1B1B1B",
    fontSize: 16,
    marginBottom: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  passwordHint: {
    color: "#777777",
    fontSize: 12,
    lineHeight: 18,
    marginTop: -4,
    marginBottom: 22,
  },

  registerButton: {
    alignItems: "center",
    backgroundColor: "#1F8A70",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 52,
  },

  disabledButton: {
    opacity: 0.65,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  loginRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  loginText: {
    color: "#666666",
    fontSize: 14,
  },

  loginLink: {
    color: "#1F8A70",
    fontSize: 14,
    fontWeight: "700",
  },
});