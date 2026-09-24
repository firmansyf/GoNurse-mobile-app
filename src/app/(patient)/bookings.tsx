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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";

      case "accepted":
        return "✓";

      case "rejected":
        return "×";

      case "on_the_way":
        return "🚗";

      case "arrived":
        return "📍";

      case "in_progress":
        return "🩺";

      case "completed":
        return "✓";

      case "cancelled":
        return "×";

      default:
        return "•";
    }
  };

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
            My Bookings
          </Text>

          <Text style={styles.headerSubtitle}>
            Track your nursing care
          </Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      {/* =========================
          Content
      ========================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {bookings.length === 0 ? (
          /* =========================
             Empty State
          ========================= */

          <View style={styles.empty}>
            <View style={styles.emptyIconOuter}>
              <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>
                  📋
                </Text>
              </View>
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
              activeOpacity={0.85}
            >
              <Text style={styles.findButtonText}>
                Find a Nurse
              </Text>

              <View style={styles.findButtonArrow}>
                <Text style={styles.findArrow}>
                  →
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* =========================
                Summary
            ========================= */}

            <View style={styles.summary}>
              <View>
                <Text style={styles.summaryTitle}>
                  Your Bookings
                </Text>

                <Text style={styles.summarySubtitle}>
                  Track and manage your nursing requests
                </Text>
              </View>

              <View style={styles.summaryCountBadge}>
                <Text style={styles.summaryCount}>
                  {bookings.length}
                </Text>
              </View>
            </View>

            {/* =========================
                Booking List
            ========================= */}

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
                activeOpacity={0.88}
              >
                {/* =========================
                    Nurse
                ========================= */}

                <View style={styles.nurseRow}>
                  <View style={styles.avatarWrapper}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        👩‍⚕️
                      </Text>
                    </View>

                    {booking.nurse.verified && (
                      <View style={styles.avatarVerified}>
                        <Text
                          style={styles.avatarVerifiedText}
                        >
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
                        <View
                          style={styles.verifiedBadge}
                        >
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

                      <Text style={styles.reviews}>
                        ({booking.nurse.reviewCount} reviews)
                      </Text>
                    </View>
                  </View>

                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>
                      ›
                    </Text>
                  </View>
                </View>

                {/* =========================
                    Divider
                ========================= */}

                <View style={styles.divider} />

                {/* =========================
                    Service
                ========================= */}

                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>
                      🩺
                    </Text>
                  </View>

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>
                      SERVICE
                    </Text>

                    <Text style={styles.infoValue}>
                      {booking.service}
                    </Text>
                  </View>
                </View>

                {/* =========================
                    Schedule
                ========================= */}

                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>
                      📅
                    </Text>
                  </View>

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>
                      SCHEDULE
                    </Text>

                    <Text style={styles.infoValue}>
                      {booking.date} • {booking.time}
                    </Text>
                  </View>
                </View>

                {/* =========================
                    Address
                ========================= */}

                <View style={styles.infoRow}>
                  <View style={styles.infoIconContainer}>
                    <Text style={styles.infoIcon}>
                      📍
                    </Text>
                  </View>

                  <View style={styles.addressContainer}>
                    <Text style={styles.infoLabel}>
                      SERVICE ADDRESS
                    </Text>

                    <Text
                      style={styles.infoValue}
                      numberOfLines={2}
                    >
                      {booking.address}
                    </Text>
                  </View>
                </View>

                {/* =========================
                    Status
                ========================= */}

                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusBadge,
                      getStatusStyle(
                        booking.status,
                      ),
                    ]}
                  >
                    <Text style={styles.statusIcon}>
                      {getStatusIcon(
                        booking.status,
                      )}
                    </Text>

                    <Text style={styles.statusText}>
                      {getStatusLabel(
                        booking.status,
                      )}
                    </Text>
                  </View>

                  <View style={styles.viewDetails}>
                    <Text style={styles.viewText}>
                      View Details
                    </Text>

                    <Text style={styles.viewArrow}>
                      →
                    </Text>
                  </View>
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
  /* =========================
     Container
  ========================= */

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* =========================
     Header
  ========================= */

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
    marginTop: 2,
    fontSize: 10,
    color: COLORS.textMuted,
  },

  headerSpacer: {
    width: 40,
  },

  /* =========================
     Content
  ========================= */

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* =========================
     Summary
  ========================= */

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 17,
  },

  summaryTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
  },

  summarySubtitle: {
    marginTop: 4,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  summaryCountBadge: {
    minWidth: 38,
    height: 38,
    paddingHorizontal: 10,
    borderRadius: 19,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryCount: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  /* =========================
     Booking Card
  ========================= */

  bookingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 7,

    elevation: 2,
  },

  /* =========================
     Nurse
  ========================= */

  nurseRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
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
    marginLeft: 12,
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
    fontSize: 12,
    color: "#F59E0B",
    marginRight: 3,
  },

  rating: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.text,
  },

  reviews: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginLeft: 4,
  },

  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 7,
  },

  arrow: {
    fontSize: 23,
    lineHeight: 25,
    color: COLORS.primaryDark,
    marginTop: -2,
  },

  /* =========================
     Divider
  ========================= */

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  /* =========================
     Info
  ========================= */

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
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: COLORS.text,
  },

  addressContainer: {
    flex: 1,
    marginLeft: 10,
  },

  /* =========================
     Status
  ========================= */

  statusRow: {
    marginTop: 2,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },

  statusPending: {
    backgroundColor: "#FFF7E6",
  },

  statusSuccess: {
    backgroundColor: COLORS.primarySoft,
  },

  statusDanger: {
    backgroundColor: "#FDEAEA",
  },

  statusInfo: {
    backgroundColor: "#EAF4FF",
  },

  statusIcon: {
    fontSize: 10,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.text,
  },

  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewText: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  viewArrow: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginLeft: 5,
  },

  /* =========================
     Empty State
  ========================= */

  empty: {
    alignItems: "center",
    paddingTop: 65,
    paddingHorizontal: 20,
  },

  emptyIconOuter: {
    width: 106,
    height: 106,
    borderRadius: 53,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIconContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 37,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
  },

  emptyText: {
    maxWidth: 330,
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  findButton: {
    minWidth: 170,
    height: 52,
    marginTop: 24,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  findButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  findButtonArrow: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  findArrow: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
});