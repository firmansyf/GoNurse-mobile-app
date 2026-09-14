import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { APP_CONFIG } from "@/constants/config";
import { dummyNurses } from "@/features/nurse/data";
import { getNearbyNurses } from "@/features/nurse/utils";
import { useAuthStore } from "@/store/auth-store";

import { NurseCard } from "@/components/NurseCard";

export default function MapScreen() {
  const patientProfile = useAuthStore(
    (state) => state.patientProfile,
  );

  const latitude = patientProfile?.latitude;
  const longitude = patientProfile?.longitude;

  console.log("PATIENT LOCATION:", {
    latitude,
    longitude,
  });

  console.log("DUMMY NURSES:", dummyNurses);

  // Location belum tersedia
  if (latitude == null || longitude == null) {
    return (
      <View style={styles.center}>
        <Text style={styles.locationError}>
          Location is not available.
        </Text>
      </View>
    );
  }

  // Get nurses within configured radius
  const nearbyNurses = getNearbyNurses(
    dummyNurses,
    latitude,
    longitude,
    APP_CONFIG.maxNurseRadiusKm,
  );

  // Navigate to nurse profile
  const handleNursePress = (nurseId: string) => {
    router.push({
      pathname: "/(patient)/nurse/[id]",
      params: {
        id: nurseId,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* =========================
          MAP
      ========================= */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {nearbyNurses.map((nurse) => (
          <Marker
            key={nurse.id}
            coordinate={{
              latitude: nurse.latitude,
              longitude: nurse.longitude,
            }}
            title={nurse.name}
            description={`${nurse.distance.toFixed(
              1,
            )} km • ⭐ ${nurse.rating}`}
            onPress={() =>
              handleNursePress(nurse.id)
            }
          >
            <View style={styles.marker}>
              <Text style={styles.markerIcon}>
                🧑‍⚕️
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* =========================
          TOP CARD
      ========================= */}
      <View style={styles.topCard}>
        <View style={styles.topCardContent}>
          <Text style={styles.title}>
            Nurses near you
          </Text>

          <Text style={styles.subtitle}>
            {nearbyNurses.length} nurses within{" "}
            {APP_CONFIG.maxNurseRadiusKm} km
          </Text>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.closeText}>
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      {/* =========================
          NURSE LIST / BOTTOM SHEET
      ========================= */}
      <View style={styles.bottomSheet}>
        {/* Drag Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            Available Nurses
          </Text>

          <Text style={styles.count}>
            {nearbyNurses.length}
          </Text>
        </View>

        {/* List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
        >
          {nearbyNurses.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>
                🔍
              </Text>

              <Text style={styles.emptyTitle}>
                No nurses nearby
              </Text>

              <Text style={styles.emptyText}>
                We couldn't find any verified
                nurses within{" "}
                {APP_CONFIG.maxNurseRadiusKm} km.
              </Text>
            </View>
          ) : (
            nearbyNurses.map((nurse) => (
              <NurseCard
                key={nurse.id}
                nurse={nurse}
                onPress={() =>
                  handleNursePress(nurse.id)
                }
              />
            ))
          )}
        </ScrollView>
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
  },

  map: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  locationError: {
    fontSize: 16,
    color: "#666",
  },

  // =========================
  // TOP CARD
  // =========================

  topCard: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    padding: 16,

    borderRadius: 16,
    backgroundColor: "#fff",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  topCardContent: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f2f2f2",

    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    fontSize: 16,
    color: "#555",
  },

  // =========================
  // MARKER
  // =========================

  marker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 2,
    borderColor: "#111",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 4,
  },

  markerIcon: {
    fontSize: 22,
  },

  // =========================
  // BOTTOM SHEET
  // =========================

  bottomSheet: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: "48%",

    backgroundColor: "#fff",

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    alignSelf: "center",
    marginTop: 10,
  },

  // =========================
  // LIST HEADER
  // =========================

  listHeader: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
  },

  listTitle: {
    fontSize: 17,
    fontWeight: "800",
  },

  count: {
    marginLeft: 8,
    fontSize: 13,
    color: "#666",
  },

  // =========================
  // LIST
  // =========================

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // =========================
  // EMPTY STATE
  // =========================

  empty: {
    alignItems: "center",
    paddingVertical: 30,
  },

  emptyIcon: {
    fontSize: 40,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: "700",
  },

  emptyText: {
    marginTop: 6,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
  },
});