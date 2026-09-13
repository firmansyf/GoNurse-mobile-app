import MapView, {
  Marker,
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
import { useAuthStore } from "@/store/auth-store";
import { calculateDistance } from "@/utils/distance";

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

  if (latitude == null || longitude == null) {
    return (
      <View style={styles.center}>
        <Text>
          Location is not available.
        </Text>
      </View>
    );
  }

 const nearbyNurses = dummyNurses.map((nurse) => ({
  ...nurse,
  distance: calculateDistance(
    latitude,
    longitude,
    nurse.latitude,
    nurse.longitude,
  ),
}));

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
      {/* MAP */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
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
            onCalloutPress={() =>
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

      {/* TOP CARD */}
      <View style={styles.topCard}>
        <View>
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
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* NURSE LIST */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            Available Nurses
          </Text>

          <Text style={styles.count}>
            {nearbyNurses.length}
          </Text>
        </View>

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
                We couldn't find any verified nurses
                within{" "}
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
  },

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

  marker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#111",
  },

  markerIcon: {
    fontSize: 22,
  },

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

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

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