import { create } from "zustand";

import type {
  Booking,
  BookingStatus,
} from "@/types/booking";

interface CreateBookingInput {
  nurseId: string;
  patientId: string;
  nurse: Booking["nurse"];
  service: string;

  date: string;
  time: string;
  address: string;
  notes: string;
}

interface BookingState {
  bookings: Booking[];

  createBooking: (
    input: CreateBookingInput,
  ) => Booking;

  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus,
  ) => void;

  getBookingById: (
    bookingId: string,
  ) => Booking | undefined;

  // Get bookings assigned to a specific nurse
  getBookingsByNurseId: (
    nurseId: string,
  ) => Booking[];
}

export const useBookingStore =
  create<BookingState>((set, get) => ({
    bookings: [],

    // =====================================================
    // CREATE BOOKING
    // =====================================================

    createBooking: (input) => {
      const booking: Booking = {
        id: `booking-${Date.now()}`,

        nurseId: input.nurseId,

        patientId: input.patientId,

        nurse: input.nurse,

        service: input.service,

        date: input.date,

        time: input.time,

        address: input.address,

        notes: input.notes,

        status: "pending",

        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        bookings: [
          booking,
          ...state.bookings,
        ],
      }));

      return booking;
    },

    // =====================================================
    // UPDATE BOOKING STATUS
    // =====================================================

    updateBookingStatus: (
      bookingId,
      status,
    ) => {
      set((state) => ({
        bookings: state.bookings.map(
          (booking) =>
            booking.id === bookingId
              ? {
                  ...booking,
                  status,
                }
              : booking,
        ),
      }));
    },

    // =====================================================
    // GET BOOKING BY ID
    // =====================================================

    getBookingById: (bookingId) => {
      return get().bookings.find(
        (booking) =>
          booking.id === bookingId,
      );
    },

    // =====================================================
    // GET BOOKINGS BY NURSE ID
    // =====================================================

    getBookingsByNurseId: (nurseId) => {
      return get().bookings.filter(
        (booking) =>
          booking.nurseId === nurseId,
      );
    },
  }));