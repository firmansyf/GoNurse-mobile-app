import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function NurseDashboardScreen() {
  const handleOpenBookings = () => {
    router.push("/(nurse)/bookings");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello, Nurse 👋
      </Text>

      <Text style={styles.subtitle}>
        Welcome to your GoNurse dashboard.
      </Text>

      <View style={styles.status}>
        <Text>🟢 Available</Text>
      </View>

      <TouchableOpacity
        style={styles.bookingButton}
        onPress={handleOpenBookings}
        activeOpacity={0.8}
      >
        <View>
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
    paddingTop: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },

  status: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  bookingButton: {
    marginTop: 24,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bookingTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  bookingSubtitle: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 4,
  },

  arrow: {
    color: "#fff",
    fontSize: 24,
  },
});