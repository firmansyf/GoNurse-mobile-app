import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/auth-store";

export default function PatientHomeScreen() {
  const user = useAuthStore(
    (state) => state.user,
  );

  const handleFindNurse = () => {
    router.push("/(patient)/map");
  };

  const handleBookings = () => {
    router.push("/(patient)/bookings");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hello, {user?.name || "there"} 👋
            </Text>

            <Text style={styles.subtitle}>
              How can we help you today?
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            activeOpacity={0.8}
          >
            <Text style={styles.profileText}>
              {user?.name
                ?.charAt(0)
                .toUpperCase() || "Y"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* =================================================
            HERO
        ================================================= */}

        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>
                GoNurse Care
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Find trusted nurses near you
            </Text>

            <Text style={styles.heroDescription}>
              Get professional nursing care
              from verified nurses around
              your area.
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleFindNurse}
              activeOpacity={0.8}
            >
              <Text
                style={styles.primaryButtonText}
              >
                Find a Nurse
              </Text>

              <Text style={styles.primaryButtonArrow}>
                →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroIconContainer}>
            <Text style={styles.heroIcon}>
              🧑‍⚕️
            </Text>
          </View>
        </View>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={handleFindNurse}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.quickIcon,
                  {
                    backgroundColor:
                      COLORS.primaryLight,
                  },
                ]}
              >
                <Text style={styles.quickIconText}>
                  🔍
                </Text>
              </View>

              <Text style={styles.quickTitle}>
                Find Nurse
              </Text>

              <Text style={styles.quickDescription}>
                Find nurses near you
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickCard}
              onPress={handleBookings}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.quickIcon,
                  {
                    backgroundColor:
                      "#EFF6FF",
                  },
                ]}
              >
                <Text style={styles.quickIconText}>
                  📋
                </Text>
              </View>

              <Text style={styles.quickTitle}>
                My Bookings
              </Text>

              <Text style={styles.quickDescription}>
                Manage your bookings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* =================================================
            SERVICES
        ================================================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Nursing Services
            </Text>

            <Text style={styles.seeAll}>
              View all
            </Text>
          </View>

          <View style={styles.serviceList}>
            <ServiceCard
              icon="🏠"
              title="Home Care"
              description="Professional care at home"
            />

            <ServiceCard
              icon="🩹"
              title="Wound Care"
              description="Wound dressing and care"
            />

            <ServiceCard
              icon="👵"
              title="Elderly Care"
              description="Support for elderly patients"
            />

            <ServiceCard
              icon="💉"
              title="General Nursing"
              description="General nursing services"
            />
          </View>
        </View>

        {/* =================================================
            TRUST
        ================================================= */}

        <View style={styles.trustCard}>
          <View style={styles.trustIcon}>
            <Text style={styles.trustIconText}>
              ✓
            </Text>
          </View>

          <View style={styles.trustContent}>
            <Text style={styles.trustTitle}>
              Verified Nurses
            </Text>

            <Text style={styles.trustDescription}>
              GoNurse helps you find verified
              nursing professionals near you.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

/* =====================================================
   SERVICE CARD
===================================================== */

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <TouchableOpacity
      style={styles.serviceCard}
      activeOpacity={0.8}
    >
      <View style={styles.serviceIcon}>
        <Text style={styles.serviceIconText}>
          {icon}
        </Text>
      </View>

      <View style={styles.serviceContent}>
        <Text style={styles.serviceTitle}>
          {title}
        </Text>

        <Text style={styles.serviceDescription}>
          {description}
        </Text>
      </View>

      <Text style={styles.serviceArrow}>
        →
      </Text>
    </TouchableOpacity>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  greeting: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  profileText: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  /* HERO */

  heroCard: {
    marginTop: 28,
    minHeight: 260,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    padding: 22,
    overflow: "hidden",
    position: "relative",
  },

  heroContent: {
    flex: 1,
    paddingRight: 35,
  },

  heroBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  heroBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.white,
  },

  heroTitle: {
    marginTop: 16,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "800",
    color: COLORS.white,
  },

  heroDescription: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: "#EAF8EE",
  },

  primaryButton: {
    marginTop: 22,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    minWidth: 145,
  },

  primaryButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  primaryButtonArrow: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },

  heroIconContainer: {
    position: "absolute",
    right: -15,
    bottom: -20,
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroIcon: {
    fontSize: 58,
  },

  /* SECTION */

  section: {
    marginTop: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.text,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },

  /* QUICK ACTION */

  quickActions: {
    flexDirection: "row",
    gap: 12,
  },

  quickCard: {
    flex: 1,
    minHeight: 155,
    padding: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  quickIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  quickIconText: {
    fontSize: 22,
  },

  quickTitle: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  quickDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.textSecondary,
  },

  /* SERVICES */

  serviceList: {
    gap: 10,
  },

  serviceCard: {
    minHeight: 74,
    padding: 14,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  serviceIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  serviceIconText: {
    fontSize: 22,
  },

  serviceContent: {
    flex: 1,
    marginLeft: 13,
  },

  serviceTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  serviceDescription: {
    marginTop: 3,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  serviceArrow: {
    marginLeft: 8,
    fontSize: 20,
    color: COLORS.textMuted,
  },

  /* TRUST */

  trustCard: {
    marginTop: 30,
    padding: 18,
    borderRadius: 18,
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    flexDirection: "row",
    alignItems: "center",
  },

  trustIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  trustIconText: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.white,
  },

  trustContent: {
    flex: 1,
    marginLeft: 13,
  },

  trustTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  trustDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },

  bottomSpacing: {
    height: 20,
  },
});