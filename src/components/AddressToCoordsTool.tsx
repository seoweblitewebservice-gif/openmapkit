"use client";

import { useEffect, useRef, useState } from "react";
import { toDMS } from "@/lib/geo";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

type Result = { lat: number; lon: number; displayName: string };

export default function AddressToCoordsTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [query, setQuery] = useState("");
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
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready || !result) return;
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new maplibre.Marker({ color: "#0f766e" }).setLngLat([result.lon, result.lat]).addTo(mapRef.current);
    mapRef.current.flyTo({ center: [result.lon, result.lat], zoom: 12 });
  }, [result, maplibre, ready]);

  const search = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query.trim())}&format=json&limit=1`, {
      headers: { "Accept-Language": "en", "User-Agent": "OpenMapKit/1.0" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.[0]) {
          setResult({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), displayName: data[0].display_name });
        } else {
          setError("No results found. Try a different address or place name.");
        }
      })
      .catch(() => setError("Search failed. Please try again."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="e.g. Empire State Building, New York"
            className="min-w-[240px] flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            onClick={search}
            disabled={loading || !query.trim()}
            className="rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-50"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {result && (
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <span className="text-stone-500">Coordinates (DD)</span>
              <p className="font-mono font-semibold text-stone-900">{result.lat.toFixed(6)}, {result.lon.toFixed(6)}</p>
            </div>
            <div>
              <span className="text-stone-500">DMS</span>
              <p className="font-mono font-semibold text-stone-900">{toDMS(result.lat, true)}, {toDMS(result.lon, false)}</p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-stone-500">Place</span>
              <p className="text-stone-800">{result.displayName}</p>
            </div>
          </div>
        )}
      </div>
      <div ref={mapContainer} className="h-[400px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
