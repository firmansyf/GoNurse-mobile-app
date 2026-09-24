import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { COLORS } from "@/constants/colors";

export default function NurseDashboardScreen() {
  const handleOpenBookings = () => {
    router.push("/(nurse)/bookings");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <Text style={styles.greeting}>
          Hello, Nurse 👋
        </Text>

        <Text style={styles.subtitle}>
          Welcome to your GoNurse dashboard.
        </Text>
      </View>

      {/* Availability */}
      <View style={styles.statusCard}>
        <View style={styles.statusIndicator} />

        <View style={styles.statusContent}>
          <Text style={styles.statusTitle}>
            You're available
          </Text>

          <Text style={styles.statusSubtitle}>
            Patients can send you booking requests.
          </Text>
        </View>
      </View>

      {/* Booking */}
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={handleOpenBookings}
        activeOpacity={0.8}
      >
        <View style={styles.bookingIcon}>
          <Text style={styles.bookingIconText}>
            📋
          </Text>
        </View>

        <View style={styles.bookingContent}>
          <Text style={styles.bookingTitle}>
            My Bookings
          </Text>

          <Text style={styles.bookingSubtitle}>
            View and manage booking requests
          </Text>
        </View>

        <Text style={styles.arrow}>
          →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 70,
    backgroundColor: COLORS.background,
  },

  greeting: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },

  statusCard: {
    marginTop: 32,
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
  },

  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },

  statusContent: {
    flex: 1,
    marginLeft: 12,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  statusSubtitle: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
  },

  bookingCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  bookingIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  bookingIconText: {
    fontSize: 24,
  },

  bookingContent: {
    flex: 1,
    marginLeft: 14,
  },

  bookingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  bookingSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  arrow: {
    marginLeft: 10,
    fontSize: 24,
    color: COLORS.primary,
  },
});