import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>GoNurse</Text>

        <Text style={styles.title}>
          Find trusted nurses{"\n"}near you
        </Text>

        <Text style={styles.subtitle}>
          Connect with professional nurses around you
          for trusted care when you need it.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 70,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 48,
  },

  title: {
    fontSize: 38,
    lineHeight: 46,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    marginTop: 20,
    color: "#666",
    maxWidth: 340,
  },

  actions: {
    gap: 12,
  },

  primaryButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});