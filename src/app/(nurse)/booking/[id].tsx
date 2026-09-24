import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useBookingStore } from "@/store/booking-store";
import type { BookingStatus } from "@/types/booking";

export default function NurseBookingDetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const booking = useBookingStore((state) =>
    state.getBookingById(id),
  );

  const updateBookingStatus = useBookingStore(
    (state) => state.updateBookingStatus,
  );

  const [isStartingTrip, setIsStartingTrip] =
    useState(false);

  if (!booking) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorIconContainer}>
          <Text style={styles.errorIcon}>!</Text>
        </View>

        <Text style={styles.errorTitle}>
          Booking not found
        </Text>

        <Text style={styles.errorText}>
          This booking may no longer be available.
        </Text>

        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.errorButtonText}>
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
            setIsStartingTrip(true);

            updateBookingStatus(
              booking.id,
              "on_the_way",
            );

            setIsStartingTrip(false);
          },
        },
      ],
    );
  };

  const statusTheme = getStatusTheme(
    booking.status,
  );

  return (
    <View style={styles.container}>
      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBack}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.headerBackText}>‹</Text>
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
        {/* =========================
            STATUS HERO
        ========================= */}

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor:
                statusTheme.background,
              borderColor: statusTheme.border,
            },
          ]}
        >
          <View style={styles.statusTopRow}>
            <View
              style={[
                styles.statusIcon,
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
                    color: statusTheme.color,
                  },
                ]}
              >
                {statusTheme.icon}
              </Text>
            </View>

            <View style={styles.statusContent}>
              <Text style={styles.statusLabel}>
                BOOKING STATUS
              </Text>

              <Text
                style={[
                  styles.statusText,
                  {
                    color: statusTheme.color,
                  },
                ]}
              >
                {getStatusLabel(booking.status)}
              </Text>
            </View>
          </View>

          <Text style={styles.statusDescription}>
            {getStatusDescription(booking.status)}
          </Text>
        </View>

        {/* =========================
            PATIENT
        ========================= */}

        <SectionTitle title="Patient" />

        <View style={styles.patientCard}>
          <View style={styles.patientAvatar}>
            <Text style={styles.patientAvatarText}>
              👤
            </Text>
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>
              Patient
            </Text>

            <Text style={styles.bookingId}>
              Booking #{booking.id}
            </Text>
          </View>

          <View style={styles.patientBadge}>
            <Text style={styles.patientBadgeText}>
              Patient
            </Text>
          </View>
        </View>

        {/* =========================
            SERVICE
        ========================= */}

        <SectionTitle title="Service Details" />

        <View style={styles.card}>
          <DetailRow
            icon="🩺"
            label="Service"
            value={booking.service}
          />
        </View>

        {/* =========================
            SCHEDULE
        ========================= */}

        <SectionTitle title="Schedule" />

        <View style={styles.scheduleCard}>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleIcon}>
              <Text style={styles.scheduleIconText}>
                📅
              </Text>
            </View>

            <View style={styles.scheduleContent}>
              <Text style={styles.detailLabel}>
                DATE
              </Text>

              <Text style={styles.scheduleValue}>
                {booking.date}
              </Text>
            </View>
          </View>

          <View style={styles.scheduleDivider} />

          <View style={styles.scheduleItem}>
            <View style={styles.scheduleIcon}>
              <Text style={styles.scheduleIconText}>
                🕐
              </Text>
            </View>

            <View style={styles.scheduleContent}>
              <Text style={styles.detailLabel}>
                TIME
              </Text>

              <Text style={styles.scheduleValue}>
                {booking.time}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            LOCATION
        ========================= */}

        <SectionTitle title="Patient Location" />

        <View style={styles.card}>
          <View style={styles.locationBox}>
            <View style={styles.locationIcon}>
              <Text style={styles.locationIconText}>
                📍
              </Text>
            </View>

            <View style={styles.locationContent}>
              <Text style={styles.detailLabel}>
                SERVICE ADDRESS
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
            <Text style={styles.mapButtonIcon}>
              📍
            </Text>

            <Text style={styles.mapButtonText}>
              View Location
            </Text>

            <Text style={styles.mapButtonArrow}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* =========================
            NOTES
        ========================= */}

        {booking.notes ? (
          <>
            <SectionTitle title="Patient Notes" />

            <View style={styles.notesCard}>
              <View style={styles.notesHeader}>
                <View style={styles.notesIcon}>
                  <Text style={styles.notesIconText}>
                    i
                  </Text>
                </View>

                <Text style={styles.notesTitle}>
                  Additional Information
                </Text>
              </View>

              <Text style={styles.notesText}>
                {booking.notes}
              </Text>
            </View>
          </>
        ) : null}

        {/* =========================
            BOOKING INFORMATION
        ========================= */}

        <SectionTitle title="Booking Information" />

        <View style={styles.card}>
          <InfoRow
            label="Booking ID"
            value={booking.id}
          />

          <View style={styles.infoDivider} />

          <InfoRow
            label="Created"
            value={formatDate(booking.createdAt)}
          />
        </View>

        {/* =========================
            ACTION
        ========================= */}

        {booking.status === "accepted" && (
          <View style={styles.actionSection}>
            <View style={styles.actionHint}>
              <Text style={styles.actionHintIcon}>
                🚗
              </Text>

              <View style={styles.actionHintContent}>
                <Text style={styles.actionHintTitle}>
                  Ready to visit the patient?
                </Text>

                <Text
                  style={styles.actionHintDescription}
                >
                  Start your trip when you are ready to
                  travel to the patient's location.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartTrip}
              activeOpacity={0.8}
              disabled={isStartingTrip}
            >
              <Text style={styles.primaryButtonIcon}>
                🚗
              </Text>

              <Text style={styles.primaryButtonText}>
                {isStartingTrip
                  ? "Starting Trip..."
                  : "Start Trip"}
              </Text>

              {!isStartingTrip && (
                <Text style={styles.primaryButtonArrow}>
                  →
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* =========================
            ON THE WAY
        ========================= */}

        {booking.status === "on_the_way" && (
          <View style={styles.travelCard}>
            <View style={styles.travelIconContainer}>
              <Text style={styles.travelIcon}>🚗</Text>
            </View>

            <Text style={styles.travelTitle}>
              You're on the way
            </Text>

            <Text style={styles.travelText}>
              Travel safely to the patient's location.
              The booking will be updated when you arrive.
            </Text>

            <View style={styles.travelStatus}>
              <View style={styles.travelStatusDot} />

              <Text style={styles.travelStatusText}>
                Trip in progress
              </Text>
            </View>
          </View>
        )}

        {/* =========================
            ARRIVED
        ========================= */}

        {booking.status === "arrived" && (
          <View style={styles.activeStatusCard}>
            <View style={styles.activeStatusIcon}>
              <Text style={styles.activeStatusIconText}>
                ✓
              </Text>
            </View>

            <View style={styles.activeStatusContent}>
              <Text style={styles.activeStatusTitle}>
                You've arrived
              </Text>

              <Text style={styles.activeStatusText}>
                You are at the patient's location.
              </Text>
            </View>
          </View>
        )}

        {/* =========================
            IN PROGRESS
        ========================= */}

        {booking.status === "in_progress" && (
          <View style={styles.activeStatusCard}>
            <View style={styles.activeStatusIcon}>
              <Text style={styles.activeStatusIconText}>
                🩺
              </Text>
            </View>

            <View style={styles.activeStatusContent}>
              <Text style={styles.activeStatusTitle}>
                Service in progress
              </Text>

              <Text style={styles.activeStatusText}>
                You are currently providing care to the
                patient.
              </Text>
            </View>
          </View>
        )}

        {/* =========================
            COMPLETED
        ========================= */}

        {booking.status === "completed" && (
          <View style={styles.completedCard}>
            <View style={styles.completedIcon}>
              <Text style={styles.completedIconText}>
                ✓
              </Text>
            </View>

            <Text style={styles.completedTitle}>
              Booking completed
            </Text>

            <Text style={styles.completedText}>
              This nursing service has been completed
              successfully.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// =====================================================
// SECTION TITLE
// =====================================================

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <Text style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

// =====================================================
// DETAIL ROW
// =====================================================

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
      <View style={styles.detailIcon}>
        <Text style={styles.detailIconText}>
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

// =====================================================
// INFO ROW
// =====================================================

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text
        style={styles.infoValue}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

// =====================================================
// STATUS LABEL
// =====================================================

function getStatusLabel(
  status: BookingStatus,
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

// =====================================================
// STATUS DESCRIPTION
// =====================================================

function getStatusDescription(
  status: BookingStatus,
) {
  switch (status) {
    case "pending":
      return "This booking is waiting for your response.";

    case "accepted":
      return "You accepted this booking. Start your trip when you're ready.";

    case "on_the_way":
      return "You are currently travelling to the patient's location.";

    case "arrived":
      return "You have arrived at the patient's location.";

    case "in_progress":
      return "The nursing service is currently in progress.";

    case "completed":
      return "This booking has been completed successfully.";

    case "rejected":
      return "This booking was rejected.";

    case "cancelled":
      return "This booking has been cancelled.";

    default:
      return "Booking status information.";
  }
}

// =====================================================
// STATUS THEME
// =====================================================

function getStatusTheme(
  status: BookingStatus,
) {
  switch (status) {
    case "accepted":
      return {
        color: COLORS.primaryDark,
        background: COLORS.primarySoft,
        border: COLORS.primaryLight,
        iconBackground: COLORS.primaryLight,
        icon: "✓",
      };

    case "on_the_way":
      return {
        color: COLORS.info,
        background: "#EFF6FF",
        border: "#BFDBFE",
        iconBackground: "#DBEAFE",
        icon: "→",
      };

    case "arrived":
      return {
        color: COLORS.primaryDark,
        background: COLORS.primarySoft,
        border: COLORS.primaryLight,
        iconBackground: COLORS.primaryLight,
        icon: "✓",
      };

    case "in_progress":
      return {
        color: COLORS.info,
        background: "#EFF6FF",
        border: "#BFDBFE",
        iconBackground: "#DBEAFE",
        icon: "✚",
      };

    case "completed":
      return {
        color: COLORS.primaryDark,
        background: COLORS.primarySoft,
        border: COLORS.primaryLight,
        iconBackground: COLORS.primaryLight,
        icon: "✓",
      };

    case "rejected":
    case "cancelled":
      return {
        color: COLORS.danger,
        background: "#FEF2F2",
        border: "#FECACA",
        iconBackground: "#FEE2E2",
        icon: "!",
      };

    case "pending":
    default:
      return {
        color: COLORS.warning,
        background: "#FFFBEB",
        border: "#FDE68A",
        iconBackground: "#FEF3C7",
        icon: "!",
      };
  }
}

// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // =========================
  // ERROR
  // =========================

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },

  errorIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  errorIcon: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.danger,
  },

  errorTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },

  errorText: {
    marginTop: 7,
    color: COLORS.textSecondary,
    textAlign: "center",
    fontSize: 14,
  },

  errorButton: {
    marginTop: 24,
    paddingHorizontal: 26,
    height: 48,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  errorButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  // =========================
  // HEADER
  // =========================

  header: {
    height: 108,
    paddingTop: 45,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  headerBackText: {
    fontSize: 32,
    lineHeight: 32,
    color: COLORS.primaryDark,
    marginTop: -3,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  headerSpacer: {
    width: 40,
  },

  // =========================
  // CONTENT
  // =========================

  content: {
    padding: 20,
    paddingBottom: 48,
  },

  // =========================
  // STATUS
  // =========================

  statusCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 22,
  },

  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  statusIconText: {
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

  statusText: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 3,
  },

  statusDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 13,
  },

  // =========================
  // SECTION
  // =========================

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
  },

  // =========================
  // PATIENT
  // =========================

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  patientAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  patientAvatarText: {
    fontSize: 25,
  },

  patientInfo: {
    flex: 1,
    marginLeft: 13,
  },

  patientName: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },

  bookingId: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textMuted,
  },

  patientBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primarySoft,
  },

  patientBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  // =========================
  // CARD
  // =========================

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // =========================
  // DETAIL
  // =========================

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  detailIconText: {
    fontSize: 20,
  },

  detailContent: {
    flex: 1,
    marginLeft: 12,
  },

  detailLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    color: COLORS.textMuted,
  },

  detailValue: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  // =========================
  // SCHEDULE
  // =========================

  scheduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  scheduleItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  scheduleIconText: {
    fontSize: 18,
  },

  scheduleContent: {
    flex: 1,
    marginLeft: 9,
  },

  scheduleValue: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 4,
  },

  scheduleDivider: {
    width: 1,
    height: 42,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },

  // =========================
  // LOCATION
  // =========================

  locationBox: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 15,
    backgroundColor: COLORS.primarySoft,
  },

  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  locationIconText: {
    fontSize: 20,
  },

  locationContent: {
    flex: 1,
    marginLeft: 11,
  },

  locationText: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    color: COLORS.text,
  },

  mapButton: {
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  mapButtonIcon: {
    fontSize: 16,
    marginRight: 7,
  },

  mapButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },

  mapButtonArrow: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    marginLeft: 8,
  },

  // =========================
  // NOTES
  // =========================

  notesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  notesIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  notesIconText: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.primaryDark,
  },

  notesTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    marginLeft: 10,
  },

  notesText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },

  // =========================
  // BOOKING INFORMATION
  // =========================

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingVertical: 5,
  },

  infoLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  infoValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "right",
  },

  infoDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },

  // =========================
  // ACTION
  // =========================

  actionSection: {
    marginTop: 2,
  },

  actionHint: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    marginBottom: 12,
  },

  actionHintIcon: {
    fontSize: 24,
  },

  actionHintContent: {
    flex: 1,
    marginLeft: 10,
  },

  actionHintTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },

  actionHintDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  primaryButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  primaryButtonIcon: {
    fontSize: 19,
    marginRight: 8,
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

  // =========================
  // TRAVEL
  // =========================

  travelCard: {
    alignItems: "center",
    padding: 22,
    borderRadius: 20,
    backgroundColor: COLORS.info === "#2563EB"
      ? "#EFF6FF"
      : COLORS.surface,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginTop: 2,
  },

  travelIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  travelIcon: {
    fontSize: 30,
  },

  travelTitle: {
    marginTop: 12,
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
  },

  travelText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  travelStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.white,
  },

  travelStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.info,
    marginRight: 7,
  },

  travelStatusText: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.info,
  },

  // =========================
  // ACTIVE STATUS
  // =========================

  activeStatusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    marginTop: 2,
  },

  activeStatusIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  activeStatusIconText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
  },

  activeStatusContent: {
    flex: 1,
    marginLeft: 12,
  },

  activeStatusTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  activeStatusText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  // =========================
  // COMPLETED
  // =========================

  completedCard: {
    alignItems: "center",
    padding: 22,
    borderRadius: 20,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    marginTop: 2,
  },

  completedIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  completedIconText: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
  },

  completedTitle: {
    marginTop: 12,
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
  },

  completedText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});