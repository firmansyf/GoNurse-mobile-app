import { router } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useAuthStore } from "@/store/auth-store";

export default function PatientProfileScreen() {
  const setPatientProfile = useAuthStore(
    (state) => state.setPatientProfile,
  );

  const handleContinue = () => {
    setPatientProfile({});

    router.replace("/(patient)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GoNurse</Text>

      <Text style={styles.title}>
        Let's get you started
      </Text>

      <Text style={styles.subtitle}>
        GoNurse uses your location to find nurses near you.
      </Text>

      <View style={styles.locationCard}>
        <Text style={styles.icon}>📍</Text>

        <View style={styles.locationContent}>
          <Text style={styles.locationTitle}>
            Location access
          </Text>

          <Text style={styles.locationDescription}>
            Your location will be used to find nurses within
            20 km of you.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
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

  icon: {
    fontSize: 28,
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

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});