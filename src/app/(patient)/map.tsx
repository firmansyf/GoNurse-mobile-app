import MapView, {
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";

import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { useEffect, useRef } from "react";

import { NurseCard } from "@/components/NurseCard";
import { APP_CONFIG } from "@/constants/config";
import { dummyNurses } from "@/features/nurse/data";
import { getNearbyNurses } from "@/features/nurse/utils";

import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/auth-store";

export default function MapScreen() {
  const patientProfile = useAuthStore(
    (state) => state.patientProfile,
  );

  const latitude = patientProfile?.latitude;
  const longitude = patientProfile?.longitude;

  // ============================================
  // BOTTOM SHEET ANIMATION
  // ============================================

  const sheetTranslateY = useRef(
    new Animated.Value(300),
  ).current;

  const sheetOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const topCardOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const topCardTranslateY = useRef(
    new Animated.Value(-20),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        sheetTranslateY,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.out(
            Easing.cubic,
          ),
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        sheetOpacity,
        {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        topCardOpacity,
        {
          toValue: 1,
          duration: 400,
          delay: 150,
          useNativeDriver: true,
        },
      ),

      Animated.timing(
        topCardTranslateY,
        {
          toValue: 0,
          duration: 400,
          delay: 150,
          easing: Easing.out(
            Easing.cubic,
          ),
          useNativeDriver: true,
        },
      ),
    ]).start();
  }, []);

  console.log("PATIENT LOCATION:", {
    latitude,
    longitude,
  });

  console.log(
    "DUMMY NURSES:",
    dummyNurses,
  );

  // ============================================
  // LOCATION NOT AVAILABLE
  // ============================================

  if (
    latitude == null ||
    longitude == null
  ) {
    return (
      <View style={styles.center}>
        <View style={styles.errorIcon}>
          <Text style={styles.errorIconText}>
            📍
          </Text>
        </View>

        <Text style={styles.errorTitle}>
          Location unavailable
        </Text>

        <Text style={styles.locationError}>
          We need your location to find nurses
          near you.
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() =>
            router.back()
          }
          activeOpacity={0.8}
        >
          <Text style={styles.retryText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ============================================
  // NEARBY NURSES
  // ============================================

  const nearbyNurses =
    getNearbyNurses(
      dummyNurses,
      latitude,
      longitude,
      APP_CONFIG.maxNurseRadiusKm,
    );

  // ============================================
  // NAVIGATION
  // ============================================

  const handleNursePress = (
    nurseId: string,
  ) => {
    router.push({
      pathname:
        "/(patient)/nurse/[id]",
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
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {/* Patient Marker */}

        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title="Your location"
        >
          <View style={styles.userMarker}>
            <View style={styles.userMarkerInner} />
          </View>
        </Marker>

        {/* Nurse Markers */}

        {nearbyNurses.map(
          (nurse) => (
            <Marker
              key={nurse.id}
              coordinate={{
                latitude:
                  nurse.latitude,
                longitude:
                  nurse.longitude,
              }}
              title={nurse.name}
              description={`${nurse.distance.toFixed(
                1,
              )} km • ⭐ ${nurse.rating}`}
              onPress={() =>
                handleNursePress(
                  nurse.id,
                )
              }
            >
              <View
                style={styles.marker}
              >
                <Text
                  style={
                    styles.markerIcon
                  }
                >
                  🧑‍⚕️
                </Text>
              </View>
            </Marker>
          ),
        )}
      </MapView>

      {/* =========================
          TOP CARD
      ========================= */}

      <Animated.View
        style={[
          styles.topCard,
          {
            opacity:
              topCardOpacity,
            transform: [
              {
                translateY:
                  topCardTranslateY,
              },
            ],
          },
        ]}
      >
        <View
          style={styles.topCardIcon}
        >
          <Text
            style={
              styles.topCardIconText
            }
          >
            📍
          </Text>
        </View>

        <View
          style={
            styles.topCardContent
          }
        >
          <Text style={styles.title}>
            Nurses near you
          </Text>

          <Text
            style={styles.subtitle}
          >
            {nearbyNurses.length}{" "}
            nurses within{" "}
            {
              APP_CONFIG.maxNurseRadiusKm
            }{" "}
            km
          </Text>
        </View>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() =>
            router.back()
          }
          activeOpacity={0.7}
        >
          <Text
            style={styles.closeText}
          >
            ✕
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* =========================
          BOTTOM SHEET
      ========================= */}

      <Animated.View
        style={[
          styles.bottomSheet,
          {
            opacity:
              sheetOpacity,
            transform: [
              {
                translateY:
                  sheetTranslateY,
              },
            ],
          },
        ]}
      >
        {/* Drag Handle */}

        <View
          style={styles.handle}
        />

        {/* Header */}

        <View
          style={styles.listHeader}
        >
          <View>
            <Text
              style={
                styles.listTitle
              }
            >
              Available Nurses
            </Text>

            <Text
              style={
                styles.listSubtitle
              }
            >
              Verified professionals
              near you
            </Text>
          </View>

          <View
            style={styles.countBadge}
          >
            <Text
              style={styles.count}
            >
              {nearbyNurses.length}
            </Text>
          </View>
        </View>

        {/* List */}

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.listContent
          }
        >
          {nearbyNurses.length ===
          0 ? (
            <View
              style={styles.empty}
            >
              <View
                style={styles.emptyIconContainer}
              >
                <Text
                  style={
                    styles.emptyIcon
                  }
                >
                  🔍
                </Text>
              </View>

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No nurses nearby
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                We couldn't find any
                verified nurses within{" "}
                {
                  APP_CONFIG.maxNurseRadiusKm
                }{" "}
                km.
              </Text>
            </View>
          ) : (
            nearbyNurses.map(
              (nurse) => (
                <NurseCard
                  key={nurse.id}
                  nurse={nurse}
                  onPress={() =>
                    handleNursePress(
                      nurse.id,
                    )
                  }
                />
              ),
            )
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* =========================
     CONTAINER
  ========================= */

  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  map: {
    flex: 1,
  },

  /* =========================
     LOCATION ERROR
  ========================= */

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor:
      COLORS.background,
  },

  errorIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor:
      COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  errorIconText: {
    fontSize: 32,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 18,
  },

  locationError: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 7,
  },

  retryButton: {
    marginTop: 22,
    paddingHorizontal: 24,
    height: 46,
    borderRadius: 13,
    backgroundColor:
      COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  retryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  /* =========================
     TOP CARD
  ========================= */

  topCard: {
    position: "absolute",

    top: 55,
    left: 20,
    right: 20,

    padding: 14,

    borderRadius: 18,
    backgroundColor:
      COLORS.surface,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  topCardIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,

    backgroundColor:
      COLORS.primaryLight,

    alignItems: "center",
    justifyContent: "center",
  },

  topCardIconText: {
    fontSize: 21,
  },

  topCardContent: {
    flex: 1,
    marginLeft: 11,
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 3,
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor:
      COLORS.primarySoft,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 8,
  },

  closeText: {
    fontSize: 15,
    color: COLORS.primaryDark,
    fontWeight: "700",
  },

  /* =========================
     USER MARKER
  ========================= */

  userMarker: {
    width: 26,
    height: 26,
    borderRadius: 13,

    backgroundColor:
      "rgba(22, 163, 74, 0.18)",

    alignItems: "center",
    justifyContent: "center",
  },

  userMarkerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,

    backgroundColor:
      COLORS.primary,

    borderWidth: 2,
    borderColor:
      COLORS.white,
  },

  /* =========================
     NURSE MARKER
  ========================= */

  marker: {
    width: 46,
    height: 46,
    borderRadius: 23,

    backgroundColor:
      COLORS.surface,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 2,
    borderColor:
      COLORS.primary,

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

  /* =========================
     BOTTOM SHEET
  ========================= */

  bottomSheet: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    height: "48%",

    backgroundColor:
      COLORS.surface,

    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 12,
  },

  handle: {
    width: 42,
    height: 4,
    borderRadius: 2,

    backgroundColor:
      COLORS.border,

    alignSelf: "center",

    marginTop: 10,
    marginBottom: 2,
  },

  /* =========================
     LIST HEADER
  ========================= */

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",

    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },

  listTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  listSubtitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  countBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,

    paddingHorizontal: 8,

    backgroundColor:
      COLORS.primaryLight,

    alignItems: "center",
    justifyContent: "center",
  },

  count: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  /* =========================
     LIST
  ========================= */

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 10,
  },

  /* =========================
     EMPTY STATE
  ========================= */

  empty: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,

    backgroundColor:
      COLORS.primaryLight,

    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 30,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  emptyText: {
    marginTop: 6,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});