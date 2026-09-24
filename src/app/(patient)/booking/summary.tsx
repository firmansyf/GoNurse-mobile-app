import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import { dummyNurses } from "@/features/nurse/data";
import { useBookingStore } from "@/store/booking-store";

export default function BookingSummaryScreen() {
  const router = useRouter();

  const {
    nurseId,
    service,
    date,
    time,
    address,
    notes,
  } = useLocalSearchParams<{
    nurseId: string;
    service: string;
    date: string;
    time: string;
    address: string;
    notes?: string;
  }>();

  const nurse = dummyNurses.find(
    (item) => item.id === nurseId,
  );

  const createBooking = useBookingStore(
    (state) => state.createBooking,
  );

  /* =========================
     Confirm Booking
  ========================= */

  const handleConfirmBooking = () => {
    if (!nurse) {
      return;
    }

    const booking = createBooking({
      nurseId: nurse.id,

      // Temporary patient ID
      // Nanti akan diambil dari authenticated user
      patientId: "patient-001",

      nurse,

      service: service ?? "",

      date: date ?? "",

      time: time ?? "",

      address: address ?? "",

      notes: notes ?? "",
    });

    router.replace({
      pathname: "/booking/success",
      params: {
        bookingId: booking.id,
      },
    });
  };

  /* =========================
     Nurse Not Found
  ========================= */

  if (!nurse) {
    return (
      <View style={styles.center}>
        <View style={styles.notFoundIcon}>
          <Text style={styles.notFoundIconText}>
            ?
          </Text>
        </View>

        <Text style={styles.notFound}>
          Nurse tidak ditemukan
        </Text>

        <Text style={styles.notFoundDescription}>
          Data nurse yang kamu pilih tidak tersedia.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* =========================
          Header
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Booking Summary
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* =========================
          Content
      ========================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =========================
            Review Banner
        ========================= */}

        <View style={styles.reviewCard}>
          <View style={styles.reviewIcon}>
            <Text style={styles.reviewIconText}>
              ✓
            </Text>
          </View>

          <View style={styles.reviewContent}>
            <Text style={styles.reviewTitle}>
              Review your booking
            </Text>

            <Text style={styles.reviewText}>
              Make sure the information below is
              correct before sending your request.
            </Text>
          </View>
        </View>

        {/* =========================
            Nurse
        ========================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Nurse
            </Text>

            <Text style={styles.sectionNumber}>
              01
            </Text>
          </View>

          <View style={styles.nurseCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  👩‍⚕️
                </Text>
              </View>

              {nurse.verified && (
                <View style={styles.avatarVerified}>
                  <Text style={styles.avatarVerifiedText}>
                    ✓
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.nurseInfo}>
              <View style={styles.nameRow}>
                <Text
                  style={styles.nurseName}
                  numberOfLines={1}
                >
                  {nurse.name}
                </Text>

                {nurse.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedIcon}>
                      ✓
                    </Text>

                    <Text style={styles.verifiedText}>
                      Verified
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.specialization}>
                {nurse.specialization}
              </Text>

              <View style={styles.ratingRow}>
                <Text style={styles.star}>
                  ★
                </Text>

                <Text style={styles.rating}>
                  {nurse.rating.toFixed(1)}
                </Text>

                <Text style={styles.reviews}>
                  ({nurse.reviewCount} reviews)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* =========================
            Service
        ========================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Service
            </Text>

            <Text style={styles.sectionNumber}>
              02
            </Text>
          </View>

          <View style={styles.detailCard}>
            <View style={styles.detailIconContainer}>
              <Text style={styles.detailIcon}>
                🩺
              </Text>
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Nursing Service
              </Text>

              <Text style={styles.detailValue}>
                {service || "Not specified"}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            Schedule
        ========================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Schedule
            </Text>

            <Text style={styles.sectionNumber}>
              03
            </Text>
          </View>

          <View style={styles.scheduleRow}>
            {/* Date */}
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleIcon}>
                <Text style={styles.scheduleIconText}>
                  📅
                </Text>
              </View>

              <Text style={styles.detailLabel}>
                Date
              </Text>

              <Text
                style={styles.scheduleValue}
                numberOfLines={2}
              >
                {date || "Not specified"}
              </Text>
            </View>

            {/* Time */}
            <View style={styles.scheduleCard}>
              <View style={styles.scheduleIcon}>
                <Text style={styles.scheduleIconText}>
                  🕐
                </Text>
              </View>

              <Text style={styles.detailLabel}>
                Time
              </Text>

              <Text
                style={styles.scheduleValue}
                numberOfLines={2}
              >
                {time || "Not specified"}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            Address
        ========================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Service Address
            </Text>

            <Text style={styles.sectionNumber}>
              04
            </Text>
          </View>

          <View style={styles.addressCard}>
            <View style={styles.addressIconContainer}>
              <Text style={styles.addressIcon}>
                📍
              </Text>
            </View>

            <View style={styles.addressContent}>
              <Text style={styles.detailLabel}>
                Visit location
              </Text>

              <Text style={styles.addressText}>
                {address || "Not specified"}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            Notes
        ========================= */}

        {notes?.trim() ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.notesTitleRow}>
                <Text style={styles.sectionTitle}>
                  Notes
                </Text>

                <View style={styles.optionalBadge}>
                  <Text style={styles.optionalText}>
                    Optional
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionNumber}>
                05
              </Text>
            </View>

            <View style={styles.notesCard}>
              <Text style={styles.notesText}>
                {notes}
              </Text>
            </View>
          </View>
        ) : null}

        {/* =========================
            Important Information
        ========================= */}

        <View style={styles.importantCard}>
          <View style={styles.importantIcon}>
            <Text style={styles.importantIconText}>
              !
            </Text>
          </View>

          <View style={styles.importantContent}>
            <Text style={styles.importantTitle}>
              Booking request
            </Text>

            <Text style={styles.importantText}>
              Your request will be sent to the nurse.
              The booking will only be confirmed after
              the nurse accepts your request.
            </Text>
          </View>
        </View>

        {/* =========================
            Bottom Space
        ========================= */}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* =========================
          Bottom CTA
      ========================= */}

      <View style={styles.bottomContainer}>
        <View style={styles.confirmHint}>
          <View style={styles.confirmCheck}>
            <Text style={styles.confirmCheckText}>
              ✓
            </Text>
          </View>

          <Text style={styles.confirmHintText}>
            Ready to send your booking request?
          </Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Booking
          </Text>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>
              →
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
     Not Found
  ========================= */

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },

  notFoundIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  notFoundIconText: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  notFound: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },

  notFoundDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },

  backButton: {
    paddingHorizontal: 26,
    paddingVertical: 13,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
  },

  backButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  /* =========================
     Header
  ========================= */

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primarySoft,
  },

  backIcon: {
    fontSize: 30,
    lineHeight: 32,
    color: COLORS.primaryDark,
    marginTop: -2,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  headerPlaceholder: {
    width: 40,
  },

  /* =========================
     Content
  ========================= */

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 145,
  },

  /* =========================
     Review Card
  ========================= */

  reviewCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    marginBottom: 27,
  },

  reviewIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  reviewIconText: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
  },

  reviewContent: {
    flex: 1,
    marginLeft: 12,
  },

  reviewTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  reviewText: {
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  /* =========================
     Section
  ========================= */

  section: {
    marginBottom: 25,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionNumber: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },

  /* =========================
     Nurse
  ========================= */

  nurseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 34,
  },

  avatarVerified: {
    position: "absolute",
    right: -4,
    bottom: -4,
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
    fontSize: 9,
    fontWeight: "900",
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 13,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nurseName: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
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
    fontWeight: "900",
    marginRight: 4,
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  specialization: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  star: {
    fontSize: 13,
    color: "#F59E0B",
    marginRight: 4,
  },

  rating: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  reviews: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 4,
  },

  /* =========================
     Detail Card
  ========================= */

  detailCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  detailIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  detailIcon: {
    fontSize: 21,
  },

  detailContent: {
    flex: 1,
    marginLeft: 12,
  },

  detailLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.textMuted,
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  /* =========================
     Schedule
  ========================= */

  scheduleRow: {
    flexDirection: "row",
    gap: 10,
  },

  scheduleCard: {
    flex: 1,
    minHeight: 126,
    padding: 14,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  scheduleIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
  },

  scheduleIconText: {
    fontSize: 17,
  },

  scheduleValue: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  /* =========================
     Address
  ========================= */

  addressCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  addressIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  addressIcon: {
    fontSize: 20,
  },

  addressContent: {
    flex: 1,
    marginLeft: 12,
  },

  addressText: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    color: COLORS.text,
  },

  /* =========================
     Notes
  ========================= */

  notesTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionalBadge: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
    backgroundColor: COLORS.primarySoft,
  },

  optionalText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  notesCard: {
    padding: 15,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  notesText: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },

  /* =========================
     Important Information
  ========================= */

  importantCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    borderRadius: 17,
    backgroundColor: "#FFF7E6",
    borderWidth: 1,
    borderColor: "#FDE7B2",
  },

  importantIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
  },

  importantIconText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },

  importantContent: {
    flex: 1,
    marginLeft: 10,
  },

  importantTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#8A6116",
    marginBottom: 4,
  },

  importantText: {
    fontSize: 11,
    lineHeight: 17,
    color: "#806C43",
  },

  bottomSpacing: {
    height: 20,
  },

  /* =========================
     Bottom CTA
  ========================= */

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 22,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  confirmHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  confirmCheck: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  confirmCheckText: {
    fontSize: 9,
    fontWeight: "900",
    color: COLORS.primary,
  },

  confirmHintText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  confirmButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
  },

  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 9,
  },

  arrow: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },
});