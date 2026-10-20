"use client";

import { useEffect, useRef, useState } from "react";
import { antipode } from "@/lib/geo";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

export default function AntipodeTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [point, setPoint] = useState<[number, number] | null>(null);
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
      center: [0, 20],
      zoom: 1.5,
    });
    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.on("load", () => setReady(true));
    map.on("click", (e) => setPoint([e.lngLat.lng, e.lngLat.lat]));
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready || !point) return;
    const map = mapRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    const anti = antipode(point[1], point[0]);
    const m1 = new maplibre.Marker({ color: "#0f766e" }).setLngLat(point).addTo(map);
    const m2 = new maplibre.Marker({ color: "#7c3aed" }).setLngLat(anti).addTo(map);
    markersRef.current = [m1, m2];
  }, [point, maplibre, ready]);

  const anti = point ? antipode(point[1], point[0]) : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        {anti && point ? (
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <span className="text-stone-500">Your point (teal)</span>
              <p className="font-mono font-semibold text-stone-900">{point[1].toFixed(5)}, {point[0].toFixed(5)}</p>
            </div>
            <div>
              <span className="text-stone-500">Antipode (purple)</span>
              <p className="font-mono font-semibold text-stone-900">{anti[1].toFixed(5)}, {anti[0].toFixed(5)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-stone-500">Click anywhere on the map to find its antipode.</p>
        )}
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
