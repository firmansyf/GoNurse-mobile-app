import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

export default function VerificationStatusScreen() {
  // =========================
  // CLOCK ANIMATION
  // =========================

  const clockRotation = useRef(
    new Animated.Value(0),
  ).current;

  const clockScale = useRef(
    new Animated.Value(1),
  ).current;

  useEffect(() => {
    const rotationAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(clockRotation, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(clockRotation, {
          toValue: -1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(clockRotation, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.delay(700),
      ]),
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(clockScale, {
          toValue: 1.08,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(clockScale, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.delay(500),
      ]),
    );

    rotationAnimation.start();
    pulseAnimation.start();

    return () => {
      rotationAnimation.stop();
      pulseAnimation.stop();
    };
  }, [clockRotation, clockScale]);

  const clockRotate = clockRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-10deg", "0deg", "10deg"],
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* =========================
          BRAND
      ========================= */}

      <View style={styles.brandRow}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconText}>+</Text>
        </View>

        <Text style={styles.logo}>GoNurse</Text>
      </View>

      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        {/* Animated Clock */}

        <View style={styles.iconWrapper}>
          <View style={styles.iconContainer}>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: clockRotate,
                  },
                  {
                    scale: clockScale,
                  },
                ],
              }}
            >
              <Text style={styles.icon}>🕐</Text>
            </Animated.View>
          </View>

          <View style={styles.statusDot} />
        </View>

        <Text style={styles.title}>
          Verification in progress
        </Text>

        <Text style={styles.description}>
          Your documents have been submitted successfully.
          Our team is currently reviewing your nursing
          credentials.
        </Text>
      </View>

      {/* =========================
          CURRENT STATUS
      ========================= */}

      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Text style={styles.statusIconText}>✓</Text>
        </View>

        <View style={styles.statusContent}>
          <Text style={styles.statusLabel}>
            CURRENT STATUS
          </Text>

          <Text style={styles.statusValue}>
            Under Review
          </Text>

          <Text style={styles.statusDescription}>
            We are reviewing your STR and nursing diploma.
          </Text>
        </View>
      </View>

      {/* =========================
          VERIFICATION PROCESS
      ========================= */}

      <View style={styles.processCard}>
        <Text style={styles.processTitle}>
          What happens next?
        </Text>

        <ProcessStep
          number="1"
          title="Documents received"
          description="Your STR and diploma have been submitted."
          completed
        />

        <ProcessStep
          number="2"
          title="Credential review"
          description="Our team checks your submitted documents."
          active
        />

        <ProcessStep
          number="3"
          title="Profile activation"
          description="Your profile will be available to patients."
        />
      </View>

      {/* =========================
          IMPORTANT INFO
      ========================= */}

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Text style={styles.infoIconText}>i</Text>
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>
            No action needed
          </Text>

          <Text style={styles.infoDescription}>
            You can continue to your dashboard. We will
            update your verification status after the review.
          </Text>
        </View>
      </View>

      {/* =========================
          CTA
      ========================= */}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          router.replace("/(nurse)/dashboard")
        }
      >
        <Text style={styles.buttonText}>
          Go to Dashboard
        </Text>

        <Text style={styles.buttonArrow}>→</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Your profile will only be visible to patients after
        verification is completed.
      </Text>
    </ScrollView>
  );
}

// =====================================================
// PROCESS STEP
// =====================================================

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}

function ProcessStep({
  number,
  title,
  description,
  completed = false,
  active = false,
}: ProcessStepProps) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepIndicatorContainer}>
        <View
          style={[
            styles.stepCircle,
            completed && styles.stepCircleCompleted,
            active && styles.stepCircleActive,
          ]}
        >
          <Text
            style={[
              styles.stepNumber,
              completed && styles.stepNumberCompleted,
              active && styles.stepNumberActive,
            ]}
          >
            {completed ? "✓" : number}
          </Text>
        </View>

        {number !== "3" && (
          <View
            style={[
              styles.stepLine,
              completed && styles.stepLineCompleted,
            ]}
          />
        )}
      </View>

      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>
          {title}
        </Text>

        <Text style={styles.stepDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 24,
    paddingTop: 52,
    paddingBottom: 36,
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
  // HEADER
  // =========================

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  iconWrapper: {
    position: "relative",
    marginBottom: 18,
  },

  iconContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 7,
    borderColor: COLORS.primarySoft,
  },

  icon: {
    fontSize: 34,
  },

  statusDot: {
    position: "absolute",
    right: -1,
    bottom: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.warning,
    borderWidth: 3,
    borderColor: COLORS.background,
  },

  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    letterSpacing: -0.5,
  },

  description: {
    maxWidth: 350,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 9,
  },

  // =========================
  // STATUS
  // =========================

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  statusIconText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "900",
  },

  statusContent: {
    flex: 1,
    marginLeft: 13,
  },

  statusLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: COLORS.textMuted,
  },

  statusValue: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginTop: 3,
  },

  statusDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  // =========================
  // PROCESS
  // =========================

  processCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    marginBottom: 12,
  },

  processTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 17,
  },

  stepRow: {
    flexDirection: "row",
    minHeight: 58,
  },

  stepIndicatorContainer: {
    width: 32,
    alignItems: "center",
  },

  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircleCompleted: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  stepCircleActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },

  stepNumber: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.textMuted,
  },

  stepNumberCompleted: {
    color: COLORS.white,
    fontSize: 15,
  },

  stepNumberActive: {
    color: COLORS.primaryDark,
  },

  stepLine: {
    flex: 1,
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 3,
  },

  stepLineCompleted: {
    backgroundColor: COLORS.primary,
  },

  stepContent: {
    flex: 1,
    marginLeft: 10,
    paddingBottom: 13,
  },

  stepTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  stepDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // =========================
  // INFO
  // =========================

  infoCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },

  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  infoIconText: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.primaryDark,
  },

  infoContent: {
    flex: 1,
    marginLeft: 10,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },

  infoDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // =========================
  // BUTTON
  // =========================

  button: {
    height: 54,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  buttonArrow: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "700",
    marginLeft: 10,
  },

  footerText: {
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
});