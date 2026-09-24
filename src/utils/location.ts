import * as Location from "expo-location";

import { APP_CONFIG } from "@/constants/config";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

/**
 * Mendapatkan lokasi patient.
 *
 * Development:
 * - Jika useDummyLocation = true,
 *   gunakan lokasi dummy.
 *
 * Production:
 * - Jika useDummyLocation = false,
 *   gunakan GPS asli device.
 */
export async function getUserLocation(): Promise<UserLocation> {
  // ==========================================
  // DEVELOPMENT MODE
  // ==========================================

  if (APP_CONFIG.useDummyLocation) {
    console.log(
      "📍 Using dummy development location:",
      APP_CONFIG.dummyLocation,
    );

    return {
      latitude: APP_CONFIG.dummyLocation.latitude,
      longitude: APP_CONFIG.dummyLocation.longitude,
    };
  }

  // ==========================================
  // REAL GPS MODE
  // ==========================================

  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== Location.PermissionStatus.GRANTED) {
    throw new Error(
      "Location permission was not granted.",
    );
  }

  const location =
    await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}