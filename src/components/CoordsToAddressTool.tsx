"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

export default function CoordsToAddressTool() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [latInput, setLatInput] = useState("");
  const [lonInput, setLonInput] = useState("");
  const [point, setPoint] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string | null>(null);
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
    map.on("click", (e) => {
      setPoint([e.lngLat.lng, e.lngLat.lat]);
      setLatInput(e.lngLat.lat.toFixed(6));
      setLonInput(e.lngLat.lng.toFixed(6));
    });
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [maplibre]);

  useEffect(() => {
    if (!maplibre || !mapRef.current || !ready || !point) return;
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new maplibre.Marker({ color: "#0f766e" }).setLngLat(point).addTo(mapRef.current);
    setLoading(true);
    setError(null);
    setAddress(null);
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${point[1]}&lon=${point[0]}&format=json`, {
      headers: { "Accept-Language": "en", "User-Agent": "OpenMapKit/1.0" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.display_name) setAddress(data.display_name);
        else setError("No address found for this location.");
      })
      .catch(() => setError("Lookup failed. Please try again."))
      .finally(() => setLoading(false));
  }, [point, maplibre, ready]);

  const lookup = () => {
    const lat = parseFloat(latInput);
    const lon = parseFloat(lonInput);
    if (isNaN(lat) || isNaN(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      setError("Enter valid latitude (−90 to 90) and longitude (−180 to 180).");
      return;
    }
    setPoint([lon, lat]);
    if (mapRef.current) mapRef.current.flyTo({ center: [lon, lat], zoom: 12 });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <div className="flex flex-wrap gap-3">
          <input type="text" value={latInput} onChange={(e) => setLatInput(e.target.value)} placeholder="Latitude"
            className="w-36 rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
          <input type="text" value={lonInput} onChange={(e) => setLonInput(e.target.value)} placeholder="Longitude"
            className="w-36 rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
          <button onClick={lookup} className="rounded-full bg-teal-700 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-600">Lookup</button>
        </div>
        <p className="mt-2 text-xs text-stone-400">Or click the map to pick a point.</p>
        {loading && <p className="mt-3 text-sm text-stone-500">Looking up address…</p>}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {address && (
          <div className="mt-3">
            <span className="text-sm text-stone-500">Address</span>
            <p className="font-medium text-stone-900">{address}</p>
          </div>
        )}
      </div>
      <div ref={mapContainer} className="h-[400px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
