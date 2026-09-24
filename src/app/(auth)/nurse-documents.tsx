import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/auth-store";

export default function NurseDocumentsScreen() {
  const nurseProfile = useAuthStore(
    (state) => state.nurseProfile,
  );

  const setNurseProfile = useAuthStore(
    (state) => state.setNurseProfile,
  );

  const [strFile, setStrFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const [diplomaFile, setDiplomaFile] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const pickDocument = async (
    type: "str" | "diploma",
  ) => {
    const result =
      await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "image/jpeg",
          "image/png",
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

    if (result.canceled) {
      return;
    }

    const file = result.assets[0];

    if (type === "str") {
      setStrFile(file);
    } else {
      setDiplomaFile(file);
    }
  };

  const handleSubmit = () => {
    if (!strFile) {
      Alert.alert(
        "STR Required",
        "Please upload your STR document.",
      );
      return;
    }

    if (!diplomaFile) {
      Alert.alert(
        "Diploma Required",
        "Please upload your nursing diploma.",
      );
      return;
    }

    if (!nurseProfile) {
      Alert.alert(
        "Profile Error",
        "Nurse profile data was not found.",
      );
      return;
    }

    setNurseProfile({
      ...nurseProfile,
      strDocumentUri: strFile.uri,
      diplomaDocumentUri: diplomaFile.uri,
      verificationStatus: "under_review",
    });

    router.replace("/(auth)/verification-status");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Brand */}
      <View style={styles.brandRow}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconText}>+</Text>
        </View>

        <Text style={styles.logo}>GoNurse</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.step}>STEP 2 OF 2</Text>

          <Text style={styles.progressText}>100%</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroIconText}>✓</Text>
        </View>

        <Text style={styles.title}>
          Verify your credentials
        </Text>

        <Text style={styles.subtitle}>
          Upload your professional documents so we can
          verify your nursing credentials.
        </Text>
      </View>

      {/* Documents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Required Documents
        </Text>

        <Text style={styles.sectionSubtitle}>
          Both documents are required to complete your
          nurse verification.
        </Text>

        <DocumentCard
          title="STR"
          description="Upload your valid STR document."
          file={strFile}
          onPress={() => pickDocument("str")}
          required
        />

        <DocumentCard
          title="Nursing Diploma"
          description="Upload your nursing diploma or ijazah."
          file={diplomaFile}
          onPress={() => pickDocument("diploma")}
          required
        />
      </View>

      {/* Verification Info */}
      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>✓</Text>
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>
            Secure Verification
          </Text>

          <Text style={styles.infoDescription}>
            Your documents will be reviewed to verify your
            professional nursing credentials.
          </Text>
        </View>
      </View>

      {/* Submit */}
      <View style={styles.bottom}>
        <Button
          title="Submit for Verification"
          onPress={handleSubmit}
        />

        <Text style={styles.bottomText}>
          By submitting, your profile will enter the
          verification process.
        </Text>
      </View>
    </ScrollView>
  );
}

interface DocumentCardProps {
  title: string;
  description: string;
  file: DocumentPicker.DocumentPickerAsset | null;
  onPress: () => void;
  required?: boolean;
}

function DocumentCard({
  title,
  description,
  file,
  onPress,
  required = false,
}: DocumentCardProps) {
  const uploaded = !!file;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        uploaded && styles.cardUploaded,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          uploaded && styles.iconContainerUploaded,
        ]}
      >
        <Text
          style={[
            styles.icon,
            uploaded && styles.iconUploaded,
          ]}
        >
          {uploaded ? "✓" : "📄"}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>
            {title}
          </Text>

          {required && (
            <View style={styles.requiredBadge}>
              <Text style={styles.requiredText}>
                Required
              </Text>
            </View>
          )}
        </View>

        {uploaded ? (
          <>
            <Text
              style={styles.fileName}
              numberOfLines={1}
            >
              {file.name}
            </Text>

            <Text style={styles.uploadedText}>
              Document uploaded successfully
            </Text>
          </>
        ) : (
          <Text style={styles.description}>
            {description}
          </Text>
        )}
      </View>

      {/* Action */}
      <View
        style={[
          styles.actionButton,
          uploaded && styles.actionButtonUploaded,
        ]}
      >
        <Text
          style={[
            styles.action,
            uploaded && styles.actionUploaded,
          ]}
        >
          {uploaded ? "Change" : "Upload"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },

  // =========================
  // BRAND
  // =========================

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  brandIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  brandIconText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 26,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  // =========================
  // PROGRESS
  // =========================

  progressSection: {
    marginBottom: 28,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  step: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
    color: COLORS.primary,
  },

  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },

  progressFill: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  // =========================
  // HERO
  // =========================

  hero: {
    marginBottom: 30,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  heroIconText: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.primary,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
    marginTop: 10,
  },

  // =========================
  // SECTION
  // =========================

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    marginTop: 5,
    marginBottom: 16,
  },

  // =========================
  // DOCUMENT CARD
  // =========================

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  cardUploaded: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainerUploaded: {
    backgroundColor: COLORS.primaryLight,
  },

  icon: {
    fontSize: 23,
  },

  iconUploaded: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  requiredBadge: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: COLORS.primaryLight,
  },

  requiredText: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  fileName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 5,
  },

  uploadedText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    marginTop: 3,
  },

  actionButton: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primarySoft,
  },

  actionButtonUploaded: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  action: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  actionUploaded: {
    color: COLORS.textSecondary,
  },

  // =========================
  // INFO
  // =========================

  infoCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    marginBottom: 24,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  infoIconText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  infoDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  // =========================
  // BOTTOM
  // =========================

  bottom: {
    paddingTop: 4,
  },

  bottomText: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textMuted,
    marginTop: 12,
    paddingHorizontal: 12,
  },
});