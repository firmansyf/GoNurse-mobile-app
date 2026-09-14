import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useBookingStore } from "@/store/booking-store";

export default function BookingsScreen() {
  const bookings = useBookingStore(
    (state) => state.bookings,
  );

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Waiting for Nurse";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "on_the_way":
        return "Nurse on the way";
      case "arrived":
        return "Nurse has arrived";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "accepted":
      case "completed":
        return styles.statusSuccess;

      case "rejected":
      case "cancelled":
        return styles.statusDanger;

      case "in_progress":
      case "on_the_way":
      case "arrived":
        return styles.statusInfo;

      default:
        return styles.statusPending;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          My Bookings
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {bookings.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
            </View>

            <Text style={styles.emptyTitle}>
              No Bookings Yet
            </Text>

            <Text style={styles.emptyText}>
              You don't have any nurse bookings yet.
              Find a nurse near you and make your
              first booking.
            </Text>

            <TouchableOpacity
              style={styles.findButton}
              onPress={() =>
                router.push("/(patient)/map")
              }
              activeOpacity={0.8}
            >
              <Text style={styles.findButtonText}>
                Find a Nurse
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>
                Your Bookings
              </Text>

              <Text style={styles.summaryCount}>
                {bookings.length}{" "}
                {bookings.length === 1
                  ? "booking"
                  : "bookings"}
              </Text>
            </View>

            {bookings.map((booking) => (
              <TouchableOpacity
                key={booking.id}
                style={styles.bookingCard}
                onPress={() =>
                  router.push({
                    pathname:
                      "/(patient)/booking/detail",
                    params: {
                      bookingId: booking.id,
                    },
                  })
                }
                activeOpacity={0.8}
              >
                {/* Nurse */}
                <View style={styles.nurseRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {booking.nurse.name
                        .charAt(0)
                        .toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.nurseInfo}>
                    <View
                      style={styles.nurseNameRow}
                    >
                      <Text
                        style={styles.nurseName}
                        numberOfLines={1}
                      >
                        {booking.nurse.name}
                      </Text>

                      {booking.nurse.verified && (
                        <Text
                          style={styles.verified}
                        >
                          ✓
                        </Text>
                      )}
                    </View>

                    <Text
                      style={styles.specialization}
                    >
                      {booking.nurse.specialization}
                    </Text>
                  </View>

                  <Text style={styles.arrow}>
                    ›
                  </Text>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Service */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>
                    🩺
                  </Text>

                  <View>
                    <Text style={styles.infoLabel}>
                      Service
                    </Text>

                    <Text style={styles.infoValue}>
                      {booking.service}
                    </Text>
                  </View>
                </View>

                {/* Schedule */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>
                    📅
                  </Text>

                  <View>
                    <Text style={styles.infoLabel}>
                      Schedule
                    </Text>

                    <Text style={styles.infoValue}>
                      {booking.date} • {booking.time}
                    </Text>
                  </View>
                </View>

                {/* Address */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>
                    📍
                  </Text>

                  <View style={styles.addressContainer}>
                    <Text style={styles.infoLabel}>
                      Address
                    </Text>

                    <Text
                      style={styles.infoValue}
                      numberOfLines={2}
                    >
                      {booking.address}
                    </Text>
                  </View>
                </View>

                {/* Status */}
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      getStatusStyle(
                        booking.status,
                      ),
                    ]}
                  >
                    <Text
                      style={styles.statusText}
                    >
                      {getStatusLabel(
                        booking.status,
                      )}
                    </Text>
                  </View>

                  <Text style={styles.viewText}>
                    View Details →
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  header: {
    height: 100,
    paddingTop: 48,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 30,
    lineHeight: 30,
    color: "#333333",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  summary: {
    marginBottom: 16,
  },

  summaryTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111111",
  },

  summaryCount: {
    marginTop: 4,
    fontSize: 14,
    color: "#777777",
  },

  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  nurseRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2F80ED",
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 12,
  },

  nurseNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nurseName: {
    maxWidth: "85%",
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },

  verified: {
    marginLeft: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#2F80ED",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 18,
    fontSize: 11,
    fontWeight: "800",
  },

  specialization: {
    marginTop: 4,
    fontSize: 13,
    color: "#777777",
  },

  arrow: {
    fontSize: 28,
    color: "#AAAAAA",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  infoIcon: {
    width: 30,
    fontSize: 18,
  },

  infoLabel: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  addressContainer: {
    flex: 1,
  },

  statusRow: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusPending: {
    backgroundColor: "#FFF4D6",
  },

  statusSuccess: {
    backgroundColor: "#E7F7ED",
  },

  statusDanger: {
    backgroundColor: "#FDEAEA",
  },

  statusInfo: {
    backgroundColor: "#EAF4FF",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#333333",
  },

  viewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2F80ED",
  },

  empty: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  emptyIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 21,
    fontWeight: "800",
    color: "#111111",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#777777",
    textAlign: "center",
  },

  findButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#111111",
  },

  findButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});