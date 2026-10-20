"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;
type GeoJSONSource = import("maplibre-gl").GeoJSONSource;

function polygonAreaKm2(coords: [number, number][]): number {
  if (coords.length < 3) return 0;
  const R = 6371;
  let total = 0;
  const n = coords.length;
  for (let i = 0; i < n; i++) {
    const [lon1, lat1] = coords[i];
    const [lon2, lat2] = coords[(i + 1) % n];
    total +=
      ((lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180) *
      (2 + Math.sin((lat1 * Math.PI) / 180) + Math.sin((lat2 * Math.PI) / 180));
  }
  return Math.abs((total * R * R) / 2);
}

export default function AreaTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("maplibre-gl").then((ml) => {
      // @ts-ignore
      import("maplibre-gl/dist/maplibre-gl.css");
      setMaplibre(ml);
    });
  }, []);

  useEffect(() => {
    if (!maplibre || !mapContainer.current || mapRef.current) return;
    const map = new maplibre.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [-98.58, 39.83],
      zoom: 3,
    });
    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.on("load", () => {
      map.addSource("poly", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({ id: "poly-fill", type: "fill", source: "poly", paint: { "fill-color": "#0f766e", "fill-opacity": 0.2 } });
      map.addLayer({ id: "poly-line", type: "line", source: "poly", paint: { "line-color": "#0f766e", "line-width": 2 } });
      setReady(true);
    });
    map.on("click", (e) => {
      setPoints((prev) => [...prev, [e.lngLat.lng, e.lngLat.lat]]);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready) return;
    const map = mapRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    points.forEach((p) => {
      markersRef.current.push(new maplibre.Marker({ color: "#0f766e", scale: 0.7 }).setLngLat(p).addTo(map));
    });
    const source = map.getSource("poly") as GeoJSONSource;
    if (points.length >= 3) {
      const ring = [...points, points[0]];
      source?.setData({ type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [ring] } });
    } else if (points.length >= 2) {
      source?.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: points } });
    } else {
      source?.setData({ type: "FeatureCollection", features: [] });
    }
  }, [points, maplibre, ready]);

  const areaKm2 = points.length >= 3 ? polygonAreaKm2(points) : 0;
  const areaMi2 = areaKm2 * 0.386102;
  const areaAcres = areaKm2 * 247.105;
  const areaHa = areaKm2 * 100;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        {points.length >= 3 ? (
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-stone-500">Area</span>
              <p className="text-xl font-semibold text-stone-900">{areaMi2.toFixed(2)} sq mi</p>
              <p className="text-stone-500">{areaKm2.toFixed(2)} km² · {areaAcres.toFixed(1)} acres · {areaHa.toFixed(1)} ha</p>
            </div>
            <div>
              <span className="text-stone-500">Vertices</span>
              <p className="font-semibold text-stone-900">{points.length}</p>
            </div>
            <button onClick={() => setPoints([])} className="ml-auto self-start rounded-lg border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-50">Clear</button>
          </div>
        ) : (
          <p className="text-sm text-stone-500">
            Click the map to add points. Need at least 3 points to measure area.
            {points.length > 0 && ` (${points.length} so far)`}
          </p>
        )}
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
