import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { COLORS } from "@/constants/colors";
import {
  nurseProfileSchema,
  type NurseProfileForm,
} from "@/features/auth/validation";
import { useAuthStore } from "@/store/auth-store";

export default function NurseProfileScreen() {
  const setNurseProfile = useAuthStore(
    (state) => state.setNurseProfile,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NurseProfileForm>({
    resolver: zodResolver(nurseProfileSchema),
    defaultValues: {
      experience: "",
      strNumber: "",
      specialization: "",
    },
  });

  const onSubmit = (data: NurseProfileForm) => {
    setNurseProfile({
      experience: Number(data.experience),
      licenseNumber: data.strNumber,
      specialization: data.specialization,
      strNumber: data.strNumber,
      strDocumentUri: null,
      diplomaDocumentUri: null,
      services: [],
      serviceRadiusKm: 20,
      verificationStatus: "pending",
    });

    router.push("/(auth)/nurse-documents");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* ==================================================
            BRAND
        ================================================== */}

        <View style={styles.brandRow}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoIconText}>
              +
            </Text>
          </View>

          <Text style={styles.logo}>
            GoNurse
          </Text>
        </View>

        {/* ==================================================
            PROGRESS
        ================================================== */}

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.stepLabel}>
              STEP 1 OF 2
            </Text>

            <Text style={styles.stepPercent}>
              50%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        {/* ==================================================
            TITLE
        ================================================== */}

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>
              🩺
            </Text>
          </View>

          <Text style={styles.title}>
            Professional{"\n"}
            Information
          </Text>

          <Text style={styles.subtitle}>
            Tell us about your nursing background
            to help patients understand your
            professional experience.
          </Text>
        </View>

        {/* ==================================================
            FORM CARD
        ================================================== */}

        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <View style={styles.formHeaderIcon}>
              <Text style={styles.formHeaderIconText}>
                ✓
              </Text>
            </View>

            <View style={styles.formHeaderContent}>
              <Text style={styles.formTitle}>
                Professional Details
              </Text>

              <Text style={styles.formSubtitle}>
                Please provide accurate information
              </Text>
            </View>
          </View>

          {/* Experience */}

          <Controller
            control={control}
            name="experience"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Years of Experience"
                placeholder="e.g. 3"
                value={value}
                onChangeText={onChange}
                keyboardType="number-pad"
                error={
                  errors.experience?.message
                }
              />
            )}
          />

          {/* STR */}

          <Controller
            control={control}
            name="strNumber"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="STR Number"
                placeholder="Enter your STR number"
                value={value}
                onChangeText={onChange}
                autoCapitalize="characters"
                error={
                  errors.strNumber?.message
                }
              />
            )}
          />

          {/* Specialization */}

          <Controller
            control={control}
            name="specialization"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Specialization"
                placeholder="e.g. General Nursing"
                value={value}
                onChangeText={onChange}
                error={
                  errors.specialization?.message
                }
              />
            )}
          />
        </View>

        {/* ==================================================
            SERVICE RADIUS
        ================================================== */}

        <View style={styles.radiusCard}>
          <View style={styles.radiusTop}>
            <View style={styles.radiusIcon}>
              <Text style={styles.radiusIconText}>
                📍
              </Text>
            </View>

            <View style={styles.radiusHeader}>
              <Text style={styles.radiusTitle}>
                Service Radius
              </Text>

              <Text style={styles.radiusSmallText}>
                Your coverage area
              </Text>
            </View>

            <View style={styles.radiusBadge}>
              <Text style={styles.radiusBadgeText}>
                MAX
              </Text>
            </View>
          </View>

          <View style={styles.radiusValueContainer}>
            <Text style={styles.radiusValue}>
              20
            </Text>

            <Text style={styles.radiusUnit}>
              km
            </Text>
          </View>

          <Text style={styles.radiusDescription}>
            Your profile can be discovered by
            patients within a maximum radius of
            20 km.
          </Text>
        </View>

        {/* ==================================================
            VERIFICATION INFO
        ================================================== */}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>
              🔒
            </Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Verification Required
            </Text>

            <Text style={styles.infoText}>
              Your STR and nursing diploma will be
              verified in the next step before your
              profile becomes available to patients.
            </Text>
          </View>
        </View>

        {/* ==================================================
            CONTINUE
        ================================================== */}

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <Text style={styles.footerText}>
          You can update your professional information
          later from your profile.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  /* ========================================================
     CONTAINER
  ======================================================== */

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 40,
  },

  /* ========================================================
     BRAND
  ======================================================== */

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  logoIconText: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "800",
  },

  logo: {
    fontSize: 21,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },

  /* ========================================================
     PROGRESS
  ======================================================== */

  progressSection: {
    marginBottom: 32,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stepLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 1,
  },

  stepPercent: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.textMuted,
  },

  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.primaryLight,
    overflow: "hidden",
  },

  progressFill: {
    width: "50%",
    height: "100%",
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },

  /* ========================================================
     HERO
  ======================================================== */

  hero: {
    marginBottom: 25,
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  heroIconText: {
    fontSize: 25,
  },

  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
    maxWidth: 350,
  },

  /* ========================================================
     FORM
  ======================================================== */

  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,

    marginBottom: 15,
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  formHeaderIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  formHeaderIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  formHeaderContent: {
    marginLeft: 10,
  },

  formTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  formSubtitle: {
    marginTop: 2,
    fontSize: 10,
    color: COLORS.textMuted,
  },

  /* ========================================================
     RADIUS
  ======================================================== */

  radiusCard: {
    backgroundColor: COLORS.primarySoft,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    marginBottom: 15,
  },

  radiusTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  radiusIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  radiusIconText: {
    fontSize: 18,
  },

  radiusHeader: {
    flex: 1,
    marginLeft: 10,
  },

  radiusTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  radiusSmallText: {
    marginTop: 2,
    fontSize: 10,
    color: COLORS.textSecondary,
  },

  radiusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
  },

  radiusBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  radiusValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 17,
  },

  radiusValue: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },

  radiusUnit: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  radiusDescription: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.textSecondary,
  },

  /* ========================================================
     INFO
  ======================================================== */

  infoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 22,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  infoIconText: {
    fontSize: 16,
  },

  infoContent: {
    flex: 1,
    marginLeft: 10,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  infoText: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 16,
    color: COLORS.textSecondary,
  },

  /* ========================================================
     BUTTON
  ======================================================== */

  buttonContainer: {
    marginTop: 2,
  },

  footerText: {
    marginTop: 13,
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 9,
    lineHeight: 14,
    color: COLORS.textMuted,
  },
});