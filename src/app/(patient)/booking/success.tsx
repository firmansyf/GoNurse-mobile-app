import { useLocalSearchParams, useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BookingSuccessScreen() {
  const router = useRouter();

  const { bookingId } =
    useLocalSearchParams<{
      bookingId: string;
    }>();

  const handleViewBookings = () => {
    router.replace("/(patient)/bookings");
  };

  const handleBackHome = () => {
    router.replace("/(patient)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            ✓
          </Text>
        </View>

        <Text style={styles.title}>
          Booking Request Sent
        </Text>

        <Text style={styles.description}>
          Your booking request has been sent
          successfully. The nurse will review
          your request and respond soon.
        </Text>

        <View style={styles.bookingIdCard}>
          <Text style={styles.bookingIdLabel}>
            Booking ID
          </Text>

          <Text style={styles.bookingId}>
            {bookingId}
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              Pending
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleViewBookings}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            View My Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleBackHome}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  icon: {
    color: "#FFFFFF",
    fontSize: 44,
    fontWeight: "700",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
    color: "#666666",
    textAlign: "center",
  },

  bookingIdCard: {
    width: "100%",
    marginTop: 28,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
  },

  bookingIdLabel: {
    fontSize: 12,
    color: "#888888",
  },

  bookingId: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
  },

  statusBadge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#EDEDED",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
  },

  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 10,
  },

  primaryButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "700",
  },
});