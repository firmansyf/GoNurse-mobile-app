import { router } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function VerificationStatusScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🕐</Text>
      </View>

      <Text style={styles.title}>
        Verification in progress
      </Text>

      <Text style={styles.description}>
        Thank you for submitting your documents.
        {"\n\n"}
        Our team will review your STR and nursing
        diploma before your profile becomes available
        to patients.
      </Text>

      <View style={styles.status}>
        <Text style={styles.statusLabel}>
          STATUS
        </Text>

        <Text style={styles.statusValue}>
          UNDER REVIEW
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.replace("/(nurse)/dashboard")
        }
      >
        <Text style={styles.buttonText}>
          Continue to Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  icon: {
    fontSize: 36,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
  },

  status: {
    width: "100%",
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    marginTop: 32,
    alignItems: "center",
  },

  statusLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#777",
  },

  statusValue: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },

  button: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});