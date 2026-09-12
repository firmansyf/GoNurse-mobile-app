import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Button } from "@/components/Button";
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
    <View style={styles.container}>
      <Text style={styles.logo}>GoNurse</Text>

      <Text style={styles.step}>STEP 2 OF 2</Text>

      <Text style={styles.title}>
        Verify your credentials
      </Text>

      <Text style={styles.subtitle}>
        Upload your professional documents so we can
        verify your nursing credentials.
      </Text>

      <DocumentCard
        title="STR"
        description="Upload your valid STR document."
        file={strFile}
        onPress={() => pickDocument("str")}
      />

      <DocumentCard
        title="Nursing Diploma"
        description="Upload your nursing diploma or ijazah."
        file={diplomaFile}
        onPress={() => pickDocument("diploma")}
      />

      <View style={styles.bottom}>
        <Button
          title="Submit for Verification"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

interface DocumentCardProps {
  title: string;
  description: string;
  file: DocumentPicker.DocumentPickerAsset | null;
  onPress: () => void;
}

function DocumentCard({
  title,
  description,
  file,
  onPress,
}: DocumentCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {file ? "✓" : "📄"}
        </Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>

        {file ? (
          <Text
            style={styles.fileName}
            numberOfLines={1}
          >
            {file.name}
          </Text>
        ) : (
          <Text style={styles.description}>
            {description}
          </Text>
        )}
      </View>

      <Text style={styles.action}>
        {file ? "Change" : "Upload"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 32,
  },

  step: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#777",
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginTop: 8,
    marginBottom: 32,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    marginBottom: 16,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 24,
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  description: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },

  fileName: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  action: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 10,
  },

  bottom: {
    marginTop: "auto",
    paddingTop: 24,
  },
});