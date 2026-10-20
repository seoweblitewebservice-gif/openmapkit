"use client";

import { useEffect, useRef, useState } from "react";
import { toDMS } from "@/lib/geo";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

export default function LatLongTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
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
      center: [-98.58, 39.83],
      zoom: 3,
    });
    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.addControl(new maplibre.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: false }), "top-right");
    map.on("load", () => setReady(true));
    map.on("click", (e) => setPoint([e.lngLat.lng, e.lngLat.lat]));
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready || !point) return;
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new maplibre.Marker({ color: "#0f766e" }).setLngLat(point).addTo(mapRef.current);
  }, [point, maplibre, ready]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        {point ? (
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <span className="text-stone-500">Decimal degrees</span>
              <p className="font-mono text-lg font-semibold text-stone-900">{point[1].toFixed(6)}, {point[0].toFixed(6)}</p>
            </div>
            <div>
              <span className="text-stone-500">DMS</span>
              <p className="font-mono text-lg font-semibold text-stone-900">{toDMS(point[1], true)}, {toDMS(point[0], false)}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-stone-500">Click the map or use the GPS button (top-right) to get coordinates.</p>
        )}
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
