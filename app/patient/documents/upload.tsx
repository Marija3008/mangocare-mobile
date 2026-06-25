import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useUploadDocument } from "@/features/documents/hooks/useUploadDocument";
import { MedicalDocumentType } from "@/features/documents/types";
import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { Screen } from "@/shared/components/Screen";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type DocumentTypeOption = {
  label: string;
  value: MedicalDocumentType;
};

const documentTypes: DocumentTypeOption[] = [
  {
    label: "Lab Report",
    value: "lab_report",
  },
  {
    label: "Clinical Note",
    value: "clinical_note",
  },
  {
    label: "Prescription",
    value: "prescription",
  },
  {
    label: "Imaging",
    value: "imaging",
  },
  {
    label: "Insurance",
    value: "insurance",
  },
  {
    label: "Other",
    value: "other",
  },
];

export default function UploadDocumentScreen() {
  const [title, setTitle] = useState("");
  const [selectedType, setSelectedType] =
    useState<MedicalDocumentType>("lab_report");
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadMutation = useUploadDocument();

  const handlePickFile = async () => {
    setError(null);

    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/png", "image/jpeg"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) {
      return;
    }

    const file = result.assets[0];

    setSelectedFile(file);

    if (!title.trim()) {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      setTitle(fileNameWithoutExtension);
    }
  };

  const handleUpload = async () => {
    setError(null);

    if (!title.trim()) {
      setError("Please enter a document title.");
      return;
    }

    if (!selectedFile) {
      setError("Please choose a file first.");
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        title: title.trim(),
        type: selectedType,
        file: selectedFile,
      });

      router.replace("/patient/documents");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Document could not be uploaded."
      );
    }
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.backText} onPress={() => router.back()}>
            ← Back
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Medical Files</Text>
            <Text style={styles.title}>Upload Document</Text>
            <Text style={styles.subtitle}>
              Choose a PDF or image and save it to your patient document
              library.
            </Text>
          </View>

          <Card style={styles.card}>
            <Text style={styles.label}>Document title</Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Example: Blood Analysis June 2026"
              placeholderTextColor={colors.textSoft}
              style={styles.input}
            />
          </Card>

          <Card style={styles.card}>
            <Text style={styles.label}>Document type</Text>

            <View style={styles.typeGrid}>
              {documentTypes.map((option) => {
                const selected = selectedType === option.value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => setSelectedType(option.value)}
                    style={[
                      styles.typeOption,
                      selected
                        ? styles.typeOptionSelected
                        : styles.typeOptionInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        selected && styles.typeTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Card>

          <Card style={styles.card}>
            <Text style={styles.label}>File</Text>

            {selectedFile ? (
              <View style={styles.fileBox}>
                <Text style={styles.fileName}>{selectedFile.name}</Text>

                {selectedFile.size ? (
                  <Text style={styles.fileMeta}>
                    {Math.round(selectedFile.size / 1024)} KB
                  </Text>
                ) : null}
              </View>
            ) : (
              <Text style={styles.noFileText}>No file selected yet.</Text>
            )}

            <View style={styles.buttonSpacer}>
              <AppButton
                title={selectedFile ? "Choose another file" : "Choose file"}
                variant="secondary"
                onPress={handlePickFile}
              />
            </View>
          </Card>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.uploadButton}>
            <AppButton
              title={uploadMutation.isPending ? "Uploading..." : "Upload"}
              onPress={handleUpload}
            />
          </View>

          <Text style={styles.helperText}>
            Allowed files: PDF, PNG, JPG, JPEG.
          </Text>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  topBar: {
    marginBottom: spacing.md,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  card: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  typeOption: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typeOptionInactive: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  typeOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  typeText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  typeTextSelected: {
    color: colors.primary,
    fontWeight: "700",
  },
  fileBox: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  fileName: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  fileMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  noFileText: {
    ...typography.body,
    color: colors.textMuted,
  },
  buttonSpacer: {
    marginTop: spacing.lg,
  },
  errorText: {
    ...typography.bodyMedium,
    color: colors.danger,
    marginBottom: spacing.md,
  },
  uploadButton: {
    marginTop: spacing.md,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSoft,
    textAlign: "center",
    marginTop: spacing.md,
  },
});