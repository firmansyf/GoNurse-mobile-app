import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import {
  getCurrentLocation,
  requestLocationPermission,
} from "@/services/location";
import { useAuthStore } from "@/store/auth-store";

export default function PatientProfileScreen() {
  const setPatientProfile = useAuthStore(
    (state) => state.setPatientProfile,
  );

  const [loading, setLoading] = useState(false);

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

      const location = await getCurrentLocation();

      setPatientProfile({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      router.replace("/(patient)/home");
    } catch (error) {
      console.error(error);

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
      <Text style={styles.logo}>GoNurse</Text>

      <Text style={styles.title}>
        Find nurses near you
      </Text>

      <Text style={styles.subtitle}>
        GoNurse uses your location to find trusted nurses
        within a 20 km radius.
      </Text>

      <View style={styles.locationCard}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <View style={styles.locationContent}>
          <Text style={styles.locationTitle}>
            Your location
          </Text>

          <Text style={styles.locationDescription}>
            Your location is only used to find nurses
            nearby.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.buttonDisabled,
        ]}
        onPress={handleContinue}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            Allow Location
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    justifyContent: "center",
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginTop: 10,
    marginBottom: 32,
  },

  locationCard: {
    flexDirection: "row",
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 26,
  },

  locationContent: {
    flex: 1,
    marginLeft: 14,
  },

  locationTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  locationDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    marginTop: 4,
  },

  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});