"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type GeoJSONSource = import("maplibre-gl").GeoJSONSource;

function sunPosition(date = new Date()) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day = (date.getTime() - start) / 86400000;
  const decl = 0.4093 * Math.sin(((2 * Math.PI) / 365) * (day - 81));
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60;
  const lon = 15 * (12 - utcHours);
  const lat = (decl * 180) / Math.PI;
  return { lat, lon };
}

function nightPolygon(subLat: number, subLon: number): [number, number][] {
  const coords: [number, number][] = [];
  const steps = 64;
  const nightLon = subLon > 0 ? subLon - 180 : subLon + 180;
  const nightLat = -subLat;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const dLon = 90 * Math.cos(t);
    const dLat = 70 * Math.sin(t);
    let lng = nightLon + dLon;
    let lat = Math.max(-85, Math.min(85, nightLat + dLat));
    if (lng > 180) lng -= 360;
    if (lng < -180) lng += 360;
    coords.push([lng, lat]);
  }
  return coords;
}

export default function DayNightTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [sun, setSun] = useState(() => sunPosition());
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
      zoom: 1.2,
    });
    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.on("load", () => {
      map.addSource("night", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({ id: "night-fill", type: "fill", source: "night", paint: { "fill-color": "#1e293b", "fill-opacity": 0.45 } });
      map.addSource("sun", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({
        id: "sun-point",
        type: "circle",
        source: "sun",
        paint: { "circle-radius": 8, "circle-color": "#f59e0b", "circle-stroke-width": 2, "circle-stroke-color": "#fff" },
      });
      setReady(true);
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!mapRef.current || !ready) return;
    const map = mapRef.current;
    const s = sunPosition();
    setSun(s);
    const poly = nightPolygon(s.lat, s.lon);
    (map.getSource("night") as GeoJSONSource)?.setData({
      type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [poly] },
    });
    (map.getSource("sun") as GeoJSONSource)?.setData({
      type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [s.lon, s.lat] },
    });
  }, [ready]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!mapRef.current || !ready) return;
      const s = sunPosition();
      setSun(s);
      const poly = nightPolygon(s.lat, s.lon);
      (mapRef.current.getSource("night") as GeoJSONSource)?.setData({
        type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [poly] },
      });
      (mapRef.current.getSource("sun") as GeoJSONSource)?.setData({
        type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [s.lon, s.lat] },
      });
    }, 60000);
    return () => clearInterval(id);
  }, [ready]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm">
        <div className="flex flex-wrap gap-8">
          <div>
            <span className="text-stone-500">Sun overhead (approx)</span>
            <p className="font-mono font-semibold text-stone-900">{sun.lat.toFixed(2)}°, {sun.lon.toFixed(2)}°</p>
          </div>
          <div>
            <span className="text-stone-500">Updated</span>
            <p className="font-semibold text-stone-900">{new Date().toUTCString()}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-stone-400">Amber dot = subsolar point. Dark overlay ≈ night side. Approximate model.</p>
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
