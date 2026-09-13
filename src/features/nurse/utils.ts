import { calculateDistance } from "@/utils/distance";
import type { Nurse } from "./data";

export interface NearbyNurse extends Nurse {
  distance: number;
}

export function getNearbyNurses(
  nurses: Nurse[],
  latitude: number,
  longitude: number,
  radiusKm: number,
): NearbyNurse[] {
  return nurses
    .map((nurse) => ({
      ...nurse,
      distance: calculateDistance(
        latitude,
        longitude,
        nurse.latitude,
        nurse.longitude,
      ),
    }))
    .filter(
      (nurse) => nurse.distance <= radiusKm,
    )
    .sort(
      (a, b) => a.distance - b.distance,
    );
}