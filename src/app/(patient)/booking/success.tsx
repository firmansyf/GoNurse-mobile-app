import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";

export default function BookingSuccessScreen() {
  const router = useRouter();

  const { bookingId } =
    useLocalSearchParams<{
      bookingId: string;
    }>();

  /* =========================
     Animation Values
  ========================= */

  const iconScale = useRef(
    new Animated.Value(0.5),
  ).current;

  const iconOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const pulseScale = useRef(
    new Animated.Value(1),
  ).current;

  const pulseOpacity = useRef(
    new Animated.Value(0.5),
  ).current;

  const titleOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const titleTranslate = useRef(
    new Animated.Value(18),
  ).current;

  const descriptionOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const descriptionTranslate = useRef(
    new Animated.Value(18),
  ).current;

  const bookingOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const bookingTranslate = useRef(
    new Animated.Value(22),
  ).current;

  const nextStepOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const nextStepTranslate = useRef(
    new Animated.Value(22),
  ).current;

  const buttonsOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const buttonsTranslate = useRef(
    new Animated.Value(25),
  ).current;

  /* =========================
     Animation Sequence
  ========================= */

  useEffect(() => {
    Animated.sequence([
      // 1. Success icon
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 5,
          tension: 70,
          useNativeDriver: true,
        }),

        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // 2. Title
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // 3. Description
      Animated.parallel([
        Animated.timing(descriptionOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(descriptionTranslate, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // 4. Booking card
      Animated.parallel([
        Animated.timing(bookingOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(bookingTranslate, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // 5. Next step
      Animated.parallel([
        Animated.timing(nextStepOpacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(nextStepTranslate, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // 6. Buttons
      Animated.parallel([
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(buttonsTranslate, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    /* =========================
       Pulse Animation
    ========================= */

    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1.18,
            duration: 900,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),

          Animated.timing(pulseOpacity, {
            toValue: 0,
            duration: 900,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),

          Animated.timing(pulseOpacity, {
            toValue: 0.5,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [
    iconScale,
    iconOpacity,
    titleOpacity,
    titleTranslate,
    descriptionOpacity,
    descriptionTranslate,
    bookingOpacity,
    bookingTranslate,
    nextStepOpacity,
    nextStepTranslate,
    buttonsOpacity,
    buttonsTranslate,
    pulseScale,
    pulseOpacity,
  ]);

  /* =========================
     Navigation
  ========================= */

  const handleViewBookings = () => {
    router.replace("/(patient)/bookings");
  };

  const handleBackHome = () => {
    router.replace("/(patient)/home");
  };

  return (
    <View style={styles.container}>
      {/* =========================
          Main Content
      ========================= */}

      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              opacity: iconOpacity,
              transform: [
                {
                  scale: iconScale,
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.iconPulse,
              {
                opacity: pulseOpacity,
                transform: [
                  {
                    scale: pulseScale,
                  },
                ],
              },
            ]}
          />

          <View style={styles.iconOuter}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>
                ✓
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [
              {
                translateY: titleTranslate,
              },
            ],
          }}
        >
          <Text style={styles.title}>
            Booking Request Sent
          </Text>
        </Animated.View>

        {/* Description */}
        <Animated.View
          style={{
            opacity: descriptionOpacity,
            transform: [
              {
                translateY: descriptionTranslate,
              },
            ],
          }}
        >
          <Text style={styles.description}>
            Your booking request has been sent
            successfully. The nurse will review your
            request and respond soon.
          </Text>
        </Animated.View>

        {/* Booking Status */}
        <Animated.View
          style={[
            styles.bookingCard,
            {
              opacity: bookingOpacity,
              transform: [
                {
                  translateY: bookingTranslate,
                },
              ],
            },
          ]}
        >
          <View style={styles.bookingHeader}>
            <View>
              <Text style={styles.bookingLabel}>
                BOOKING ID
              </Text>

              <Text style={styles.bookingId}>
                {bookingId}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />

              <Text style={styles.statusText}>
                Pending
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statusInfo}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>
                ⏳
              </Text>
            </View>

            <View style={styles.statusInfoContent}>
              <Text style={styles.statusInfoTitle}>
                Waiting for nurse confirmation
              </Text>

              <Text style={styles.statusInfoText}>
                You'll be notified when the nurse
                accepts your booking request.
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Next Step */}
        <Animated.View
          style={[
            styles.nextStep,
            {
              opacity: nextStepOpacity,
              transform: [
                {
                  translateY: nextStepTranslate,
                },
              ],
            },
          ]}
        >
          <View style={styles.nextStepIcon}>
            <Text style={styles.nextStepIconText}>
              →
            </Text>
          </View>

          <View style={styles.nextStepContent}>
            <Text style={styles.nextStepTitle}>
              What's next?
            </Text>

            <Text style={styles.nextStepText}>
              You can track your booking status from
              My Bookings.
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* =========================
          Bottom Actions
      ========================= */}

      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: buttonsOpacity,
            transform: [
              {
                translateY: buttonsTranslate,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleViewBookings}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            View My Bookings
          </Text>

          <View style={styles.primaryArrowContainer}>
            <Text style={styles.primaryArrow}>
              →
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleBackHome}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </Animated.View>
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
     Content
  ========================= */

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  /* =========================
     Success Icon
  ========================= */

  iconWrapper: {
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  iconPulse: {
    position: "absolute",
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: COLORS.primaryLight,
  },

  iconOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    color: COLORS.white,
    fontSize: 39,
    fontWeight: "900",
  },

  /* =========================
     Title
  ========================= */

  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },

  description: {
    maxWidth: 350,
    marginTop: 11,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  /* =========================
     Booking Card
  ========================= */

  bookingCard: {
    width: "100%",
    marginTop: 25,
    padding: 17,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bookingLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: 0.8,
  },

  bookingId: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#FFF7E6",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.warning,
    marginRight: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#A16207",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },

  /* =========================
     Status Info
  ========================= */

  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  infoIconText: {
    fontSize: 17,
  },

  statusInfoContent: {
    flex: 1,
    marginLeft: 10,
  },

  statusInfoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  statusInfoText: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.textSecondary,
    marginTop: 3,
  },

  /* =========================
     Next Step
  ========================= */

  nextStep: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 15,
    backgroundColor: COLORS.primarySoft,
  },

  nextStepIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  nextStepIconText: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  nextStepContent: {
    flex: 1,
    marginLeft: 9,
  },

  nextStepTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  nextStepText: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  /* =========================
     Bottom
  ========================= */

  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 12,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: 45,
  },

  /* =========================
     Primary Button
  ========================= */

  primaryButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  primaryArrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 9,
  },

  primaryArrow: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  /* =========================
     Secondary Button
  ========================= */

  secondaryButton: {
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 9,
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },
});