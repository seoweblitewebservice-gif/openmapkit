"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;

export default function PrimeMeridianTool() {
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
      center: [0, 20],
      zoom: 1.5,
    });
    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.on("load", () => {
      const coords: [number, number][] = [];
      for (let lat = -85; lat <= 85; lat += 1) {
        coords.push([0, lat]);
      }
      map.addSource("pm", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: coords },
        },
      });
      map.addLayer({
        id: "pm-line",
        type: "line",
        source: "pm",
        paint: { "line-color": "#7c3aed", "line-width": 3, "line-opacity": 0.9 },
      });
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600">
        Purple line = Prime Meridian (0° longitude), through Greenwich.
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
