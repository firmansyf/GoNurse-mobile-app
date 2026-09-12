import { StyleSheet, Text, View } from "react-native";

export default function NurseDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Nurse 👋</Text>

      <Text style={styles.subtitle}>
        Welcome to your GoNurse dashboard.
      </Text>

      <View style={styles.status}>
        <Text>🟢 Available</Text>
      </View>
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

  status: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});