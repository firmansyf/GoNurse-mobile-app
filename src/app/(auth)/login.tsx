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
import {
  loginSchema,
  type LoginForm,
} from "@/features/auth/validation";
import { useAuthStore } from "@/store/auth-store";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

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

    // Temporary authentication.
    // Will be replaced with API later.
    login({
      id: "user-001",
      name: "Yusuf",
      email: data.email,
      role: "patient",
    });

    router.replace("/(patient)/home");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.back}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>GoNurse</Text>

        <Text style={styles.title}>Welcome back 👋</Text>

        <Text style={styles.subtitle}>
          Login to find a trusted nurse near you.
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="you@example.com"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Password"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View style={styles.bottom}>
        <Text>Don't have an account? </Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.register}>
            Create account
          </Text>
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
    justifyContent: "space-between",
  },

  back: {
    marginBottom: 40,
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
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginTop: 8,
    marginBottom: 32,
  },

  forgot: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "600",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 16,
    backgroundColor: 'red'
  },

  register: {
    fontWeight: "700",
  },
});