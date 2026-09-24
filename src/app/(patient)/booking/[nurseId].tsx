import DateTimePicker from "@react-native-community/datetimepicker";
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

import { COLORS } from "@/constants/colors";
import { dummyNurses } from "@/features/nurse/data";

export default function BookingScreen() {
  const router = useRouter();

  const { nurseId } =
    useLocalSearchParams<{ nurseId: string }>();

  const nurse = dummyNurses.find(
    (item) => item.id === nurseId,
  );

  /* =========================
     Form State
  ========================= */

  const [selectedService, setSelectedService] =
    useState<string>("");

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [selectedTime, setSelectedTime] =
    useState<Date | null>(null);

  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  /* =========================
     Picker State
  ========================= */

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showTimePicker, setShowTimePicker] =
    useState(false);

  /* =========================
     Format Helpers
  ========================= */

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================
     Handle Date
  ========================= */

  const handleDateChange = (
    event: any,
    date?: Date,
  ) => {
    if (Platform.OS !== "ios") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  };

  /* =========================
     Handle Time
  ========================= */

  const handleTimeChange = (
    event: any,
    time?: Date,
  ) => {
    if (Platform.OS !== "ios") {
      setShowTimePicker(false);
    }

    if (time) {
      setSelectedTime(time);
    }
  };

  /* =========================
     Continue
  ========================= */

  const handleContinue = () => {
    if (!selectedService) {
      Alert.alert(
        "Service Required",
        "Please select a nursing service.",
      );
      return;
    }

    if (!selectedDate) {
      Alert.alert(
        "Date Required",
        "Please select your preferred date.",
      );
      return;
    }

    if (!selectedTime) {
      Alert.alert(
        "Time Required",
        "Please select your preferred time.",
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
        nurseId: nurse?.id,
        service: selectedService,
        date: formatDate(selectedDate),
        time: formatTime(selectedTime),
        address,
        notes,
      },
    });
  };

  /* =========================
     Nurse Not Found
  ========================= */

  if (!nurse) {
    return (
      <View style={styles.center}>
        <View style={styles.notFoundIcon}>
          <Text style={styles.notFoundIconText}>
            ?
          </Text>
        </View>

        <Text style={styles.notFound}>
          Nurse tidak ditemukan
        </Text>

        <Text style={styles.notFoundDescription}>
          Data nurse yang kamu pilih tidak tersedia.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Text style={styles.backButtonText}>
            Kembali
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      {/* =========================
          Header
      ========================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Book Nurse
        </Text>

        <View style={styles.headerPlaceholder} />
      </View>

      {/* =========================
          Content
      ========================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro */}

        <View style={styles.intro}>
          <Text style={styles.title}>
            Schedule nursing care
          </Text>

          <Text style={styles.subtitle}>
            Fill in the details below to request
            nursing care from your selected nurse.
          </Text>
        </View>

        {/* =========================
            Selected Nurse
        ========================= */}

        <View style={styles.nurseCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                👩‍⚕️
              </Text>
            </View>

            {nurse.verified && (
              <View style={styles.avatarVerified}>
                <Text style={styles.avatarVerifiedText}>
                  ✓
                </Text>
              </View>
            )}
          </View>

          <View style={styles.nurseInfo}>
            <View style={styles.nameRow}>
              <Text
                style={styles.nurseName}
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

            <Text style={styles.specialization}>
              {nurse.specialization}
            </Text>

            <View style={styles.ratingRow}>
              <Text style={styles.star}>★</Text>

              <Text style={styles.rating}>
                {nurse.rating.toFixed(1)}
              </Text>

              <Text style={styles.reviews}>
                ({nurse.reviewCount} reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* =========================
            Service
        ========================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Select Service
              </Text>

              <Text style={styles.sectionSubtitle}>
                Choose the service you need
              </Text>
            </View>

            <View style={styles.requiredBadge}>
              <Text style={styles.requiredText}>
                Required
              </Text>
            </View>
          </View>

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
                      styles.serviceIcon,
                      isSelected &&
                        styles.serviceIconSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.serviceIconText,
                        isSelected &&
                          styles.serviceIconTextSelected,
                      ]}
                    >
                      ✓
                    </Text>
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

                  <View
                    style={[
                      styles.radio,
                      isSelected &&
                        styles.radioSelected,
                    ]}
                  >
                    {isSelected && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* =========================
            Preferred Date
        ========================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferred Date
          </Text>

          <Text style={styles.sectionSubtitle}>
            When would you like the nurse to visit?
          </Text>

          <TouchableOpacity
            style={[
              styles.pickerButton,
              selectedDate &&
                styles.pickerButtonSelected,
            ]}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.8}
          >
            <View style={styles.pickerIcon}>
              <Text style={styles.pickerIconText}>
                📅
              </Text>
            </View>

            <View style={styles.pickerContent}>
              <Text
                style={[
                  styles.pickerValue,
                  !selectedDate &&
                    styles.pickerPlaceholder,
                ]}
              >
                {selectedDate
                  ? formatDate(selectedDate)
                  : "Select preferred date"}
              </Text>

              <Text style={styles.pickerHint}>
                Choose your visit date
              </Text>
            </View>

            <Text style={styles.pickerArrow}>
              ›
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate ?? new Date()}
              mode="date"
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              minimumDate={new Date()}
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* =========================
            Preferred Time
        ========================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Preferred Time
          </Text>

          <Text style={styles.sectionSubtitle}>
            Select your preferred visit time
          </Text>

          <TouchableOpacity
            style={[
              styles.pickerButton,
              selectedTime &&
                styles.pickerButtonSelected,
            ]}
            onPress={() => setShowTimePicker(true)}
            activeOpacity={0.8}
          >
            <View style={styles.pickerIcon}>
              <Text style={styles.pickerIconText}>
                🕐
              </Text>
            </View>

            <View style={styles.pickerContent}>
              <Text
                style={[
                  styles.pickerValue,
                  !selectedTime &&
                    styles.pickerPlaceholder,
                ]}
              >
                {selectedTime
                  ? formatTime(selectedTime)
                  : "Select preferred time"}
              </Text>

              <Text style={styles.pickerHint}>
                Choose your visit time
              </Text>
            </View>

            <Text style={styles.pickerArrow}>
              ›
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime ?? new Date()}
              mode="time"
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* =========================
            Service Address
        ========================= */}

        <View style={styles.section}>
          <View style={styles.titleRow}>
            <View style={styles.addressTitleContainer}>
              <Text style={styles.sectionTitle}>
                Service Address
              </Text>

              <Text style={styles.sectionSubtitle}>
                Where should the nurse come?
              </Text>
            </View>

            <TouchableOpacity
              style={styles.locationButton}
              onPress={() =>
                setAddress("My current location")
              }
              activeOpacity={0.8}
            >
              <Text style={styles.locationButtonIcon}>
                📍
              </Text>

              <Text style={styles.useLocation}>
                Use my location
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your service address"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={[
              styles.input,
              styles.addressInput,
            ]}
          />
        </View>

        {/* =========================
            Notes
        ========================= */}

        <View style={styles.section}>
          <View style={styles.notesHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Notes
              </Text>

              <Text style={styles.sectionSubtitle}>
                Tell the nurse anything they should know
              </Text>
            </View>

            <Text style={styles.optionalText}>
              Optional
            </Text>
          </View>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Describe your needs or additional information"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[
              styles.input,
              styles.notesInput,
            ]}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* =========================
          Bottom CTA
      ========================= */}

      <View style={styles.bottomContainer}>
        <View style={styles.bottomHint}>
          <View style={styles.bottomCheck}>
            <Text style={styles.bottomCheckText}>
              ✓
            </Text>
          </View>

          <Text style={styles.bottomHintText}>
            Review your booking before confirming
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>
            Continue
          </Text>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>
              →
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
     Not Found
  ========================= */

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },

  notFoundIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  notFoundIconText: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  notFound: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },

  notFoundDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },

  backButton: {
    paddingHorizontal: 26,
    paddingVertical: 13,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
  },

  backButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  /* =========================
     Header
  ========================= */

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primarySoft,
  },

  backIcon: {
    fontSize: 30,
    lineHeight: 32,
    color: COLORS.primaryDark,
    marginTop: -2,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
  },

  headerPlaceholder: {
    width: 40,
  },

  /* =========================
     Content
  ========================= */

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 145,
  },

  intro: {
    marginBottom: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textSecondary,
    marginTop: 6,
    maxWidth: 340,
  },

  /* =========================
     Nurse Card
  ========================= */

  nurseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 34,
  },

  avatarVerified: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarVerifiedText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "900",
  },

  nurseInfo: {
    flex: 1,
    marginLeft: 13,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nurseName: {
    flexShrink: 1,
    fontSize: 17,
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
    backgroundColor: COLORS.primarySoft,
  },

  verifiedIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    textAlign: "center",
    fontSize: 9,
    lineHeight: 14,
    fontWeight: "900",
    marginRight: 4,
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  specialization: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  star: {
    fontSize: 13,
    color: "#F59E0B",
    marginRight: 4,
  },

  rating: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  reviews: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginLeft: 4,
  },

  /* =========================
     Sections
  ========================= */

  section: {
    marginBottom: 26,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },

  requiredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#FFF7E6",
  },

  requiredText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#B7791F",
  },

  /* =========================
     Service
  ========================= */

  serviceList: {
    gap: 9,
  },

  serviceOption: {
    minHeight: 60,
    paddingHorizontal: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
  },

  serviceOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },

  serviceIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  serviceIconSelected: {
    backgroundColor: COLORS.primary,
  },

  serviceIconText: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.primary,
  },

  serviceIconTextSelected: {
    color: COLORS.white,
  },

  serviceOptionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },

  serviceOptionTextSelected: {
    color: COLORS.primaryDark,
    fontWeight: "800",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: COLORS.primary,
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  /* =========================
     Date & Time Picker
  ========================= */

  pickerButton: {
    minHeight: 66,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
  },

  pickerButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primarySoft,
  },

  pickerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  pickerIconText: {
    fontSize: 17,
  },

  pickerContent: {
    flex: 1,
    marginLeft: 11,
  },

  pickerValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },

  pickerPlaceholder: {
    color: COLORS.textMuted,
    fontWeight: "600",
  },

  pickerHint: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 3,
  },

  pickerArrow: {
    fontSize: 27,
    fontWeight: "300",
    color: COLORS.textMuted,
    marginLeft: 8,
  },

  /* =========================
     Input
  ========================= */

  input: {
    minHeight: 54,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    fontSize: 14,
    color: COLORS.text,
  },

  addressInput: {
    minHeight: 100,
    paddingTop: 14,
  },

  notesInput: {
    minHeight: 110,
    paddingTop: 14,
  },

  /* =========================
     Address
  ========================= */

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 1,
  },

  addressTitleContainer: {
    flex: 1,
  },

  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: COLORS.primarySoft,
    marginLeft: 8,
  },

  locationButtonIcon: {
    fontSize: 10,
    marginRight: 3,
  },

  useLocation: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  /* =========================
     Notes
  ========================= */

  notesHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  optionalText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textMuted,
    marginTop: 3,
  },

  bottomSpacing: {
    height: 20,
  },

  /* =========================
     Bottom CTA
  ========================= */

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 22,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  bottomHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  bottomCheck: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  bottomCheckText: {
    fontSize: 9,
    fontWeight: "900",
    color: COLORS.primary,
  },

  bottomHintText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },

  continueButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,
  },

  continueText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 9,
  },

  arrow: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },
});