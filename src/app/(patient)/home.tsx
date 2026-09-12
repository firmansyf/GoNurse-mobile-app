import { StyleSheet, Text, View } from "react-native";

export default function PatientHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GoNurse 👋</Text>

      <Text style={styles.subtitle}>
        Find a nurse near you.
      </Text>

      <Text style={styles.location}>
        📍 Within 20 km
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },

  location: {
    marginTop: 32,
    fontSize: 16,
  },
});