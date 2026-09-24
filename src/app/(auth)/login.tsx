import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { COLORS } from "@/constants/colors";
import {
  loginSchema,
  type LoginForm,
} from "@/features/auth/validation";
import { useAuthStore } from "@/store/auth-store";

export default function LoginScreen() {
  const login = useAuthStore(
    (state) => state.login,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login data:", data);

    const email = data.email
      .trim()
      .toLowerCase();

    /**
     * ============================================
     * TEMPORARY DEVELOPMENT LOGIN
     * ============================================
     *
     * Patient:
     * patient@gonurse.com
     *
     * Nurse:
     * nurse@gonurse.com
     *
     * Password:
     * bebas untuk sekarang
     *
     * Nanti bagian ini akan diganti
     * dengan authentication dari backend.
     */

    if (email === "nurse@gonurse.com") {
      console.log("🔵 Login as NURSE");

      login({
        id: "nurse-001",
        name: "Siti Rahma",
        email,
        role: "nurse",
      });

      router.replace("/(nurse)/dashboard");

      return;
    }

    console.log("🟢 Login as PATIENT");

    login({
      id: "patient-001",
      name: "Yusuf",
      email,
      role: "patient",
    });

    router.replace("/(patient)/home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Text style={styles.backIcon}>←</Text>

          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.logo}>
          GoNurse
        </Text>
      </View>

      {/* Main */}
      <View style={styles.content}>
        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>👋</Text>
          </View>

          <Text style={styles.title}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Login to find trusted nurses near you
            and manage your care.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
                placeholder="Enter your password"
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

          <TouchableOpacity
            style={styles.forgotButton}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <View style={styles.loginButton}>
            <Button
              title="Login"
              onPress={handleSubmit(
                onSubmit,
              )}
            />
          </View>
        </View>

        {/* Register */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerLabel}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push(
                "/(auth)/register",
              )
            }
            activeOpacity={0.7}
          >
            <Text style={styles.register}>
              Create account
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      {/* <View style={styles.footer}>
        <View style={styles.trustIcon}>
          <Text style={styles.trustCheck}>
            ✓
          </Text>
        </View>

        <Text style={styles.footerText}>
          Professional nursing care, closer to you.
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 25,
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
     CONTENT
  ========================= */

  content: {
    flex: 1,
    justifyContent: "center",
  },

  /* =========================
     INTRO
  ========================= */

  intro: {
    marginBottom: 25,
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
    fontSize: 22,
  },

  title: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.textSecondary,
    marginTop: 8,
    maxWidth: 340,
  },

  /* =========================
     FORM
  ========================= */

  form: {
    width: "100%",
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: 16,
    paddingVertical: 4,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },

  loginButton: {
    width: "100%",
  },

  /* =========================
     REGISTER
  ========================= */

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 25,
  },

  registerLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  register: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginLeft: 5,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },

  trustIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  trustCheck: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  footerText: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
});