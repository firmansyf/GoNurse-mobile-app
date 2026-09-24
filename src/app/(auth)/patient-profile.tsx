import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useRef, useState } from "react";

import { COLORS } from "@/constants/colors";
import { requestLocationPermission } from "@/services/location";
import { useAuthStore } from "@/store/auth-store";
import { getUserLocation } from "@/utils/location";

export default function PatientProfileScreen() {
  const setPatientProfile = useAuthStore(
    (state) => state.setPatientProfile,
  );

  const [loading, setLoading] = useState(false);

  // ============================================
  // ANIMATION VALUES
  // ============================================

  const illustrationScale = useRef(
    new Animated.Value(0.75),
  ).current;

  const illustrationOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const pulseScale = useRef(
    new Animated.Value(1),
  ).current;

  const pulseOpacity = useRef(
    new Animated.Value(0.7),
  ).current;

  const cardOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const cardTranslateY = useRef(
    new Animated.Value(25),
  ).current;

  const privacyOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const privacyTranslateY = useRef(
    new Animated.Value(15),
  ).current;

  const buttonOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const buttonTranslateY = useRef(
    new Animated.Value(20),
  ).current;

  // ============================================
  // INTRO ANIMATION
  // ============================================

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(
          illustrationScale,
          {
            toValue: 1,
            friction: 7,
            tension: 45,
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          illustrationOpacity,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.out(
              Easing.ease,
            ),
            useNativeDriver: true,
          },
        ),
      ]),

      Animated.parallel([
        Animated.timing(
          cardOpacity,
          {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          cardTranslateY,
          {
            toValue: 0,
            duration: 400,
            easing: Easing.out(
              Easing.ease,
            ),
            useNativeDriver: true,
          },
        ),
      ]),

      Animated.parallel([
        Animated.timing(
          privacyOpacity,
          {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          privacyTranslateY,
          {
            toValue: 0,
            duration: 350,
            easing: Easing.out(
              Easing.ease,
            ),
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          buttonOpacity,
          {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          },
        ),

        Animated.timing(
          buttonTranslateY,
          {
            toValue: 0,
            duration: 400,
            easing: Easing.out(
              Easing.ease,
            ),
            useNativeDriver: true,
          },
        ),
      ]),
    ]).start();
  }, []);

  // ============================================
  // LOCATION PULSE ANIMATION
  // ============================================

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            pulseScale,
            {
              toValue: 1.18,
              duration: 1000,
              easing: Easing.out(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            pulseOpacity,
            {
              toValue: 0.15,
              duration: 1000,
              easing: Easing.out(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),
        ]),

        Animated.parallel([
          Animated.timing(
            pulseScale,
            {
              toValue: 1,
              duration: 1000,
              easing: Easing.in(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            pulseOpacity,
            {
              toValue: 0.7,
              duration: 1000,
              easing: Easing.in(
                Easing.ease,
              ),
              useNativeDriver: true,
            },
          ),
        ]),
      ]),
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, []);

  // ============================================
  // HANDLE LOCATION
  // ============================================

  const handleContinue = async () => {
    try {
      setLoading(true);

      const permission =
        await requestLocationPermission();

      if (!permission) {
        Alert.alert(
          "Location Required",
          "GoNurse needs your location to find nurses near you.",
        );

        return;
      }

      const location =
        await getUserLocation();

      console.log(
        "PATIENT LOCATION:",
        {
          latitude:
            location.latitude,
          longitude:
            location.longitude,
        },
      );

      setPatientProfile({
        latitude:
          location.latitude,
        longitude:
          location.longitude,
      });

      router.replace(
        "/(patient)/home",
      );
    } catch (error) {
      console.error(
        "Location error:",
        error,
      );

      Alert.alert(
        "Location Error",
        "We couldn't get your current location. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>
            ←
          </Text>

          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.logo}>
          GoNurse
        </Text>
      </View>

      {/* =========================
          CONTENT
      ========================= */}

      <View style={styles.content}>
        {/* Location Illustration */}

        <Animated.View
          style={[
            styles.illustrationContainer,
            {
              opacity:
                illustrationOpacity,
              transform: [
                {
                  scale:
                    illustrationScale,
                },
              ],
            },
          ]}
        >
          {/* Pulse Circle */}

          <Animated.View
            style={[
              styles.pulseCircle,
              {
                opacity:
                  pulseOpacity,
                transform: [
                  {
                    scale:
                      pulseScale,
                  },
                ],
              },
            ]}
          />

          {/* Main Circle */}

          <View
            style={styles.illustrationCircle}
          >
            <Text
              style={
                styles.locationIcon
              }
            >
              📍
            </Text>
          </View>

          {/* Signal Dots */}

          <Animated.View
            style={[
              styles.signalDotOne,
              {
                opacity:
                  illustrationOpacity,
              },
            ]}
          />

          <Animated.View
            style={[
              styles.signalDotTwo,
              {
                opacity:
                  illustrationOpacity,
              },
            ]}
          />

          <Animated.View
            style={[
              styles.signalDotThree,
              {
                opacity:
                  illustrationOpacity,
              },
            ]}
          />
        </Animated.View>

        {/* Text */}

        <View style={styles.intro}>
          <Text style={styles.title}>
            Find nurses near you
          </Text>

          <Text style={styles.subtitle}>
            GoNurse uses your location to find
            trusted nurses within a 20 km radius.
          </Text>
        </View>

        {/* Location Card */}

        <Animated.View
          style={[
            styles.locationCard,
            {
              opacity:
                cardOpacity,
              transform: [
                {
                  translateY:
                    cardTranslateY,
                },
              ],
            },
          ]}
        >
          <View style={styles.cardIcon}>
            <Text
              style={styles.cardIconText}
            >
              📍
            </Text>
          </View>

          <View
            style={styles.locationContent}
          >
            <Text
              style={styles.locationTitle}
            >
              Your location
            </Text>

            <Text
              style={
                styles.locationDescription
              }
            >
              Your location is only used to
              find nurses nearby.
            </Text>
          </View>

          <View
            style={styles.checkContainer}
          >
            <Text style={styles.check}>
              ✓
            </Text>
          </View>
        </Animated.View>

        {/* Privacy */}

        <Animated.View
          style={[
            styles.privacyContainer,
            {
              opacity:
                privacyOpacity,
              transform: [
                {
                  translateY:
                    privacyTranslateY,
                },
              ],
            },
          ]}
        >
          <View
            style={styles.privacyIcon}
          >
            <Text style={styles.lockIcon}>
              🔒
            </Text>
          </View>

          <Text style={styles.privacyText}>
            Your location stays private and is
            only used to improve your nurse search.
          </Text>
        </Animated.View>
      </View>

      {/* =========================
          ACTION
      ========================= */}

      <Animated.View
        style={[
          styles.actions,
          {
            opacity:
              buttonOpacity,
            transform: [
              {
                translateY:
                  buttonTranslateY,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            loading &&
              styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator
              color={COLORS.white}
            />
          ) : (
            <>
              <Text
                style={
                  styles.buttonText
                }
              >
                Allow Location
              </Text>

              <Text
                style={
                  styles.buttonArrow
                }
              >
                →
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Location permission is required to
          find nurses near you.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 25,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },

  backIcon: {
    fontSize: 20,
    color: COLORS.text,
    marginRight: 5,
  },

  backText: {
    fontSize: 14,
    fontWeight: "600",
    color:
      COLORS.textSecondary,
  },

  logo: {
    fontSize: 22,
    fontWeight: "800",
    color:
      COLORS.primaryDark,
    letterSpacing: -0.6,
  },

  /* =========================
     CONTENT
  ========================= */

  content: {
    flex: 1,
    justifyContent: "center",
  },

  /* =========================
     ILLUSTRATION
  ========================= */

  illustrationContainer: {
    height: 145,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 25,
  },

  illustrationCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor:
      COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  pulseCircle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor:
      COLORS.primary,
    zIndex: 1,
  },

  locationIcon: {
    fontSize: 58,
  },

  signalDotOne: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor:
      COLORS.primary,
    top: 8,
    right: "32%",
  },

  signalDotTwo: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor:
      COLORS.primary,
    top: 28,
    right: "25%",
  },

  signalDotThree: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor:
      COLORS.primaryLight,
    top: 55,
    right: "20%",
  },

  /* =========================
     INTRO
  ========================= */

  intro: {
    marginBottom: 22,
  },

  title: {
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color:
      COLORS.textSecondary,
    marginTop: 9,
  },

  /* =========================
     LOCATION CARD
  ========================= */

  locationCard: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    backgroundColor:
      COLORS.surface,

    borderWidth: 1,
    borderColor:
      COLORS.border,

    borderRadius: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor:
      COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  cardIconText: {
    fontSize: 23,
  },

  locationContent: {
    flex: 1,
    marginLeft: 12,
  },

  locationTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  locationDescription: {
    fontSize: 11,
    lineHeight: 16,
    color:
      COLORS.textSecondary,
    marginTop: 3,
  },

  checkContainer: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor:
      COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  check: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  /* =========================
     PRIVACY
  ========================= */

  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 4,
  },

  privacyIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor:
      COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  lockIcon: {
    fontSize: 12,
  },

  privacyText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 15,
    color:
      COLORS.textMuted,
  },

  /* =========================
     ACTION
  ========================= */

  actions: {
    marginTop: 20,
  },

  button: {
    minHeight: 56,
    borderRadius: 15,
    backgroundColor:
      COLORS.primary,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,

    shadowColor:
      COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  buttonArrow: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },

  helperText: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    color:
      COLORS.textMuted,
    marginTop: 9,
  },
});