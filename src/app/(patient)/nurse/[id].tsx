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

export default function NurseProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const nurse = dummyNurses.find((item) => item.id === id);

  if (!nurse) {
    return (
      <View style={styles.center}>
        <View style={styles.notFoundIcon}>
          <Text style={styles.notFoundIconText}>?</Text>
        </View>

        <Text style={styles.notFound}>
          Nurse tidak ditemukan
        </Text>

        <Text style={styles.notFoundDescription}>
          Data nurse yang kamu cari tidak tersedia.
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Nurse Profile
          </Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* Profile Hero */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👩‍⚕️</Text>
            </View>

            {nurse.verified && (
              <View style={styles.avatarVerified}>
                <Text style={styles.avatarVerifiedText}>
                  ✓
                </Text>
              </View>
            )}
          </View>

          <View style={styles.nameRow}>
            <Text style={styles.name}>
              {nurse.name}
            </Text>
          </View>

          <Text style={styles.specialization}>
            {nurse.specialization}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.star}>★</Text>

              <Text style={styles.rating}>
                {nurse.rating.toFixed(1)}
              </Text>
            </View>

            <Text style={styles.reviews}>
              {nurse.reviewCount} reviews
            </Text>

            <View style={styles.dot} />

            <View style={styles.availableBadge}>
              <View style={styles.availableDot} />
              <Text style={styles.availableText}>
                Available
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Info */}
        <View style={styles.quickInfo}>
          <View style={styles.quickInfoItem}>
            <View style={styles.quickIcon}>
              <Text>✓</Text>
            </View>

            <Text style={styles.quickValue}>
              Verified
            </Text>

            <Text style={styles.quickLabel}>
              Professional
            </Text>
          </View>

          <View style={styles.quickDivider} />

          <View style={styles.quickInfoItem}>
            <View style={styles.quickIcon}>
              <Text>★</Text>
            </View>

            <Text style={styles.quickValue}>
              {nurse.rating.toFixed(1)}
            </Text>

            <Text style={styles.quickLabel}>
              Rating
            </Text>
          </View>

          <View style={styles.quickDivider} />

          <View style={styles.quickInfoItem}>
            <View style={styles.quickIcon}>
              <Text>📍</Text>
            </View>

            <Text style={styles.quickValue}>
              Nearby
            </Text>

            <Text style={styles.quickLabel}>
              Your Area
            </Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            About
          </Text>

          <Text style={styles.description}>
            Professional nurse who provides quality
            nursing services with care, comfort, and
            attention to patient needs.
          </Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Services
          </Text>

          <Text style={styles.sectionSubtitle}>
            Services available from this nurse
          </Text>

          <View style={styles.servicesContainer}>
            {nurse.services.map((service) => (
              <View
                key={service}
                style={styles.serviceBadge}
              >
                <View style={styles.serviceIcon}>
                  <Text style={styles.serviceIconText}>
                    ✓
                  </Text>
                </View>

                <Text style={styles.serviceText}>
                  {service}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Location
          </Text>

          <View style={styles.locationCard}>
            <View style={styles.locationIconContainer}>
              <Text style={styles.locationIcon}>
                📍
              </Text>
            </View>

            <View style={styles.locationContent}>
              <Text style={styles.locationTitle}>
                Available near you
              </Text>

              <Text style={styles.locationText}>
                This nurse is available within your
                service area.
              </Text>
            </View>

            <View style={styles.locationArrow}>
              <Text style={styles.locationArrowText}>
                →
              </Text>
            </View>
          </View>
        </View>

        {/* Verification */}
        {nurse.verified && (
          <View style={styles.verifiedCard}>
            <View style={styles.verifiedCircle}>
              <Text style={styles.verifiedCircleText}>
                ✓
              </Text>
            </View>

            <View style={styles.verifiedContent}>
              <Text style={styles.verifiedTitle}>
                Verified Nurse
              </Text>

              <Text style={styles.verifiedDescription}>
                This nurse has been verified by GoNurse.
              </Text>
            </View>

            <View style={styles.verifiedBadgeSmall}>
              <Text style={styles.verifiedBadgeSmallText}>
                ✓
              </Text>
            </View>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomInfo}>
          <View>
            <Text style={styles.bottomLabel}>
              Need nursing care?
            </Text>

            <Text style={styles.bottomSubtext}>
              Book {nurse.name}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              router.push(`/booking/${nurse.id}`)
            }
            activeOpacity={0.85}
          >
            <Text style={styles.bookButtonText}>
              Book Nurse
            </Text>

            <View style={styles.bookArrowContainer}>
              <Text style={styles.bookButtonArrow}>
                →
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingBottom: 130,
  },

  /* =========================
     Not Found
  ========================= */

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
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
     Profile
  ========================= */

  profileSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 26,
    backgroundColor: COLORS.surface,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },

  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 5,
    borderColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 58,
  },

  avatarVerified: {
    position: "absolute",
    right: 1,
    bottom: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarVerifiedText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.text,
  },

  specialization: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#FFF7E6",
  },

  star: {
    fontSize: 13,
    color: "#F59E0B",
    marginRight: 4,
  },

  rating: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },

  reviews: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 7,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textMuted,
    marginHorizontal: 9,
  },

  availableBadge: {
    flexDirection: "row",
    alignItems: "center",
  },

  availableDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 5,
  },

  availableText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  /* =========================
     Quick Info
  ========================= */

  quickInfo: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  quickInfoItem: {
    flex: 1,
    alignItems: "center",
  },

  quickIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },

  quickValue: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  quickLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  quickDivider: {
    width: 1,
    height: 38,
    backgroundColor: COLORS.border,
  },

  /* =========================
     Sections
  ========================= */

  section: {
    paddingHorizontal: 20,
    marginTop: 26,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 13,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
    marginTop: 10,
  },

  /* =========================
     Services
  ========================= */

  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 13,
  },

  serviceBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },

  serviceIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  serviceIconText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "900",
  },

  serviceText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  /* =========================
     Location
  ========================= */

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    padding: 15,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  locationIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  locationIcon: {
    fontSize: 21,
  },

  locationContent: {
    flex: 1,
    marginLeft: 12,
  },

  locationTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  locationText: {
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  locationArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  locationArrowText: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  /* =========================
     Verification
  ========================= */

  verifiedCard: {
    marginHorizontal: 20,
    marginTop: 26,
    padding: 15,
    borderRadius: 17,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
  },

  verifiedCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedCircleText: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
  },

  verifiedContent: {
    flex: 1,
    marginLeft: 11,
  },

  verifiedTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  verifiedDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  verifiedBadgeSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedBadgeSmallText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "900",
  },

  bottomSpacing: {
    height: 10,
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
    paddingTop: 12,
    paddingBottom: 45,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,

  },

  bottomInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bottomLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  bottomSubtext: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 2,
  },

  bookButton: {
    minWidth: 145,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bookButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  bookArrowContainer: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  bookButtonArrow: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
});