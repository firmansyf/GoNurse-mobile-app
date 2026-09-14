import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { dummyNurses } from "@/features/nurse/data";

export default function NurseProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const nurse = dummyNurses.find((item) => item.id === id);

  if (!nurse) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Nurse tidak ditemukan
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

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => router.back()}
          >
            <Text style={styles.backIconText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Nurse Profile
          </Text>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* Profile */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👩‍⚕️</Text>
          </View>

          <View style={styles.nameRow}>
            <Text style={styles.name}>
              {nurse.name}
            </Text>

            {nurse.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>

          <Text style={styles.specialization}>
            {nurse.specialization}
          </Text>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>
              ⭐ {nurse.rating}
            </Text>

            <Text style={styles.reviews}>
              ({nurse.reviewCount} reviews)
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

          <View style={styles.servicesContainer}>
            {nurse.services.map((service) => (
              <View
                key={service}
                style={styles.serviceBadge}
              >
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
            <Text style={styles.locationIcon}>
              📍
            </Text>

            <View>
              <Text style={styles.locationTitle}>
                Available near you
              </Text>

              <Text style={styles.locationText}>
                Nurse is available within your area
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
          </View>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            router.push(`/booking/${nurse.id}`)
          }
        >
          <Text style={styles.bookButtonText}>
            Book Nurse
          </Text>

          <Text style={styles.bookButtonArrow}>
            →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingBottom: 120,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  notFound: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "700",
  },

  headerPlaceholder: {
    width: 40,
  },

  profileSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  avatarText: {
    fontSize: 56,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  name: {
    fontSize: 26,
    fontWeight: "800",
  },

  verifiedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  specialization: {
    fontSize: 16,
    color: "#777777",
    marginTop: 6,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },

  rating: {
    fontSize: 16,
    fontWeight: "700",
  },

  reviews: {
    fontSize: 15,
    color: "#777777",
  },

  section: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#666666",
  },

  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  serviceBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#F3F3F3",
  },

  serviceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444444",
  },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
    gap: 12,
  },

  locationIcon: {
    fontSize: 24,
  },

  locationTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  locationText: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },

  verifiedCard: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  verifiedCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedCircleText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  verifiedContent: {
    flex: 1,
  },

  verifiedTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  verifiedDescription: {
    fontSize: 13,
    color: "#777777",
    marginTop: 3,
  },

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

  bookButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  bookButtonArrow: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: 10,
  },

  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#111111",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});