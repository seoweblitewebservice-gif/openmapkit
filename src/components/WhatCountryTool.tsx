"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;

type Result = { country: string; countryCode: string; displayName: string };

export default function WhatCountryTool() {
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
    setLoading(true);
    setError(null);
    setResult(null);
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${point[1]}&lon=${point[0]}&format=json`, {
      headers: { "Accept-Language": "en", "User-Agent": "OpenMapKit/1.0" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.address?.country) {
          setResult({
            country: data.address.country,
            countryCode: (data.address.country_code || "").toUpperCase(),
            displayName: data.display_name || "",
          });
        } else {
          setError("Could not identify country (ocean or unknown area).");
        }
      })
      .catch(() => setError("Lookup failed. Please try again."))
      .finally(() => setLoading(false));
  }, [point, maplibre, ready]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        {loading && <p className="text-sm text-stone-500">Looking up country…</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {result && point && (
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <span className="text-stone-500">Country</span>
              <p className="text-2xl font-semibold text-stone-900">
                {result.country} <span className="text-base text-stone-500">({result.countryCode})</span>
              </p>
            </div>
            <div>
              <span className="text-stone-500">Coordinates</span>
              <p className="font-mono font-semibold text-stone-900">{point[1].toFixed(5)}, {point[0].toFixed(5)}</p>
            </div>
          </div>
        )}
        {!loading && !result && !error && (
          <p className="text-sm text-stone-500">Click the map or use the GPS button to identify the country.</p>
        )}
      </div>
      <div ref={mapContainer} className="h-[480px] w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100" />
    </div>
  );
}
