import type { Nurse } from "@/features/nurse/data";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "on_the_way"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;

  nurseId: string;
  patientId: string;
  nurse: Nurse;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}