"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

type Result = { timezone: string; offset: string; localTime: string };

export default function TimezoneTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [point, setPoint] = useState<[number, number] | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new maplibre.Marker({ color: "#0f766e" }).setLngLat(point).addTo(mapRef.current);
    setLoading(true);
    setError(null);
    setResult(null);
    fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${point[1]}&longitude=${point[0]}`)
      .then((r) => { if (!r.ok) throw new Error("fail"); return r.json(); })
      .then((data) => {
        const tz = data.timeZone || data.timezone || "Unknown";
        const local = data.dateTime
          ? new Date(data.dateTime).toLocaleString()
          : `${data.hour ?? ""}:${String(data.minute ?? "").padStart(2, "0")}`;
        const offset = data.timeZoneOffset ?? data.utcOffset ?? "";
        setResult({ timezone: tz, offset: String(offset), localTime: local });
      })
      .catch(() => {
        const offsetH = Math.round(point[0] / 15);
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const local = new Date(utc + offsetH * 3600000);
        setResult({
          timezone: `UTC${offsetH >= 0 ? "+" : ""}${offsetH} (approx)`,
          offset: `UTC${offsetH >= 0 ? "+" : ""}${offsetH}`,
          localTime: local.toLocaleString(),
        });
      })
      .finally(() => setLoading(false));
  }, [point, maplibre, ready]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        {loading && <p className="text-sm text-stone-500">Looking up time zone…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {result && point && (
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-stone-500">Time zone</span>
              <p className="text-xl font-semibold text-stone-900">{result.timezone}</p>
              <p className="text-stone-500">{result.offset}</p>
            </div>
            <div>
              <span className="text-stone-500">Local time</span>
              <p className="text-xl font-semibold text-stone-900">{result.localTime}</p>
            </div>
            <div>
              <span className="text-stone-500">Coordinates</span>
              <p className="font-mono font-semibold text-stone-900">{point[1].toFixed(4)}, {point[0].toFixed(4)}</p>
            </div>
          </div>
        )}
        {!loading && !result && !error && (
          <p className="text-sm text-stone-500">Click the map to find the time zone.</p>
        )}
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
