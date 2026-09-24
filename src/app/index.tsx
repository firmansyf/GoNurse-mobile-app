import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>GoNurse</Text>

          <View style={styles.logoDot} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCircle}>
              <Text style={styles.illustration}>🧑‍⚕️</Text>
            </View>

            <View style={styles.floatingCard}>
              <View style={styles.checkCircle}>
                <Text style={styles.check}>✓</Text>
              </View>

              <View style={styles.trustedContent}>
                <Text style={styles.trustedTitle}>
                  Trusted Nurse
                </Text>

                <Text style={styles.trustedSubtitle}>
                  Verified professional
                </Text>
              </View>
            </View>
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Find trusted nurses{"\n"}near you
            </Text>

            <Text style={styles.subtitle}>
              Connect with professional nurses around you
              for trusted care when you need it.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Login
            </Text>

            <Text style={styles.primaryButtonArrow}>
              →
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Professional nursing care, closer to you.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 32,
  },

  /* =========================
     LOGO
  ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    fontSize: 27,
    fontWeight: "800",
    color: COLORS.primaryDark,
    letterSpacing: -0.8,
  },

  logoDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 4,
    marginTop: 14,
  },

  /* =========================
     MAIN CONTENT
  ========================= */

  content: {
    marginTop: 30,
  },

  /* =========================
     ILLUSTRATION
  ========================= */

  illustrationContainer: {
    height: 235,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  illustrationCircle: {
    width: 175,
    height: 175,
    borderRadius: 88,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  illustration: {
    fontSize: 82,
  },

  floatingCard: {
    position: "absolute",
    bottom: 5,
    right: 0,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.surface,

    paddingVertical: 10,
    paddingHorizontal: 12,

    borderRadius: 15,

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,

    maxWidth: 190,
  },

  checkCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  check: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  trustedContent: {
    flexShrink: 1,
  },

  trustedTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  trustedSubtitle: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  /* =========================
     TEXT
  ========================= */

  textContainer: {
    marginTop: 25,
  },

  title: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,
    marginTop: 14,
  },

  /* =========================
     ACTIONS
  ========================= */

  actions: {
    marginTop: 35,
    gap: 12,
  },

  primaryButton: {
    minHeight: 56,
    borderRadius: 15,
    backgroundColor: COLORS.primary,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,

    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  primaryButtonArrow: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },

  secondaryButton: {
    minHeight: 56,
    borderRadius: 15,

    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },

  /* =========================
     FOOTER
  ========================= */

  footerText: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.textMuted,
    marginTop: 4,
    paddingHorizontal: 10,
  },
});