export interface Nurse {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  services: string[];
  verified: boolean;
}

export const dummyNurses: Nurse[] = [
  {
    id: "nurse-001",
    name: "Siti Rahma",
    specialization: "General Nursing",
    rating: 4.9,
    reviewCount: 124,

    // ±1 km dari Bank DKI
    latitude: -6.1605,
    longitude: 106.8270,

    services: [
      "Home Care",
      "Wound Care",
    ],

    verified: true,
  },

  {
    id: "nurse-002",
    name: "Dewi Anggraini",
    specialization: "Elderly Care",
    rating: 4.8,
    reviewCount: 87,

    // ±2 km dari Bank DKI
    latitude: -6.1880,
    longitude: 106.8140,

    services: [
      "Elderly Care",
      "Home Care",
    ],

    verified: true,
  },

  {
    id: "nurse-003",
    name: "Rina Permata",
    specialization: "Home Care",
    rating: 4.7,
    reviewCount: 65,

    // ±7 km dari Bank DKI
    latitude: -6.1700,
    longitude: 106.8790,

    services: [
      "Home Care",
    ],

    verified: true,
  },

  {
    id: "nurse-004",
    name: "Ayu Lestari",
    specialization: "Wound Care",
    rating: 4.9,
    reviewCount: 102,

    // ±11 km dari Bank DKI
    latitude: -6.2480,
    longitude: 106.7700,

    services: [
      "Wound Care",
    ],

    verified: true,
  },
];