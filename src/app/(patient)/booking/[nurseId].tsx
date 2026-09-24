import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { dummyNurses } from "@/features/nurse/data";

export default function BookingScreen() {
  const router = useRouter();

  const { nurseId } =
    useLocalSearchParams<{ nurseId: string }>();

  const nurse = dummyNurses.find(
    (item) => item.id === nurseId,
  );

  const [selectedService, setSelectedService] =
    useState<string>("");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [address, setAddress] = useState("");

  const [notes, setNotes] = useState("");

  if (!nurse) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Nurse tidak ditemukan.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleContinue = () => {
    if (!selectedService) {
      Alert.alert(
        "Service Required",
        "Please select a nursing service.",
      );
      return;
    }

    if (!date.trim()) {
      Alert.alert(
        "Date Required",
        "Please enter your preferred date.",
      );
      return;
    }

    if (!time.trim()) {
      Alert.alert(
        "Time Required",
        "Please enter your preferred time.",
      );
      return;
    }

    if (!address.trim()) {
      Alert.alert(
        "Address Required",
        "Please enter your service address.",
      );
      return;
    }

    router.push({
      pathname: "/booking/summary",
      params: {
        nurseId: nurse.id,
        service: selectedService,
        date,
        time,
        address,
        notes,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => router.back()}
        >
          <Text style={styles.backIconText}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Book Nurse
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Nurse */}
        <View style={styles.nurseCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              👩‍⚕️
            </Text>
          </View>

          <View style={styles.nurseInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.nurseName}>
                {nurse.name}
              </Text>

              {nurse.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>
                    ✓
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.specialization}>
              {nurse.specialization}
            </Text>

            <Text style={styles.rating}>
              ⭐ {nurse.rating} ({nurse.reviewCount}{" "}
              reviews)
            </Text>
          </View>
        </View>

        {/* Service */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Select Service
          </Text>

          <Text style={styles.required}>
            Choose the service you need
          </Text>

          <View style={styles.serviceList}>
            {nurse.services.map((service) => {
              const isSelected =
                selectedService === service;

              return (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.serviceOption,
                    isSelected &&
                      styles.serviceOptionSelected,
                  ]}
                  onPress={() =>
                    setSelectedService(service)
                  }
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.radio,
                      isSelected &&
                        styles.radioSelected,
                    ]}
                  >
                    {isSelected && (
                      <View
                        style={styles.radioDot}
                      />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.serviceOptionText,
                      isSelected &&
                        styles.serviceOptionTextSelected,
                    ]}
                  >
                    {service}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferred Date
          </Text>

          <TextInput
            value={date}
            onChangeText={setDate}
            placeholder="e.g. 20 September 2026"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {/* Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferred Time
          </Text>

          <TextInput
            value={time}
            onChangeText={setTime}
            placeholder="e.g. 10:00 AM"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {/* Address */}
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>
              Service Address
            </Text>

            <TouchableOpacity
              onPress={() =>
                setAddress("My current location")
              }
            >
              <Text style={styles.useLocation}>
                Use my location
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your service address"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={[
              styles.input,
              styles.addressInput,
            ]}
          />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Notes
          </Text>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Describe your needs or additional information (optional)"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[
              styles.input,
              styles.notesInput,
            ]}
          />
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Continue */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>
            Continue
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  notFound: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#111111",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  // Header

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  backIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  backIconText: {
    fontSize: 30,
    lineHeight: 32,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  headerPlaceholder: {
    width: 40,
  },

  // Content

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },

  // Nurse card

  nurseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#F7F7F7",
    marginBottom: 28,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 34,
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 14,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nurseName: {
    fontSize: 18,
    fontWeight: "800",
  },

  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  verifiedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  specialization: {
    marginTop: 4,
    fontSize: 14,
    color: "#666666",
  },

  rating: {
    marginTop: 6,
    fontSize: 13,
    color: "#555555",
  },

  // Sections

  section: {
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  required: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 12,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  useLocation: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111111",
  },

  // Services

  serviceList: {
    gap: 10,
  },

  serviceOption: {
    minHeight: 56,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
  },

  serviceOptionSelected: {
    borderColor: "#111111",
    backgroundColor: "#F5F5F5",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#BBBBBB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  radioSelected: {
    borderColor: "#111111",
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111111",
  },

  serviceOptionText: {
    fontSize: 15,
    color: "#555555",
    fontWeight: "600",
  },

  serviceOptionTextSelected: {
    color: "#111111",
    fontWeight: "700",
  },

  // Inputs

  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "#111111",
  },

  addressInput: {
    minHeight: 100,
    paddingTop: 14,
  },

  notesInput: {
    minHeight: 110,
    paddingTop: 14,
  },

  bottomSpacing: {
    height: 20,
  },

  // Bottom button

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },

  continueButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 22,
    marginLeft: 10,
  },
});