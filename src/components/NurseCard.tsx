import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/constants/colors";
import type { NearbyNurse } from "@/features/nurse/utils";

interface NurseCardProps {
  nurse: NearbyNurse;
  onPress: () => void;
}

export function NurseCard({
  nurse,
  onPress,
}: NurseCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>
        {/* Avatar */}

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            🧑‍⚕️
          </Text>

          {nurse.verified && (
            <View style={styles.avatarVerified}>
              <Text style={styles.avatarVerifiedText}>
                ✓
              </Text>
            </View>
          )}
        </View>

        {/* Nurse Info */}

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text
              style={styles.name}
              numberOfLines={1}
            >
              {nurse.name}
            </Text>

            {nurse.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>
                  ✓
                </Text>

                <Text style={styles.verifiedText}>
                  Verified
                </Text>
              </View>
            )}
          </View>

          <Text
            style={styles.specialization}
            numberOfLines={1}
          >
            {nurse.specialization}
          </Text>

          {/* Rating */}

          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <Text style={styles.star}>
                ★
              </Text>

              <Text style={styles.rating}>
                {nurse.rating.toFixed(1)}
              </Text>
            </View>

            <Text style={styles.reviews}>
              {nurse.reviewCount} reviews
            </Text>

            <View style={styles.metaDivider} />

            <View style={styles.distanceContainer}>
              <Text style={styles.locationIcon}>
                📍
              </Text>

              <Text style={styles.distance}>
                {nurse.distance.toFixed(1)} km
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* =========================
          SERVICES
      ========================= */}

      {nurse.services.length > 0 && (
        <View style={styles.services}>
          {nurse.services.map(
            (service) => (
              <View
                key={service}
                style={styles.serviceBadge}
              >
                <Text
                  style={
                    styles.serviceIcon
                  }
                >
                  ✓
                </Text>

                <Text
                  style={
                    styles.serviceText
                  }
                >
                  {service}
                </Text>
              </View>
            ),
          )}
        </View>
      )}

      {/* =========================
          FOOTER
      ========================= */}

      <View style={styles.footer}>
        <Text style={styles.profileText}>
          View Profile
        </Text>

        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>
            →
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  /* =========================
     CARD
  ========================= */

  card: {
    backgroundColor:
      COLORS.surface,

    borderRadius: 18,

    padding: 16,

    marginBottom: 10,

    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 7,

    elevation: 2,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  /* =========================
     AVATAR
  ========================= */

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 18,

    backgroundColor:
      COLORS.primaryLight,

    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  avatarText: {
    fontSize: 29,
  },

  avatarVerified: {
    position: "absolute",

    right: -3,
    bottom: -3,

    width: 21,
    height: 21,

    borderRadius: 11,

    backgroundColor:
      COLORS.primary,

    borderWidth: 2,
    borderColor:
      COLORS.surface,

    alignItems: "center",
    justifyContent: "center",
  },

  avatarVerifiedText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "800",
  },

  /* =========================
     INFO
  ========================= */

  info: {
    flex: 1,
    marginLeft: 12,
    minWidth: 0,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 22,
  },

  name: {
    flexShrink: 1,

    fontSize: 16,
    fontWeight: "800",

    color: COLORS.text,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: 7,

    paddingHorizontal: 6,
    paddingVertical: 3,

    borderRadius: 8,

    backgroundColor:
      COLORS.primarySoft,
  },

  verifiedIcon: {
    width: 14,
    height: 14,

    borderRadius: 7,

    backgroundColor:
      COLORS.primary,

    color: COLORS.white,

    textAlign: "center",

    fontSize: 9,
    lineHeight: 14,

    fontWeight: "800",

    marginRight: 4,
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: "700",
    color:
      COLORS.primaryDark,
  },

  specialization: {
    marginTop: 4,

    fontSize: 13,

    color:
      COLORS.textSecondary,
  },

  /* =========================
     META
  ========================= */

  metaRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,

    flexWrap: "wrap",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    fontSize: 13,
    color: "#F59E0B",
    marginRight: 3,
  },

  rating: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  reviews: {
    marginLeft: 4,

    fontSize: 11,

    color:
      COLORS.textMuted,
  },

  metaDivider: {
    width: 3,
    height: 3,

    borderRadius: 2,

    backgroundColor:
      COLORS.textMuted,

    marginHorizontal: 8,
  },

  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    fontSize: 10,
    marginRight: 3,
  },

  distance: {
    fontSize: 11,
    fontWeight: "600",
    color:
      COLORS.textSecondary,
  },

  /* =========================
     SERVICES
  ========================= */

  services: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 6,

    marginTop: 15,

    paddingTop: 13,

    borderTopWidth: 1,
    borderTopColor:
      COLORS.border,
  },

  serviceBadge: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor:
      COLORS.primarySoft,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 10,
  },

  serviceIcon: {
    fontSize: 9,
    fontWeight: "800",

    color:
      COLORS.primary,

    marginRight: 4,
  },

  serviceText: {
    fontSize: 10,

    fontWeight: "700",

    color:
      COLORS.primaryDark,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "flex-end",

    marginTop: 14,
  },

  profileText: {
    fontSize: 12,

    fontWeight: "800",

    color:
      COLORS.primaryDark,
  },

  arrowContainer: {
    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor:
      COLORS.primaryLight,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 7,
  },

  arrow: {
    fontSize: 16,

    fontWeight: "800",

    color:
      COLORS.primaryDark,
  },
});