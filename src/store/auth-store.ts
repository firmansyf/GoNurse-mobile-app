import { create } from "zustand";

import type {
  NurseProfile,
  PatientProfile,
  User,
  UserRole,
} from "@/types/user";

interface AuthState {
  user: User | null;
  nurseProfile: NurseProfile | null;
  patientProfile: PatientProfile | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  setNurseProfile: (profile: NurseProfile) => void;
  setPatientProfile: (profile: PatientProfile) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  nurseProfile: null,
  patientProfile: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
    }),

  setRole: (role) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            role,
          }
        : null,
    })),

  setNurseProfile: (profile) =>
    set({
      nurseProfile: profile,
    }),

  setPatientProfile: (profile) =>
    set({
      patientProfile: profile,
    }),

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      nurseProfile: null,
      patientProfile: null,
      isAuthenticated: false,
    }),
}));