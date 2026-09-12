import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChooseRoleScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.back}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.logo}>GoNurse</Text>

        <Text style={styles.title}>
          How will you use GoNurse?
        </Text>

        <Text style={styles.subtitle}>
          Choose the account type that best describes you.
        </Text>
      </View>

      <View style={styles.roles}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(auth)/patient-profile")}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👤</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Patient</Text>

            <Text style={styles.cardDescription}>
              Find and book trusted nurses near you.
            </Text>
          </View>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(auth)/nurse-profile")}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🧑‍⚕️</Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Nurse</Text>

            <Text style={styles.cardDescription}>
              Provide professional nursing services.
            </Text>
          </View>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },

  back: {
    marginBottom: 32,
  },

  backText: {
    fontSize: 16,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 32,
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
  },

  roles: {
    marginTop: 48,
    gap: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 18,
    padding: 18,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 28,
  },

  cardContent: {
    flex: 1,
    marginLeft: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    marginTop: 4,
  },

  arrow: {
    fontSize: 22,
    marginLeft: 12,
  },
});