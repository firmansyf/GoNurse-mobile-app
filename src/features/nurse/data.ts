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
    latitude: -6.7485,
    longitude: 107.3774,
    services: ["Home Care", "Wound Care"],
    verified: true,
  },
  {
    id: "nurse-002",
    name: "Dewi Anggraini",
    specialization: "Elderly Care",
    rating: 4.8,
    reviewCount: 87,
    latitude: -6.7655,
    longitude: 107.3924,
    services: ["Elderly Care", "Home Care"],
    verified: true,
  },
  {
    id: "nurse-003",
    name: "Rina Permata",
    specialization: "Home Care",
    rating: 4.7,
    reviewCount: 65,
    latitude: -6.7705,
    longitude: 107.3604,
    services: ["Home Care"],
    verified: true,
  },
  {
    id: "nurse-004",
    name: "Ayu Lestari",
    specialization: "Wound Care",
    rating: 4.9,
    reviewCount: 102,
    latitude: -6.7355,
    longitude: 107.4004,
    services: ["Wound Care"],
    verified: true,
  },
];