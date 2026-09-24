import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

export default function ChooseRoleScreen() {
  return (
    <View style={styles.container}>
      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>
            ←
          </Text>

          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.logo}>
          GoNurse
        </Text>
      </View>

      {/* =========================
          CONTENT
      ========================= */}

      <View style={styles.content}>
        {/* Intro */}

        <View style={styles.intro}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              👥
            </Text>
          </View>

          <Text style={styles.title}>
            How will you use GoNurse?
          </Text>

          <Text style={styles.subtitle}>
            Choose the account type that best
            describes you.
          </Text>
        </View>

        {/* Roles */}

        <View style={styles.roles}>
          {/* Patient */}

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(
                "/(auth)/patient-profile",
              )
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.roleIconContainer,
                styles.patientIconContainer,
              ]}
            >
              <Text style={styles.roleIcon}>
                👤
              </Text>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>
                  Patient
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Care
                  </Text>
                </View>
              </View>

              <Text style={styles.cardDescription}>
                Find and book trusted nurses near
                you.
              </Text>

              <Text style={styles.actionText}>
                Continue as Patient →
              </Text>
            </View>
          </TouchableOpacity>

          {/* Nurse */}

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(
                "/(auth)/nurse-profile",
              )
            }
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.roleIconContainer,
                styles.nurseIconContainer,
              ]}
            >
              <Text style={styles.roleIcon}>
                🧑‍⚕️
              </Text>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>
                  Nurse
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Professional
                  </Text>
                </View>
              </View>

              <Text style={styles.cardDescription}>
                Provide professional nursing
                services.
              </Text>

              <Text style={styles.actionText}>
                Continue as Nurse →
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* =========================
          FOOTER
      ========================= */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 25,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },

  backIcon: {
    fontSize: 20,
    color: COLORS.text,
    marginRight: 5,
  },

  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primaryDark,
    letterSpacing: -0.6,
  },

  /* =========================
     CONTENT
  ========================= */

  content: {
    flex: 1,
    justifyContent: "center",
  },

  /* =========================
     INTRO
  ========================= */

  intro: {
    marginBottom: 30,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  icon: {
    fontSize: 23,
  },

  title: {
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    marginTop: 9,
    maxWidth: 340,
  },

  /* =========================
     ROLES
  ========================= */

  roles: {
    gap: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 20,

    padding: 16,

    minHeight: 145,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  roleIconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  patientIconContainer: {
    backgroundColor: COLORS.primaryLight,
  },

  nurseIconContainer: {
    backgroundColor: "#E8F5E9",
  },

  roleIcon: {
    fontSize: 29,
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  badge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  cardDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 6,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginTop: 9,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
  },

  footerIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  footerCheck: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  footerText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.textMuted,
  },
});