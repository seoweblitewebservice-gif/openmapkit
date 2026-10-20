"use client";

import { useEffect, useRef, useState } from "react";
import { midpoint, haversineKm } from "@/lib/geo";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;
type GeoJSONSource = import("maplibre-gl").GeoJSONSource;

export default function HalfwayTool() {
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
      map.addSource("line", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({ id: "line", type: "line", source: "line", paint: { "line-color": "#0f766e", "line-width": 2, "line-dasharray": [2, 2] } });
      setReady(true);
    });
    map.on("click", (e) => {
      setPoints((prev) => {
        if (prev.length >= 2) return [[e.lngLat.lng, e.lngLat.lat]];
        return [...prev, [e.lngLat.lng, e.lngLat.lat]];
      });
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready) return;
    const map = mapRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    points.forEach((p, i) => {
      const m = new maplibre.Marker({ color: i === 0 ? "#0f766e" : "#b45309" }).setLngLat(p).addTo(map);
      markersRef.current.push(m);
    });
    if (points.length === 2) {
      const mid = midpoint(points[0][1], points[0][0], points[1][1], points[1][0]);
      const midMarker = new maplibre.Marker({ color: "#7c3aed" }).setLngLat(mid).addTo(map);
      markersRef.current.push(midMarker);
      const source = map.getSource("line") as GeoJSONSource;
      source?.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [points[0], mid, points[1]] },
      });
    } else {
      const source = map.getSource("line") as GeoJSONSource;
      source?.setData({ type: "FeatureCollection", features: [] });
    }
  }, [points, maplibre, ready]);

  const mid =
    points.length === 2
      ? midpoint(points[0][1], points[0][0], points[1][1], points[1][0])
      : null;
  const dist =
    points.length === 2
      ? haversineKm(points[0][1], points[0][0], points[1][1], points[1][0])
      : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        {mid ? (
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-stone-500">Midpoint</span>
              <p className="font-mono text-lg font-semibold text-stone-900">
                {mid[1].toFixed(5)}, {mid[0].toFixed(5)}
              </p>
            </div>
            <div>
              <span className="text-stone-500">Total distance</span>
              <p className="text-lg font-semibold text-stone-900">
                {(dist! * 0.621371).toFixed(1)} mi · {dist!.toFixed(1)} km
              </p>
            </div>
            <button
              onClick={() => setPoints([])}
              className="ml-auto self-start rounded-lg border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-50"
            >
              Clear
            </button>
          </div>
        ) : (
          <p className="text-sm text-stone-500">
            Click the map to place point A, then point B. Purple marker = halfway.
          </p>
        )}
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
