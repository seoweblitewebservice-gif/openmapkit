/** Shared geographic utility functions for OpenMapKit */

export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function midpoint(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): [number, number] {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const λ1 = (lon1 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const Bx = Math.cos(φ2) * Math.cos(Δλ);
  const By = Math.cos(φ2) * Math.sin(Δλ);
  const φ3 = Math.atan2(
    Math.sin(φ1) + Math.sin(φ2),
    Math.sqrt((Math.cos(φ1) + Bx) ** 2 + By ** 2)
  );
  const λ3 = λ1 + Math.atan2(By, Math.cos(φ1) + Bx);
  return [(λ3 * 180) / Math.PI, (φ3 * 180) / Math.PI];
}

export function bearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360;
}

export function antipode(lat: number, lon: number): [number, number] {
  const antiLat = -lat;
  let antiLon = lon + 180;
  if (antiLon > 180) antiLon -= 360;
  return [antiLon, antiLat];
}

export function toDMS(decimal: number, isLat: boolean): string {
  const abs = Math.abs(decimal);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = ((minFloat - min) * 60).toFixed(2);
  const dir = isLat ? (decimal >= 0 ? "N" : "S") : decimal >= 0 ? "E" : "W";
  return `${deg}° ${min}' ${sec}" ${dir}`;
}

export function createCircleGeoJSON(
  center: [number, number],
  radiusKm: number,
  points = 64
): GeoJSON.Feature<GeoJSON.Polygon> {
  const coords: [number, number][] = [];
  const [lng, lat] = center;
  const distanceX = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  const distanceY = radiusKm / 110.574;
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    coords.push([lng + distanceX * Math.cos(theta), lat + distanceY * Math.sin(theta)]);
  }
  coords.push(coords[0]);
  return {
    type: "Feature",
    properties: {},
    geometry: { type: "Polygon", coordinates: [coords] },
  };
}

export function horizonDistanceKm(eyeHeightM: number): number {
  return 3.57 * Math.sqrt(Math.max(eyeHeightM, 0));
}

export function randomLatLng(): [number, number] {
  const u = Math.random();
  const v = Math.random();
  const lat = (180 / Math.PI) * Math.asin(2 * v - 1);
  const lng = 360 * u - 180;
  return [lng, lat];
}

export function tunnelExit(lat: number, lon: number): [number, number] {
  return antipode(lat, lon);
}

/** Approximate sunrise/sunset using solar equations */
export function sunTimes(
  lat: number,
  lon: number,
  date: Date = new Date()
): { sunrise: string; sunset: string; dayLength: string } | null {
  const rad = Math.PI / 180;
  const day = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
      86400000
  );
  const decl = 0.4093 * Math.sin(((2 * Math.PI) / 365) * (day - 81));
  const latR = lat * rad;
  const cosH =
    (Math.sin(-0.0145) - Math.sin(latR) * Math.sin(decl)) /
    (Math.cos(latR) * Math.cos(decl));
  if (cosH > 1 || cosH < -1) return null;
  const H = Math.acos(cosH);
  const noon = 12 - lon / 15;
  const sunriseH = noon - (H * 12) / Math.PI;
  const sunsetH = noon + (H * 12) / Math.PI;
  const fmt = (h: number) => {
    let hr = Math.floor(h);
    let min = Math.round((h - hr) * 60);
    if (min === 60) { hr += 1; min = 0; }
    hr = ((hr % 24) + 24) % 24;
    return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };
  const dayLen = sunsetH - sunriseH;
  const dlH = Math.floor(dayLen);
  const dlM = Math.round((dayLen - dlH) * 60);
  return {
    sunrise: fmt(sunriseH),
    sunset: fmt(sunsetH),
    dayLength: `${dlH}h ${dlM}m`,
  };
}
