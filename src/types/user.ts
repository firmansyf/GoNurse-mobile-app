export type UserRole = "patient" | "nurse";

export type VerificationStatus =
  | "pending"
  | "under_review"
  | "verified"
  | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface NurseProfile {
  experience: number;
  licenseNumber: string;
  specialization: string;

  strNumber: string;
  strDocumentUri: string | null;
  diplomaDocumentUri: string | null;

  services: string[];
  serviceRadiusKm: number;

  verificationStatus: VerificationStatus;
}

export interface PatientProfile {
  address?: string;
  latitude?: number;
  longitude?: number;
}