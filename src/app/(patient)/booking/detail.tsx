import { router, useLocalSearchParams } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useBookingStore } from "@/store/booking-store";

export default function BookingDetailScreen() {
  const { bookingId } = useLocalSearchParams<{
    bookingId: string;
  }>();

  const booking = useBookingStore((state) =>
    state.getBookingById(bookingId),
  );

  const updateBookingStatus = useBookingStore(
    (state) => state.updateBookingStatus,
  );

  if (!booking) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>📋</Text>

        <Text style={styles.errorTitle}>
          Booking Not Found
        </Text>

        <Text style={styles.errorText}>
          This booking may no longer be available.
        </Text>

        <TouchableOpacity
          style={styles.backHomeButton}
          onPress={() =>
            router.replace("/(patient)/bookings")
          }
          activeOpacity={0.8}
        >
          <Text style={styles.backHomeText}>
            Back to My Bookings
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusLabel = () => {
    switch (booking.status) {
      case "pending":
        return "Waiting for Nurse";

      case "accepted":
        return "Booking Accepted";

      case "rejected":
        return "Booking Rejected";

      case "on_the_way":
        return "Nurse is on the Way";

      case "arrived":
        return "Nurse has Arrived";

      case "in_progress":
        return "Treatment in Progress";

      case "completed":
        return "Treatment Completed";

      case "cancelled":
        return "Booking Cancelled";

      default:
        return booking.status;
    }
  };

  const getStatusDescription = () => {
    switch (booking.status) {
      case "pending":
        return "Your booking request has been sent. Please wait for the nurse to respond.";

      case "accepted":
        return "The nurse has accepted your booking request.";

      case "on_the_way":
        return "The nurse is currently on the way to your location.";

      case "arrived":
        return "The nurse has arrived at your location.";

      case "in_progress":
        return "Your nursing service is currently in progress.";

      case "completed":
        return "This nursing service has been completed.";

      case "rejected":
        return "Unfortunately, the nurse rejected this booking request.";

      case "cancelled":
        return "This booking has been cancelled.";

      default:
        return "";
    }
  };

  const isCancelled =
    booking.status === "cancelled" ||
    booking.status === "rejected";

  const canCancel =
    booking.status === "pending" ||
    booking.status === "accepted";

  const handleCancelBooking = () => {
    updateBookingStatus(
      booking.id,
      "cancelled",
    );
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
          Booking Detail
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Status */}
        <View
          style={[
            styles.statusCard,
            isCancelled &&
              styles.statusCardDanger,
          ]}
        >
          <View style={styles.statusIcon}>
            <Text style={styles.statusIconText}>
              {booking.status === "completed"
                ? "✓"
                : isCancelled
                  ? "!"
                  : "⏳"}
            </Text>
          </View>

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>
              {getStatusLabel()}
            </Text>

            <Text style={styles.statusDescription}>
              {getStatusDescription()}
            </Text>
          </View>
        </View>

        {/* Nurse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Nurse
          </Text>

          <View style={styles.nurseCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {booking.nurse.name
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>

            <View style={styles.nurseInfo}>
              <View style={styles.nurseNameRow}>
                <Text style={styles.nurseName}>
                  {booking.nurse.name}
                </Text>

                {booking.nurse.verified && (
                  <Text style={styles.verified}>
                    ✓
                  </Text>
                )}
              </View>

              <Text style={styles.specialization}>
                {booking.nurse.specialization}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.rating}>
                  ⭐ {booking.nurse.rating}
                </Text>

                <Text style={styles.reviewCount}>
                  ({booking.nurse.reviewCount} reviews)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Service Details
          </Text>

          <View style={styles.detailCard}>
            <DetailRow
              icon="🩺"
              label="Service"
              value={booking.service}
            />

            <View style={styles.detailDivider} />

            <DetailRow
              icon="📅"
              label="Date"
              value={booking.date}
            />

            <View style={styles.detailDivider} />

            <DetailRow
              icon="🕐"
              label="Time"
              value={booking.time}
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Service Location
          </Text>

          <View style={styles.detailCard}>
            <DetailRow
              icon="📍"
              label="Address"
              value={booking.address}
            />
          </View>
        </View>

        {/* Notes */}
        {booking.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Notes
            </Text>

            <View style={styles.notesCard}>
              <Text style={styles.notesText}>
                {booking.notes}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Booking Progress
          </Text>

          <View style={styles.timeline}>
            <TimelineItem
              title="Request Sent"
              description="Your booking request was created."
              active
              completed={booking.status !== "pending"}
            />

            <TimelineItem
              title="Accepted by Nurse"
              description="Waiting for nurse confirmation."
              active={booking.status !== "pending" &&
                booking.status !== "rejected" &&
                booking.status !== "cancelled"}
              completed={[
                "on_the_way",
                "arrived",
                "in_progress",
                "completed",
              ].includes(booking.status)}
            />

            <TimelineItem
              title="Nurse on the Way"
              description="Nurse is travelling to your location."
              active={[
                "on_the_way",
                "arrived",
                "in_progress",
                "completed",
              ].includes(booking.status)}
              completed={[
                "arrived",
                "in_progress",
                "completed",
              ].includes(booking.status)}
            />

            <TimelineItem
              title="Nurse Arrived"
              description="Nurse has arrived at your location."
              active={[
                "arrived",
                "in_progress",
                "completed",
              ].includes(booking.status)}
              completed={[
                "in_progress",
                "completed",
              ].includes(booking.status)}
            />

            <TimelineItem
              title="Treatment in Progress"
              description="Nursing service is being provided."
              active={[
                "in_progress",
                "completed",
              ].includes(booking.status)}
              completed={booking.status === "completed"}
            />

            <TimelineItem
              title="Completed"
              description="Nursing service has been completed."
              active={booking.status === "completed"}
              completed={booking.status === "completed"}
              last
            />
          </View>
        </View>

        {/* Booking Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Booking Information
          </Text>

          <View style={styles.detailCard}>
            <DetailRow
              icon="🔖"
              label="Booking ID"
              value={booking.id}
            />

            <View style={styles.detailDivider} />

            <DetailRow
              icon="🕐"
              label="Created"
              value={new Date(
                booking.createdAt,
              ).toLocaleString("id-ID")}
            />
          </View>
        </View>

        {/* Cancel */}
        {canCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelBooking}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>
              Cancel Booking
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------- */

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailIcon}>
        {icon}
      </Text>

      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>
          {label}
        </Text>

        <Text style={styles.detailValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function TimelineItem({
  title,
  description,
  active,
  completed,
  last = false,
}: {
  title: string;
  description: string;
  active: boolean;
  completed: boolean;
  last?: boolean;
}) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineIndicatorColumn}>
        <View
          style={[
            styles.timelineDot,
            active && styles.timelineDotActive,
          ]}
        >
          {completed && (
            <Text style={styles.timelineCheck}>
              ✓
            </Text>
          )}
        </View>

        {!last && (
          <View
            style={[
              styles.timelineLine,
              completed &&
                styles.timelineLineActive,
            ]}
          />
        )}
      </View>

      <View style={styles.timelineContent}>
        <Text
          style={[
            styles.timelineTitle,
            active &&
              styles.timelineTitleActive,
          ]}
        >
          {title}
        </Text>

        <Text style={styles.timelineDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------- */

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

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFF8E5",
    marginBottom: 24,
  },

  statusCardDanger: {
    backgroundColor: "#FDEAEA",
  },

  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  statusIconText: {
    fontSize: 22,
    fontWeight: "800",
  },

  statusContent: {
    flex: 1,
    marginLeft: 12,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
  },

  statusDescription: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: "#666666",
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 10,
  },

  nurseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 18,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2F80ED",
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 14,
  },

  nurseNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nurseName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111111",
  },

  verified: {
    marginLeft: 6,
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

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  rating: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333333",
  },

  reviewCount: {
    marginLeft: 5,
    fontSize: 12,
    color: "#999999",
  },

  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  detailIcon: {
    width: 32,
    fontSize: 18,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 3,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    lineHeight: 20,
  },

  detailDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 14,
  },

  notesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
  },

  notesText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#555555",
  },

  timeline: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
  },

  timelineItem: {
    flexDirection: "row",
    minHeight: 72,
  },

  timelineIndicatorColumn: {
    width: 28,
    alignItems: "center",
  },

  timelineDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D8D8D8",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  timelineDotActive: {
    borderColor: "#2F80ED",
    backgroundColor: "#2F80ED",
  },

  timelineCheck: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 3,
  },

  timelineLineActive: {
    backgroundColor: "#2F80ED",
  },

  timelineContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 18,
  },

  timelineTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#999999",
  },

  timelineTitleActive: {
    color: "#111111",
  },

  timelineDescription: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 18,
    color: "#999999",
  },

  cancelButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E74C3C",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E74C3C",
  },

  bottomSpace: {
    height: 20,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#F8F9FA",
  },

  errorIcon: {
    fontSize: 50,
  },

  errorTitle: {
    marginTop: 16,
    fontSize: 21,
    fontWeight: "800",
    color: "#111111",
  },

  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
  },

  backHomeButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#111111",
  },

  backHomeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});