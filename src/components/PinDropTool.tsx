"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

type Pin = { id: number; lng: number; lat: number };

export default function PinDropTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const [ready, setReady] = useState(false);
  const nextId = useRef(1);

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
    map.on("load", () => setReady(true));
    map.on("click", (e) => {
      setPins((prev) => {
        if (prev.length >= 50) return prev;
        const id = nextId.current++;
        return [...prev, { id, lng: e.lngLat.lng, lat: e.lngLat.lat }];
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
    pins.forEach((pin) => {
      const el = document.createElement("div");
      el.className =
        "flex h-7 w-7 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white shadow";
      el.textContent = String(pin.id);
      const marker = new maplibre.Marker({ element: el })
        .setLngLat([pin.lng, pin.lat])
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [pins, maplibre, ready]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-stone-200 bg-white p-4">
        <p className="text-sm text-stone-600">
          {pins.length === 0
            ? "Click the map to drop pins (up to 50)."
            : `${pins.length} pin${pins.length === 1 ? "" : "s"} placed`}
        </p>
        {pins.length > 0 && (
          <button
            onClick={() => {
              setPins([]);
              nextId.current = 1;
            }}
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm hover:bg-stone-50"
          >
            Clear all
          </button>
        )}
      </div>
      {pins.length > 0 && (
        <div className="max-h-32 overflow-y-auto rounded-xl border border-stone-200 bg-white p-3 text-xs font-mono text-stone-600">
          {pins.map((p) => (
            <div key={p.id}>
              #{p.id}: {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
            </div>
          ))}
        </div>
      )}
      <div
        ref={mapContainer}
        className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
      />
    </div>
  );
}
