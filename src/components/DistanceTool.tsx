"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;
type GeoJSONSource = import("maplibre-gl").GeoJSONSource;

function haversine(
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
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function DistanceTool() {
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
      center: [-98.5795, 39.8283],
      zoom: 3,
    });

    map.addControl(new maplibre.NavigationControl(), "top-right");

    map.on("load", () => {
      map.addSource("line", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "line-layer",
        type: "line",
        source: "line",
        paint: {
          "line-color": "#0f766e",
          "line-width": 3,
        },
      });
      setReady(true);
    });

    map.on("click", (e) => {
      setPoints((prev) => {
        if (prev.length >= 2) return [[e.lngLat.lng, e.lngLat.lat]];
        return [...prev, [e.lngLat.lng, e.lngLat.lat]];
      });
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready) return;
    const map = mapRef.current;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    points.forEach((p, i) => {
      const marker = new maplibre.Marker({
        color: i === 0 ? "#0f766e" : "#b45309",
      })
        .setLngLat(p)
        .addTo(map);
      markersRef.current.push(marker);
    });

    const source = map.getSource("line") as GeoJSONSource;
    if (source && points.length === 2) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: points,
        },
      });
    } else if (source) {
      source.setData({ type: "FeatureCollection", features: [] });
    }
  }, [points, maplibre, ready]);

  const distKm =
    points.length === 2
      ? haversine(points[0][1], points[0][0], points[1][1], points[1][0])
      : null;
  const distMi = distKm !== null ? distKm * 0.621371 : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-white p-4">
        {distKm !== null ? (
          <div className="flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-stone-500">Distance</span>
              <p className="text-2xl font-semibold text-stone-900">
                {distMi!.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{" "}
                mi
              </p>
              <p className="text-stone-500">
                {distKm.toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}{" "}
                km
              </p>
            </div>
            <div className="font-mono text-xs text-stone-500">
              <p>
                A: {points[0][1].toFixed(5)}, {points[0][0].toFixed(5)}
              </p>
              <p>
                B: {points[1][1].toFixed(5)}, {points[1][0].toFixed(5)}
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
            Click the map to place point A, then click again for point B.
            {points.length === 1 && " (point A placed — click for B)"}
          </p>
        )}
      </div>

      <div
        ref={mapContainer}
        className="h-[480px] w-full overflow-hidden rounded-xl border border-border bg-stone-100"
      />
    </div>
  );
}
