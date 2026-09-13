import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🧑‍⚕️</Text>
        </View>

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
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

          <View style={styles.metaRow}>
            <Text style={styles.rating}>
              ⭐ {nurse.rating.toFixed(1)}
            </Text>

            <Text style={styles.reviews}>
              ({nurse.reviewCount} reviews)
            </Text>

            <Text style={styles.distance}>
              📍 {nurse.distance.toFixed(1)} km
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.services}>
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

      <View style={styles.footer}>
        <Text style={styles.profileText}>
          View Profile
        </Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  header: {
    flexDirection: "row",
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 28,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
  },

  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  verifiedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  specialization: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    flexWrap: "wrap",
  },

  rating: {
    fontSize: 13,
    fontWeight: "700",
  },

  reviews: {
    marginLeft: 4,
    fontSize: 12,
    color: "#777",
  },

  distance: {
    marginLeft: 10,
    fontSize: 12,
    color: "#555",
  },

  services: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    gap: 6,
  },

  serviceBadge: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  serviceText: {
    fontSize: 12,
    color: "#444",
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 14,
  },

  profileText: {
    fontSize: 14,
    fontWeight: "700",
  },

  arrow: {
    marginLeft: 6,
    fontSize: 18,
    fontWeight: "700",
  },
});