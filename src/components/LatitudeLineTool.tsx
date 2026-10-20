"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;

export default function LatitudeLineTool({
  latitude,
  label,
  color = "#dc2626",
}: {
  latitude: number;
  label: string;
  color?: string;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);

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
      center: [0, latitude],
      zoom: 1.5,
    });
    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.on("load", () => {
      const coords: [number, number][] = [];
      for (let lon = -180; lon <= 180; lon += 2) {
        coords.push([lon, latitude]);
      }
      map.addSource("latline", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: coords },
        },
      });
      map.addLayer({
        id: "latline",
        type: "line",
        source: "latline",
        paint: { "line-color": color, "line-width": 3, "line-opacity": 0.9 },
      });
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre, latitude, color]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600">
        Colored line = {label} ({latitude > 0 ? `${latitude}°N` : `${Math.abs(latitude)}°S`}). Pan and zoom to explore.
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
