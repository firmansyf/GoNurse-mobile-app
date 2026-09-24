import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { useBookingStore } from "@/store/booking-store";
import type { Booking } from "@/types/booking";

export default function NurseBookingsScreen() {
  const bookings = useBookingStore(
    (state) => state.bookings,
  );

  const getBookingsByNurseId =
    useBookingStore(
      (state) => state.getBookingsByNurseId,
    );

  /**
   * Temporary nurse ID.
   *
   * Later:
   * auth store / logged-in nurse
   */
  const nurseId = "nurse-001";

  const nurseBookings =
    getBookingsByNurseId(nurseId);

  const pendingBookings =
    nurseBookings.filter(
      (booking) =>
        booking.status === "pending",
    );

  const activeBookings =
    nurseBookings.filter(
      (booking) =>
        booking.status !== "pending" &&
        booking.status !== "rejected" &&
        booking.status !== "cancelled" &&
        booking.status !== "completed",
    );

  const completedBookings =
    nurseBookings.filter(
      (booking) =>
        booking.status === "completed",
    );

  return (
    <View style={styles.container}>
      {/* ==================================================
          HEADER
      ================================================== */}

      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.eyebrow}>
              NURSE DASHBOARD
            </Text>

            <Text style={styles.title}>
              My Bookings
            </Text>

            <Text style={styles.subtitle}>
              Manage your nursing appointments
            </Text>
          </View>

          <TouchableOpacity
            style={styles.refreshButton}
            activeOpacity={0.8}
          >
            <Text style={styles.refreshIcon}>
              ↻
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ==================================================
            SUMMARY
        ================================================== */}

        <View style={styles.summaryCard}>
          <View style={styles.summaryIntro}>
            <View style={styles.summaryIconContainer}>
              <Text style={styles.summaryIcon}>
                🩺
              </Text>
            </View>

            <View style={styles.summaryText}>
              <Text style={styles.summaryTitle}>
                Today's Overview
              </Text>

              <Text style={styles.summarySubtitle}>
                Keep track of your patient requests
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatItem
              value={pendingBookings.length}
              label="New"
              highlight
            />

            <View style={styles.statDivider} />

            <StatItem
              value={activeBookings.length}
              label="Active"
            />

            <View style={styles.statDivider} />

            <StatItem
              value={completedBookings.length}
              label="Done"
            />
          </View>
        </View>

        {/* ==================================================
            NEW REQUESTS
        ================================================== */}

        <Section
          title="New Requests"
          subtitle="Booking requests waiting for your response"
          count={pendingBookings.length}
          highlighted
        >
          {pendingBookings.length === 0 ? (
            <EmptyState
              icon="📭"
              title="No new requests"
              description="New booking requests will appear here."
            />
          ) : (
            pendingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type="pending"
              />
            ))
          )}
        </Section>

        {/* ==================================================
            ACTIVE BOOKINGS
        ================================================== */}

        <Section
          title="Active Bookings"
          subtitle="Patients currently in your care"
          count={activeBookings.length}
        >
          {activeBookings.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No active bookings"
              description="Accepted bookings will appear here."
            />
          ) : (
            activeBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type="active"
              />
            ))
          )}
        </Section>

        {/* ==================================================
            COMPLETED
        ================================================== */}

        <Section
          title="Completed"
          subtitle="Your completed nursing services"
          count={completedBookings.length}
        >
          {completedBookings.length === 0 ? (
            <EmptyState
              icon="✓"
              title="No completed bookings"
              description="Completed services will appear here."
            />
          ) : (
            completedBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type="completed"
              />
            ))
          )}
        </Section>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

/* ============================================================
   STAT ITEM
============================================================ */

function StatItem({
  value,
  label,
  highlight = false,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.statItem}>
      <Text
        style={[
          styles.statValue,
          highlight && styles.statValueHighlight,
        ]}
      >
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

/* ============================================================
   SECTION
============================================================ */

function Section({
  title,
  subtitle,
  count,
  highlighted = false,
  children,
}: {
  title: string;
  subtitle: string;
  count: number;
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <View
            style={[
              styles.sectionIndicator,
              highlighted &&
                styles.sectionIndicatorHighlight,
            ]}
          />

          <View style={styles.sectionTextContainer}>
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>
                {title}
              </Text>

              <View
                style={[
                  styles.countBadge,
                  highlighted &&
                    styles.countBadgeHighlight,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    highlighted &&
                      styles.countTextHighlight,
                  ]}
                >
                  {count}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionSubtitle}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>

      {children}
    </View>
  );
}

/* ============================================================
   BOOKING CARD
============================================================ */

function BookingCard({
  booking,
  type,
}: {
  booking: Booking;
  type:
    | "pending"
    | "active"
    | "completed";
}) {
  const updateBookingStatus =
    useBookingStore(
      (state) =>
        state.updateBookingStatus,
    );

  const handleAccept = () => {
    updateBookingStatus(
      booking.id,
      "accepted",
    );
  };

  const handleReject = () => {
    updateBookingStatus(
      booking.id,
      "rejected",
    );
  };

  const handleStartTrip = () => {
    updateBookingStatus(
      booking.id,
      "on_the_way",
    );
  };

  const handleOpen = () => {
    router.push({
      pathname:
        "/(nurse)/booking/[id]",
      params: {
        id: booking.id,
      },
    });
  };

  return (
    <View
      style={[
        styles.card,
        type === "pending" &&
          styles.pendingCard,
      ]}
    >
      {/* ==================================================
          CARD HEADER
      ================================================== */}

      <View style={styles.patientRow}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              👤
            </Text>
          </View>

          {type === "pending" && (
            <View style={styles.newDot} />
          )}
        </View>

        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>
            Patient
          </Text>

          <Text style={styles.bookingId}>
            #{booking.id}
          </Text>
        </View>

        <StatusBadge
          status={booking.status}
        />
      </View>

      {/* ==================================================
          SERVICE
      ================================================== */}

      <InfoRow
        icon="🩺"
        label="SERVICE"
        value={booking.service}
      />

      {/* ==================================================
          SCHEDULE
      ================================================== */}

      <InfoRow
        icon="📅"
        label="SCHEDULE"
        value={`${booking.date} • ${booking.time}`}
      />

      {/* ==================================================
          LOCATION
      ================================================== */}

      <InfoRow
        icon="📍"
        label="LOCATION"
        value={booking.address}
      />

      {/* ==================================================
          NOTES
      ================================================== */}

      {booking.notes ? (
        <View style={styles.notes}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesIcon}>
              📝
            </Text>

            <Text style={styles.notesLabel}>
              PATIENT NOTES
            </Text>
          </View>

          <Text style={styles.notesText}>
            {booking.notes}
          </Text>
        </View>
      ) : null}

      {/* ==================================================
          ACTIONS
      ================================================== */}

      {type === "pending" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={handleReject}
            activeOpacity={0.8}
          >
            <Text style={styles.rejectIcon}>
              ×
            </Text>

            <Text style={styles.rejectText}>
              Reject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAccept}
            activeOpacity={0.8}
          >
            <Text style={styles.acceptIcon}>
              ✓
            </Text>

            <Text style={styles.acceptText}>
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {type === "active" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.detailButton}
            onPress={handleOpen}
            activeOpacity={0.8}
          >
            <Text style={styles.detailText}>
              View Detail
            </Text>

            <Text style={styles.detailArrow}>
              →
            </Text>
          </TouchableOpacity>

          {booking.status ===
            "accepted" && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleStartTrip}
              activeOpacity={0.8}
            >
              <Text style={styles.acceptIcon}>
                🚗
              </Text>

              <Text style={styles.acceptText}>
                Start Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {type === "completed" && (
        <TouchableOpacity
          style={styles.completedDetailButton}
          onPress={handleOpen}
          activeOpacity={0.8}
        >
          <Text style={styles.detailText}>
            View Booking Detail
          </Text>

          <Text style={styles.detailArrow}>
            →
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconContainer}>
        <Text style={styles.infoIcon}>
          {icon}
        </Text>
      </View>

      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>
          {label}
        </Text>

        <Text
          style={styles.infoValue}
          numberOfLines={2}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const config =
    status === "pending"
      ? {
          label: "Pending",
          icon: "⏳",
          style: styles.statusPending,
        }
      : status === "accepted"
        ? {
            label: "Accepted",
            icon: "✓",
            style: styles.statusAccepted,
          }
        : status === "on_the_way"
          ? {
              label: "On the Way",
              icon: "🚗",
              style: styles.statusInfo,
            }
          : status === "arrived"
            ? {
                label: "Arrived",
                icon: "📍",
                style: styles.statusInfo,
              }
            : status === "in_progress"
              ? {
                  label: "In Progress",
                  icon: "🩺",
                  style: styles.statusInfo,
                }
              : status === "completed"
                ? {
                    label: "Completed",
                    icon: "✓",
                    style: styles.statusCompleted,
                  }
                : {
                    label: status,
                    icon: "•",
                    style: styles.statusDefault,
                  };

  return (
    <View
      style={[
        styles.statusBadge,
        config.style,
      ]}
    >
      <Text style={styles.statusIcon}>
        {config.icon}
      </Text>

      <Text style={styles.statusText}>
        {config.label}
      </Text>
    </View>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconOuter}>
        <View style={styles.emptyIconContainer}>
          <Text style={styles.emptyIcon}>
            {icon}
          </Text>
        </View>
      </View>

      <Text style={styles.emptyTitle}>
        {title}
      </Text>

      <Text style={styles.emptyDescription}>
        {description}
      </Text>
    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Header */

  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  refreshButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  refreshIcon: {
    fontSize: 25,
    color: COLORS.primaryDark,
  },

  /* Content */

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
  },

  /* Summary */

  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 17,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  summaryIntro: {
    flexDirection: "row",
    alignItems: "center",
  },

  summaryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryIcon: {
    fontSize: 22,
  },

  summaryText: {
    flex: 1,
    marginLeft: 11,
  },

  summaryTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  summarySubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.textSecondary,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
  },

  statValueHighlight: {
    color: COLORS.primary,
  },

  statLabel: {
    marginTop: 2,
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: "600",
  },

  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },

  /* Section */

  section: {
    marginBottom: 28,
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sectionIndicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    marginRight: 10,
  },

  sectionIndicatorHighlight: {
    backgroundColor: COLORS.primary,
  },

  sectionTextContainer: {
    flex: 1,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.textMuted,
  },

  countBadge: {
    minWidth: 25,
    height: 25,
    borderRadius: 13,
    paddingHorizontal: 7,
    marginLeft: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  countBadgeHighlight: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primaryLight,
  },

  countText: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.textSecondary,
  },

  countTextHighlight: {
    color: COLORS.primaryDark,
  },

  /* Card */

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
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

  pendingCard: {
    borderColor: COLORS.primaryLight,
    borderWidth: 1.5,
  },

  /* Patient */

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 22,
  },

  newDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.surface,
  },

  patientInfo: {
    flex: 1,
    marginLeft: 11,
  },

  patientName: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  bookingId: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.textMuted,
  },

  /* Status */

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  statusPending: {
    backgroundColor: "#FFFBEB",
  },

  statusAccepted: {
    backgroundColor: COLORS.primarySoft,
  },

  statusInfo: {
    backgroundColor: "#EFF6FF",
  },

  statusCompleted: {
    backgroundColor: COLORS.primarySoft,
  },

  statusDefault: {
    backgroundColor: COLORS.background,
  },

  statusIcon: {
    fontSize: 9,
    marginRight: 4,
  },

  statusText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.text,
  },

  /* Info */

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  infoIcon: {
    fontSize: 16,
  },

  infoContent: {
    flex: 1,
    marginLeft: 10,
  },

  infoLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: 0.6,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.text,
  },

  /* Notes */

  notes: {
    marginTop: 2,
    marginBottom: 2,
    padding: 12,
    borderRadius: 13,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },

  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  notesIcon: {
    fontSize: 13,
    marginRight: 5,
  },

  notesLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
  },

  notesText: {
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.text,
  },

  /* Actions */

  actions: {
    flexDirection: "row",
    gap: 9,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  rejectButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  rejectIcon: {
    fontSize: 19,
    color: COLORS.danger,
    marginRight: 5,
  },

  rejectText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.danger,
  },

  acceptButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  acceptIcon: {
    fontSize: 12,
    color: COLORS.white,
    marginRight: 6,
  },

  acceptText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.white,
  },

  detailButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  detailText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  detailArrow: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primary,
    marginLeft: 6,
  },

  completedDetailButton: {
    height: 46,
    marginTop: 15,
    borderRadius: 13,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Empty */

  empty: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyIconOuter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 25,
  },

  emptyTitle: {
    marginTop: 13,
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  emptyDescription: {
    maxWidth: 280,
    marginTop: 5,
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 17,
  },

  bottomSpace: {
    height: 20,
  },
});