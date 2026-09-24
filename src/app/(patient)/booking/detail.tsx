import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
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
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIcon}>📋</Text>
        </View>

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
          activeOpacity={0.85}
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

  const getStatusTheme = () => {
    switch (booking.status) {
      case "accepted":
      case "completed":
        return {
          background: COLORS.primarySoft,
          iconBackground: COLORS.primaryLight,
          icon: "✓",
          iconColor: COLORS.primaryDark,
        };

      case "rejected":
      case "cancelled":
        return {
          background: "#FEF2F2",
          iconBackground: "#FEE2E2",
          icon: "!",
          iconColor: COLORS.danger,
        };

      case "on_the_way":
      case "arrived":
      case "in_progress":
        return {
          background: "#EFF6FF",
          iconBackground: "#DBEAFE",
          icon: "→",
          iconColor: COLORS?.info,
        };

      default:
        return {
          background: "#FFFBEB",
          iconBackground: "#FEF3C7",
          icon: "⏳",
          iconColor: COLORS.warning,
        };
    }
  };

  const statusTheme = getStatusTheme();

  return (
    <View style={styles.container}>
      {/* =========================
          Header
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            Booking Detail
          </Text>

          <Text style={styles.headerSubtitle}>
            #{booking.id}
          </Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =========================
            Status
        ========================= */}

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor:
                statusTheme.background,
            },
          ]}
        >
          <View
            style={[
              styles.statusIconContainer,
              {
                backgroundColor:
                  statusTheme.iconBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.statusIconText,
                {
                  color: statusTheme.iconColor,
                },
              ]}
            >
              {statusTheme.icon}
            </Text>
          </View>

          <View style={styles.statusContent}>
            <View style={styles.statusTitleRow}>
              <Text style={styles.statusTitle}>
                {getStatusLabel()}
              </Text>
            </View>

            <Text style={styles.statusDescription}>
              {getStatusDescription()}
            </Text>
          </View>
        </View>

        {/* =========================
            Nurse
        ========================= */}

        <View style={styles.section}>
          <SectionHeader
            title="Nurse"
            subtitle="Your assigned healthcare professional"
          />

          <View style={styles.nurseCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  👩‍⚕️
                </Text>
              </View>

              {booking.nurse.verified && (
                <View style={styles.avatarVerified}>
                  <Text style={styles.avatarVerifiedText}>
                    ✓
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.nurseInfo}>
              <View style={styles.nurseNameRow}>
                <Text
                  style={styles.nurseName}
                  numberOfLines={1}
                >
                  {booking.nurse.name}
                </Text>

                {booking.nurse.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text
                      style={styles.verifiedIcon}
                    >
                      ✓
                    </Text>

                    <Text
                      style={styles.verifiedText}
                    >
                      Verified
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.specialization}>
                {booking.nurse.specialization}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.star}>
                  ★
                </Text>

                <Text style={styles.rating}>
                  {booking.nurse.rating.toFixed(1)}
                </Text>

                <Text style={styles.reviewCount}>
                  ({booking.nurse.reviewCount} reviews)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* =========================
            Service
        ========================= */}

        <View style={styles.section}>
          <SectionHeader
            title="Service Details"
            subtitle="Information about your booking"
          />

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

        {/* =========================
            Location
        ========================= */}

        <View style={styles.section}>
          <SectionHeader
            title="Service Location"
            subtitle="Where the nurse will provide care"
          />

          <View style={styles.locationCard}>
            <View style={styles.locationIconContainer}>
              <Text style={styles.locationIcon}>
                📍
              </Text>
            </View>

            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>
                SERVICE ADDRESS
              </Text>

              <Text style={styles.locationValue}>
                {booking.address}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            Notes
        ========================= */}

        {booking.notes ? (
          <View style={styles.section}>
            <SectionHeader
              title="Notes"
              subtitle="Additional information"
            />

            <View style={styles.notesCard}>
              <View style={styles.notesIconContainer}>
                <Text style={styles.notesIcon}>
                  📝
                </Text>
              </View>

              <Text style={styles.notesText}>
                {booking.notes}
              </Text>
            </View>
          </View>
        ) : null}

        {/* =========================
            Timeline
        ========================= */}

        <View style={styles.section}>
          <SectionHeader
            title="Booking Progress"
            subtitle="Follow the progress of your care"
          />

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
              active={
                booking.status !== "pending" &&
                booking.status !== "rejected" &&
                booking.status !== "cancelled"
              }
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
              completed={
                booking.status === "completed"
              }
            />

            <TimelineItem
              title="Completed"
              description="Nursing service has been completed."
              active={
                booking.status === "completed"
              }
              completed={
                booking.status === "completed"
              }
              last
            />
          </View>
        </View>

        {/* =========================
            Booking Information
        ========================= */}

        <View style={styles.section}>
          <SectionHeader
            title="Booking Information"
            subtitle="Reference details"
          />

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

        {/* =========================
            Cancel
        ========================= */}

        {canCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelBooking}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelIcon}>
              ×
            </Text>

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
/* Section Header */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Text style={styles.sectionSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail Row */
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
      <View style={styles.detailIconContainer}>
        <Text style={styles.detailIcon}>
          {icon}
        </Text>
      </View>

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

/* -------------------------------------------------------------------------- */
/* Timeline */
/* -------------------------------------------------------------------------- */

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
    backgroundColor: COLORS.background,
  },

  /* Header */

  header: {
    height: 82,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 30,
    lineHeight: 32,
    color: COLORS.primaryDark,
    marginTop: -2,
  },

  headerCenter: {
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  headerSubtitle: {
    maxWidth: 170,
    marginTop: 2,
    fontSize: 9,
    color: COLORS.textMuted,
  },

  headerSpacer: {
    width: 40,
  },

  /* Content */

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* Status */

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginBottom: 24,
  },

  statusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  statusIconText: {
    fontSize: 22,
    fontWeight: "800",
  },

  statusContent: {
    flex: 1,
    marginLeft: 13,
  },

  statusTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  statusDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },

  /* Sections */

  section: {
    marginBottom: 23,
  },

  sectionHeader: {
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: COLORS.textMuted,
  },

  /* Nurse */

  nurseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 7,
    elevation: 2,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 19,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 29,
  },

  avatarVerified: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarVerifiedText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 13,
    minWidth: 0,
  },

  nurseNameRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 21,
  },

  nurseName: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
  },

  verifiedIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 9,
    lineHeight: 14,
    fontWeight: "800",
    marginRight: 4,
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  specialization: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  star: {
    color: "#F59E0B",
    fontSize: 12,
    marginRight: 4,
  },

  rating: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  reviewCount: {
    marginLeft: 5,
    fontSize: 10,
    color: COLORS.textMuted,
  },

  /* Detail */

  detailCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  detailIcon: {
    fontSize: 17,
  },

  detailContent: {
    flex: 1,
    marginLeft: 11,
  },

  detailLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: 0.4,
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
    color: COLORS.text,
  },

  detailDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  /* Location */

  locationCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  locationIcon: {
    fontSize: 18,
  },

  locationContent: {
    flex: 1,
    marginLeft: 11,
  },

  locationLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  locationValue: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600",
    color: COLORS.text,
  },

  /* Notes */

  notesCard: {
    flexDirection: "row",
    backgroundColor: COLORS.primarySoft,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },

  notesIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  notesIcon: {
    fontSize: 17,
  },

  notesText: {
    flex: 1,
    marginLeft: 11,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.text,
  },

  /* Timeline */

  timeline: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  timelineDotActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },

  timelineCheck: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.border,
    marginVertical: 3,
  },

  timelineLineActive: {
    backgroundColor: COLORS.primary,
  },

  timelineContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 18,
  },

  timelineTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textMuted,
  },

  timelineTitleActive: {
    color: COLORS.text,
  },

  timelineDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.textMuted,
  },

  /* Cancel */

  cancelButton: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.danger,
    backgroundColor: "#FEF2F2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  cancelIcon: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.danger,
    marginRight: 7,
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.danger,
  },

  bottomSpace: {
    height: 20,
  },

  /* Error */

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: COLORS.background,
  },

  errorIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  errorIcon: {
    fontSize: 42,
  },

  errorTitle: {
    marginTop: 18,
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
  },

  errorText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  backHomeButton: {
    marginTop: 24,
    minWidth: 190,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  backHomeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});