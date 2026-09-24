import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

import { useBookingStore } from "@/store/booking-store";

export default function NurseBookingsScreen() {
  const bookings = useBookingStore(
    (state) => state.bookings,
  );

  const getBookingsByNurseId =
    useBookingStore(
      (state) => state.getBookingsByNurseId,
    );

  /**
   * Temporary nurse ID
   *
   * Nanti akan diambil dari:
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

console.log("ALL BOOKINGS:", bookings);
console.log("NURSE BOOKINGS:", nurseBookings);
console.log("PENDING BOOKINGS:", pendingBookings);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            My Bookings
          </Text>

          <Text style={styles.subtitle}>
            Manage your nursing requests
          </Text>
        </View>

        <TouchableOpacity
          style={styles.refreshButton}
          activeOpacity={0.7}
        >
          <Text style={styles.refreshText}>
            ↻
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        {/* Pending */}
        <Section
          title="New Requests"
          count={pendingBookings.length}
        >
          {pendingBookings.length === 0 ? (
            <EmptyState
              icon="📭"
              title="No new requests"
              description="New booking requests will appear here."
            />
          ) : (
            pendingBookings.map(
              (booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  type="pending"
                />
              ),
            )
          )}
        </Section>

        {/* Active */}
        <Section
          title="Active Bookings"
          count={activeBookings.length}
        >
          {activeBookings.length === 0 ? (
            <EmptyState
              icon="📅"
              title="No active bookings"
              description="Accepted bookings will appear here."
            />
          ) : (
            activeBookings.map(
              (booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  type="active"
                />
              ),
            )
          )}
        </Section>

        {/* Completed */}
        <Section
          title="Completed"
          count={completedBookings.length}
        >
          {completedBookings.length === 0 ? (
            <EmptyState
              icon="✓"
              title="No completed bookings"
              description="Completed services will appear here."
            />
          ) : (
            completedBookings.map(
              (booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  type="completed"
                />
              ),
            )
          )}
        </Section>
      </ScrollView>
    </View>
  );
}

/* =====================================================
   SECTION
===================================================== */

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {count}
          </Text>
        </View>
      </View>

      {children}
    </View>
  );
}

/* =====================================================
   BOOKING CARD
===================================================== */

function BookingCard({
  booking,
  type,
}: {
  booking: any;
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
    <View style={styles.card}>
      {/* Patient */}
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

        <StatusBadge
          status={booking.status}
        />
      </View>

      {/* Service */}
      <View style={styles.infoRow}>
        <Text style={styles.infoIcon}>
          🩺
        </Text>

        <View style={styles.infoContent}>
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

        <View style={styles.infoContent}>
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

        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>
            Location
          </Text>

          <Text style={styles.infoValue}>
            {booking.address}
          </Text>
        </View>
      </View>

      {/* Notes */}
      {booking.notes ? (
        <View style={styles.notes}>
          <Text style={styles.notesLabel}>
            Patient Notes
          </Text>

          <Text style={styles.notesText}>
            {booking.notes}
          </Text>
        </View>
      ) : null}

      {/* Actions */}
      {type === "pending" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={handleReject}
            activeOpacity={0.8}
          >
            <Text
              style={styles.rejectText}
            >
              Reject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAccept}
            activeOpacity={0.8}
          >
            <Text
              style={styles.acceptText}
            >
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
            <Text
              style={styles.detailText}
            >
              View Detail
            </Text>
          </TouchableOpacity>

          {booking.status ===
            "accepted" && (
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleStartTrip}
              activeOpacity={0.8}
            >
              <Text
                style={styles.acceptText}
              >
                Start Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {type === "completed" && (
        <TouchableOpacity
          style={styles.detailButton}
          onPress={handleOpen}
          activeOpacity={0.8}
        >
          <Text style={styles.detailText}>
            View Detail
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const label =
    status === "pending"
      ? "Pending"
      : status === "accepted"
        ? "Accepted"
        : status === "on_the_way"
          ? "On The Way"
          : status === "arrived"
            ? "Arrived"
            : status === "in_progress"
              ? "In Progress"
              : status === "completed"
                ? "Completed"
                : status;

  return (
    <View style={styles.statusBadge}>
      <Text style={styles.statusText}>
        {label}
      </Text>
    </View>
  );
}

/* =====================================================
   EMPTY STATE
===================================================== */

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
      <Text style={styles.emptyIcon}>
        {icon}
      </Text>

      <Text style={styles.emptyTitle}>
        {title}
      </Text>

      <Text style={styles.emptyDescription}>
        {description}
      </Text>
    </View>
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

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 4,
    color: "#777",
    fontSize: 14,
  },

  refreshButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  refreshText: {
    fontSize: 24,
    color: "#555",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  section: {
    marginBottom: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  countBadge: {
    marginLeft: 8,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
  },

  countText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#555",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 22,
  },

  patientInfo: {
    flex: 1,
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

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#F2F2F2",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 13,
  },

  infoIcon: {
    width: 28,
    fontSize: 18,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 11,
    color: "#999",
  },

  infoValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  notes: {
    marginTop: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
  },

  notesLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 4,
  },

  notesText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#444",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  rejectButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: "center",
    justifyContent: "center",
  },

  rejectText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
  },

  acceptButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },

  acceptText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },

  detailButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  detailText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  empty: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 32,
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
  },

  emptyDescription: {
    marginTop: 5,
    textAlign: "center",
    color: "#888",
    fontSize: 13,
    lineHeight: 19,
  },
});