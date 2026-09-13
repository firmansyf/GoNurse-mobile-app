import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuthStore } from "@/store/auth-store";

export default function PatientHomeScreen() {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {user?.name || "there"} 👋
          </Text>

          <Text style={styles.subtitle}>
            Find trusted care near you
          </Text>
        </View>

        <TouchableOpacity
          style={styles.notification}
          activeOpacity={0.7}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TouchableOpacity
        style={styles.searchBox}
        activeOpacity={0.7}
      >
        <Text style={styles.searchIcon}>🔍</Text>

        <Text style={styles.searchText}>
          Search nurse or service
        </Text>
      </TouchableOpacity>

      {/* Map Button */}
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => router.push("/(patient)/map")}
        activeOpacity={0.8}
      >
        <Text style={styles.mapButtonIcon}>🗺️</Text>

        <View style={styles.mapButtonContent}>
          <Text style={styles.mapButtonTitle}>
            Find nurses on map
          </Text>

          <Text style={styles.mapButtonSubtitle}>
            Discover nurses within 20 km
          </Text>
        </View>

        <Text style={styles.mapButtonArrow}>→</Text>
      </TouchableOpacity>

      {/* Services */}
      <Text style={styles.sectionTitle}>
        Services
      </Text>

      <View style={styles.services}>
        <ServiceItem
          icon="🏠"
          title="Home Care"
        />

        <ServiceItem
          icon="🩹"
          title="Wound Care"
        />

        <ServiceItem
          icon="👴"
          title="Elderly Care"
        />

        <ServiceItem
          icon="💊"
          title="Medication"
        />
      </View>

      {/* Nearby Nurses */}
      <View style={styles.nearbyHeader}>
        <Text style={styles.sectionTitle}>
          Nurses Near You
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(patient)/map")}
        >
          <Text style={styles.seeAll}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>
          🧑‍⚕️
        </Text>

        <Text style={styles.emptyTitle}>
          Find nurses near you
        </Text>

        <Text style={styles.emptyDescription}>
          Discover trusted nurses available within
          20 km of your location.
        </Text>

        <TouchableOpacity
          style={styles.findButton}
          onPress={() =>
            router.push("/(patient)/map")
          }
          activeOpacity={0.8}
        >
          <Text style={styles.findButtonText}>
            Find a Nurse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface ServiceItemProps {
  icon: string;
  title: string;
}

function ServiceItem({
  icon,
  title,
}: ServiceItemProps) {
  return (
    <TouchableOpacity
      style={styles.service}
      activeOpacity={0.7}
    >
      <View style={styles.serviceIcon}>
        <Text style={styles.serviceEmoji}>
          {icon}
        </Text>
      </View>

      <Text style={styles.serviceTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 24,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  notification: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    fontSize: 18,
  },

  /* Search */
  searchBox: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 28,
  },

  searchIcon: {
    fontSize: 18,
  },

  searchText: {
    marginLeft: 10,
    color: "#888",
    fontSize: 14,
  },

  /* Map Button */
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: "#111",
    paddingHorizontal: 16,
    marginTop: 14,
  },

  mapButtonIcon: {
    fontSize: 26,
  },

  mapButtonContent: {
    flex: 1,
    marginLeft: 12,
  },

  mapButtonTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  mapButtonSubtitle: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 4,
  },

  mapButtonArrow: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 10,
  },

  /* Section */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  /* Services */
  services: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  service: {
    width: "23%",
    alignItems: "center",
  },

  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  serviceEmoji: {
    fontSize: 24,
  },

  serviceTitle: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },

  /* Nearby */
  nearbyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 36,
  },

  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },

  /* Empty State */
  emptyState: {
    alignItems: "center",
    paddingTop: 32,
  },

  emptyIcon: {
    fontSize: 48,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 16,
  },

  emptyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    maxWidth: 300,
  },

  findButton: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  findButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});