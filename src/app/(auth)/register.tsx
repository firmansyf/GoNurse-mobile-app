import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { COLORS } from "@/constants/colors";
import {
  registerSchema,
  type RegisterForm,
} from "@/features/auth/validation";

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterForm) => {
    console.log("Register data:", data);

    router.push("/(auth)/choose-role");
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* =========================
            HEADER
        ========================= */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>
              ←
            </Text>

            <Text style={styles.backText}>
              Back
            </Text>
          </TouchableOpacity>

          <Text style={styles.logo}>
            GoNurse
          </Text>
        </View>

        {/* =========================
            INTRO
        ========================= */}

        <View style={styles.intro}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              ✨
            </Text>
          </View>

          <Text style={styles.title}>
            Create your account
          </Text>

          <Text style={styles.subtitle}>
            Join GoNurse and get trusted care
            near you.
          </Text>
        </View>

        {/* =========================
            FORM
        ========================= */}

        <View style={styles.form}>
          {/* Full Name */}

          <Controller
            control={control}
            name="name"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                autoCorrect={false}
                error={
                  errors.name?.message
                }
              />
            )}
          />

          {/* Email */}

          <Controller
            control={control}
            name="email"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Email"
                placeholder="you@example.com"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={
                  errors.email?.message
                }
              />
            )}
          />

          {/* Phone */}

          <Controller
            control={control}
            name="phone"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Phone Number"
                placeholder="08xxxxxxxxxx"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                error={
                  errors.phone?.message
                }
              />
            )}
          />

          {/* Password */}

          <Controller
            control={control}
            name="password"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Password"
                placeholder="Minimum 8 characters"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={
                  errors.password?.message
                }
              />
            )}
          />

          {/* Confirm Password */}

          <Controller
            control={control}
            name="confirmPassword"
            render={({
              field: {
                onChange,
                value,
              },
            }) => (
              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={
                  errors.confirmPassword?.message
                }
              />
            )}
          />
        </View>

        {/* =========================
            CONTINUE
        ========================= */}

        <View style={styles.buttonContainer}>
          <Button
            title="Continue"
            onPress={handleSubmit(
              onSubmit,
            )}
          />
        </View>

        {/* =========================
            LOGIN
        ========================= */}

        <View style={styles.loginContainer}>
          <Text style={styles.loginLabel}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push(
                "/(auth)/login",
              )
            }
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* =========================
            TRUST MESSAGE
        ========================= */}

        {/* <View style={styles.trustCard}>
          <View style={styles.trustIcon}>
            <Text style={styles.trustCheck}>
              ✓
            </Text>
          </View>

          <View style={styles.trustContent}>
            <Text style={styles.trustTitle}>
              Your information is safe
            </Text>

            <Text style={styles.trustText}>
              We use your information to create
              and manage your GoNurse account.
            </Text>
          </View>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 30,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },

  backIcon: {
    fontSize: 20,
    color: COLORS.text,
    marginRight: 5,
  },

  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primaryDark,
    letterSpacing: -0.6,
  },

  /* =========================
     INTRO
  ========================= */

  intro: {
    marginTop: 32,
    marginBottom: 24,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  icon: {
    fontSize: 21,
  },

  title: {
    fontSize: 31,
    lineHeight: 38,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  /* =========================
     FORM
  ========================= */

  form: {
    width: "100%",
  },

  /* =========================
     BUTTON
  ========================= */

  buttonContainer: {
    marginTop: 10,
  },

  /* =========================
     LOGIN
  ========================= */

  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 22,
    marginBottom: 30,
  },

  loginLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  loginText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginLeft: 5,
  },

  /* =========================
     TRUST CARD
  ========================= */

  trustCard: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 25,
    padding: 14,

    borderRadius: 16,

    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },

  trustIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",
  },

  trustCheck: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  trustContent: {
    flex: 1,
    marginLeft: 10,
  },

  trustTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
  },

  trustText: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});