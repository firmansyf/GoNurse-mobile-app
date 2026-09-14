import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  if (!nurse) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Nurse tidak ditemukan.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleConfirmBooking = () => {
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

  return (
    <View style={styles.container}>
      {/* =========================
          HEADER
      ========================= */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => router.back()}
        >
          <Text style={styles.backIconText}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Booking Summary
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* =========================
          CONTENT
      ========================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =========================
            INFO
        ========================= */}
        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>
              ✓
            </Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Review your booking
            </Text>

            <Text style={styles.infoText}>
              Please make sure all information is
              correct before confirming.
            </Text>
          </View>
        </View>

        {/* =========================
            NURSE
        ========================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Nurse
          </Text>

          <View style={styles.nurseCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                👩‍⚕️
              </Text>
            </View>

            <View style={styles.nurseInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.nurseName}>
                  {nurse.name}
                </Text>

                {nurse.verified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>
                      ✓
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.specialization}>
                {nurse.specialization}
              </Text>

              <Text style={styles.rating}>
                ⭐ {nurse.rating} (
                {nurse.reviewCount} reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            SERVICE
        ========================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Service
          </Text>

          <View style={styles.detailCard}>
            <Text style={styles.detailIcon}>
              🩺
            </Text>

            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>
                Nursing Service
              </Text>

              <Text style={styles.detailValue}>
                {service}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            SCHEDULE
        ========================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Schedule
          </Text>

          <View style={styles.scheduleRow}>
            <View style={styles.scheduleCard}>
              <Text style={styles.detailIcon}>
                📅
              </Text>

              <View>
                <Text style={styles.detailLabel}>
                  Date
                </Text>

                <Text style={styles.detailValue}>
                  {date}
                </Text>
              </View>
            </View>

            <View style={styles.scheduleCard}>
              <Text style={styles.detailIcon}>
                🕐
              </Text>

              <View>
                <Text style={styles.detailLabel}>
                  Time
                </Text>

                <Text style={styles.detailValue}>
                  {time}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* =========================
            ADDRESS
        ========================= */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Service Address
          </Text>

          <View style={styles.addressCard}>
            <Text style={styles.detailIcon}>
              📍
            </Text>

            <Text style={styles.addressText}>
              {address}
            </Text>
          </View>
        </View>

        {/* =========================
            NOTES
        ========================= */}
        {notes?.trim() ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Notes
            </Text>

            <View style={styles.notesCard}>
              <Text style={styles.notesText}>
                {notes}
              </Text>
            </View>
          </View>
        ) : null}

        {/* =========================
            IMPORTANT INFORMATION
        ========================= */}
        <View style={styles.warningCard}>
          <Text style={styles.warningIcon}>
            ℹ️
          </Text>

          <Text style={styles.warningText}>
            Your booking request will be sent to
            the nurse. The booking will only be
            confirmed after the nurse accepts your
            request.
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* =========================
          CONFIRM BUTTON
      ========================= */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Booking
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // =========================
  // CONTAINER
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  notFound: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#111111",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  // =========================
  // HEADER
  // =========================

  header: {
    height: 64,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  backIcon: {
    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F5F5F5",
  },

  backIconText: {
    fontSize: 30,
    lineHeight: 32,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  headerPlaceholder: {
    width: 40,
  },

  // =========================
  // CONTENT
  // =========================

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },

  // =========================
  // INFO
  // =========================

  infoCard: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    borderRadius: 16,

    backgroundColor: "#F5F5F5",

    marginBottom: 28,
  },

  infoIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#111111",

    alignItems: "center",
    justifyContent: "center",
  },

  infoIconText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "800",
  },

  infoText: {
    marginTop: 4,

    fontSize: 13,
    lineHeight: 18,

    color: "#666666",
  },

  // =========================
  // SECTION
  // =========================

  section: {
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",

    marginBottom: 12,
  },

  // =========================
  // NURSE
  // =========================

  nurseCard: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    borderRadius: 18,

    backgroundColor: "#F7F7F7",
  },

  avatar: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#EEEEEE",

    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 34,
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 14,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nurseName: {
    fontSize: 18,
    fontWeight: "800",
  },

  verifiedBadge: {
    width: 20,
    height: 20,

    borderRadius: 10,

    backgroundColor: "#111111",

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 6,
  },

  verifiedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  specialization: {
    marginTop: 4,

    fontSize: 14,

    color: "#666666",
  },

  rating: {
    marginTop: 6,

    fontSize: 13,

    color: "#555555",
  },

  // =========================
  // DETAILS
  // =========================

  detailCard: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    borderRadius: 16,

    backgroundColor: "#F7F7F7",
  },

  detailIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,

    color: "#888888",

    marginBottom: 4,
  },

  detailValue: {
    fontSize: 15,

    fontWeight: "700",

    color: "#111111",
  },

  // =========================
  // SCHEDULE
  // =========================

  scheduleRow: {
    flexDirection: "row",
    gap: 10,
  },

  scheduleCard: {
    flex: 1,

    minHeight: 90,

    padding: 14,

    borderRadius: 16,

    backgroundColor: "#F7F7F7",

    flexDirection: "column",

    justifyContent: "center",
  },

  // =========================
  // ADDRESS
  // =========================

  addressCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    padding: 16,

    borderRadius: 16,

    backgroundColor: "#F7F7F7",
  },

  addressText: {
    flex: 1,

    fontSize: 15,

    lineHeight: 22,

    color: "#333333",
  },

  // =========================
  // NOTES
  // =========================

  notesCard: {
    padding: 16,

    borderRadius: 16,

    backgroundColor: "#F7F7F7",
  },

  notesText: {
    fontSize: 15,

    lineHeight: 22,

    color: "#444444",
  },

  // =========================
  // WARNING
  // =========================

  warningCard: {
    flexDirection: "row",
    alignItems: "flex-start",

    padding: 16,

    borderRadius: 16,

    backgroundColor: "#F5F5F5",
  },

  warningIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  warningText: {
    flex: 1,

    fontSize: 13,

    lineHeight: 19,

    color: "#666666",
  },

  bottomSpacing: {
    height: 20,
  },

  // =========================
  // BOTTOM
  // =========================

  bottomContainer: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  confirmButton: {
    height: 56,

    borderRadius: 28,

    backgroundColor: "#111111",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "800",
  },

  arrow: {
    color: "#FFFFFF",

    fontSize: 22,

    marginLeft: 10,
  },
});