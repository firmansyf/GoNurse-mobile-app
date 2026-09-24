import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useBookingStore } from "@/store/booking-store";

export default function NurseBookingDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const booking = useBookingStore((state) =>
    state.getBookingById(id),
  );

  const updateBookingStatus =
    useBookingStore(
      (state) => state.updateBookingStatus,
    );

  if (!booking) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>
          ⚠️
        </Text>

        <Text style={styles.errorTitle}>
          Booking not found
        </Text>

        <Text style={styles.errorText}>
          This booking may no longer be
          available.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleStartTrip = () => {
    Alert.alert(
      "Start Trip",
      "Are you ready to travel to the patient's location?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Start Trip",
          onPress: () => {
            updateBookingStatus(
              booking.id,
              "on_the_way",
            );
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.headerBackText}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Booking Detail
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        {/* Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>
            BOOKING STATUS
          </Text>

          <View style={styles.statusRow}>
            <View style={styles.statusDot} />

            <Text style={styles.statusText}>
              {getStatusLabel(
                booking.status,
              )}
            </Text>
          </View>
        </View>

        {/* Patient */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Patient
          </Text>

          <View style={styles.patientRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                👤
              </Text>
            </View>

            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>
                Patient
              </Text>

              <Text style={styles.bookingId}>
                #{booking.id}
              </Text>
            </View>
          </View>
        </View>

        {/* Service */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Service
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>
              🩺
            </Text>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Service
              </Text>

              <Text style={styles.detailValue}>
                {booking.service}
              </Text>
            </View>
          </View>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Schedule
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>
              📅
            </Text>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Date
              </Text>

              <Text style={styles.detailValue}>
                {booking.date}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>
              🕐
            </Text>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Time
              </Text>

              <Text style={styles.detailValue}>
                {booking.time}
              </Text>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Patient Location
          </Text>

          <View style={styles.locationBox}>
            <Text style={styles.locationIcon}>
              📍
            </Text>

            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>
                Address
              </Text>

              <Text style={styles.locationText}>
                {booking.address}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.mapButton}
            activeOpacity={0.8}
          >
            <Text style={styles.mapButtonText}>
              View Location
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notes */}
        {booking.notes ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Patient Notes
            </Text>

            <View style={styles.notesBox}>
              <Text style={styles.notesText}>
                {booking.notes}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Booking Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Booking Information
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>
              Booking ID
            </Text>

            <Text style={styles.metaValue}>
              {booking.id}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>
              Created
            </Text>

            <Text style={styles.metaValue}>
              {formatDate(
                booking.createdAt,
              )}
            </Text>
          </View>
        </View>

        {/* Action */}
        {booking.status === "accepted" && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartTrip}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Start Trip
            </Text>
          </TouchableOpacity>
        )}

        {booking.status === "on_the_way" && (
          <View style={styles.waitingCard}>
            <Text style={styles.waitingIcon}>
              🚗
            </Text>

            <Text style={styles.waitingTitle}>
              You're on the way
            </Text>

            <Text style={styles.waitingText}>
              Travel to the patient's location.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* =====================================================
   STATUS LABEL
===================================================== */

function getStatusLabel(
  status: string,
) {
  switch (status) {
    case "pending":
      return "Pending";

    case "accepted":
      return "Accepted";

    case "on_the_way":
      return "On The Way";

    case "arrived":
      return "Arrived";

    case "in_progress":
      return "In Progress";

    case "completed":
      return "Completed";

    case "rejected":
      return "Rejected";

    case "cancelled":
      return "Cancelled";

    default:
      return status;
  }
}

/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
  value: string,
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(
    "id-ID",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  errorIcon: {
    fontSize: 40,
  },

  errorTitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "800",
  },

  errorText: {
    marginTop: 6,
    color: "#777",
    textAlign: "center",
  },

  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  header: {
    height: 100,
    paddingTop: 45,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  headerBackText: {
    fontSize: 22,
    color: "#333",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  statusCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#fff",
    marginBottom: 14,
  },

  statusLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111",
    marginRight: 8,
  },

  statusText: {
    fontSize: 18,
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 24,
  },

  patientInfo: {
    marginLeft: 12,
  },

  patientName: {
    fontSize: 16,
    fontWeight: "700",
  },

  bookingId: {
    marginTop: 3,
    fontSize: 12,
    color: "#888",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  detailIcon: {
    width: 32,
    fontSize: 20,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 11,
    color: "#999",
  },

  detailValue: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  locationBox: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
  },

  locationIcon: {
    fontSize: 22,
  },

  locationContent: {
    flex: 1,
    marginLeft: 10,
  },

  locationLabel: {
    fontSize: 11,
    color: "#999",
  },

  locationText: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  mapButton: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  mapButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },

  notesBox: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
  },

  notesText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#444",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 20,
  },

  metaLabel: {
    fontSize: 13,
    color: "#888",
  },

  metaValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  waitingCard: {
    padding: 24,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  waitingIcon: {
    fontSize: 36,
  },

  waitingTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "800",
  },

  waitingText: {
    marginTop: 5,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
});