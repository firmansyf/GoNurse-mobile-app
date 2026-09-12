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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>GoNurse</Text>

      <Text style={styles.step}>STEP 1 OF 2</Text>

      <Text style={styles.title}>
        Professional Information
      </Text>

      <Text style={styles.subtitle}>
        Tell us about your nursing background.
      </Text>

      <Controller
        control={control}
        name="experience"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Years of Experience"
            placeholder="e.g. 3"
            value={value}
            onChangeText={onChange}
            keyboardType="number-pad"
            error={errors.experience?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="strNumber"
        render={({ field: { onChange, value } }) => (
          <Input
            label="STR Number"
            placeholder="Enter your STR number"
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
            error={errors.strNumber?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="specialization"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Specialization"
            placeholder="e.g. General Nursing"
            value={value}
            onChangeText={onChange}
            error={errors.specialization?.message}
          />
        )}
      />

      <View style={styles.radiusCard}>
        <Text style={styles.radiusTitle}>
          Service Radius
        </Text>

        <Text style={styles.radiusValue}>
          Up to 20 km
        </Text>

        <Text style={styles.radiusDescription}>
          Your profile can be discovered by patients
          within 20 km.
        </Text>
      </View>

      <Button
        title="Continue"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 32,
  },

  step: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#777",
    marginBottom: 8,
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
    marginTop: 8,
    marginBottom: 32,
  },

  radiusCard: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    marginBottom: 24,
  },

  radiusTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  radiusValue: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: 8,
  },

  radiusDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 4,
  },
});