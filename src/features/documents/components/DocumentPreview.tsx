import { Image, Linking, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/shared/components/AppButton";
import { Card } from "@/shared/components/Card";
import { colors } from "@/shared/theme/colors";
import { radius } from "@/shared/theme/radius";
import { spacing } from "@/shared/theme/spacing";
import { typography } from "@/shared/theme/typography";

type DocumentPreviewProps = {
  fileUrl: string;
  contentType: string;
  fileName: string;
};

export function DocumentPreview({
  fileUrl,
  contentType,
  fileName,
}: DocumentPreviewProps) {
  const isImage = contentType.startsWith("image/");
  const isPdf = contentType === "application/pdf";

  const handleOpenFile = async () => {
    const canOpen = await Linking.canOpenURL(fileUrl);

    if (canOpen) {
      await Linking.openURL(fileUrl);
    }
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>File preview</Text>

      {isImage ? (
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: fileUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>
            {isPdf ? "PDF document" : "Document file"}
          </Text>

          <Text style={styles.placeholderText}>{fileName}</Text>
        </View>
      )}

      <View style={styles.buttonWrapper}>
        <AppButton
          title={isPdf ? "Open PDF" : "Open file"}
          onPress={handleOpenFile}
          variant="secondary"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  imageWrapper: {
    width: "100%",
    height: 280,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  placeholderTitle: {
    ...typography.bodyMedium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  placeholderText: {
    ...typography.body,
    color: colors.textMuted,
  },
  buttonWrapper: {
    marginTop: spacing.md,
  },
});


/*

PNG/JPG/JPEG → shows image preview inside the app
PDF          → shows PDF card and opens PDF when button is pressed
Other file   → opens file externally

*/