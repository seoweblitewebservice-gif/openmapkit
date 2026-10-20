"use client";

import { useEffect, useRef, useState } from "react";

type MapLibre = typeof import("maplibre-gl");
type Map = import("maplibre-gl").Map;
type Marker = import("maplibre-gl").Marker;
type GeoJSONSource = import("maplibre-gl").GeoJSONSource;

function createCircle(
  center: [number, number],
  radiusKm: number,
  points = 64
): GeoJSON.Feature<GeoJSON.Polygon> {
  const coords: [number, number][] = [];
  const [lng, lat] = center;
  const distanceX = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));
  const distanceY = radiusKm / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    coords.push([lng + x, lat + y]);
  }
  coords.push(coords[0]);

  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
  };
}

export default function MapRadius() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [maplibre, setMaplibre] = useState<MapLibre | null>(null);
  const [center, setCenter] = useState<[number, number]>([-98.5795, 39.8283]);
  const [radius, setRadius] = useState(50);
  const [unit, setUnit] = useState<"mi" | "km">("mi");
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
      center: center,
      zoom: 5,
    });

    map.addControl(new maplibre.NavigationControl(), "top-right");
    map.addControl(new maplibre.ScaleControl({ unit: "imperial" }), "bottom-left");

    map.on("load", () => {
      map.addSource("radius-circle", {
        type: "geojson",
        data: createCircle(center, unit === "mi" ? radius * 1.60934 : radius),
      });

      map.addLayer({
        id: "radius-fill",
        type: "fill",
        source: "radius-circle",
        paint: {
          "fill-color": "#0f766e",
          "fill-opacity": 0.15,
        },
      });

      map.addLayer({
        id: "radius-outline",
        type: "line",
        source: "radius-circle",
        paint: {
          "line-color": "#0f766e",
          "line-width": 2,
        },
      });

      const marker = new maplibre.Marker({ color: "#0f766e", draggable: true })
        .setLngLat(center)
        .addTo(map);

      marker.on("dragend", () => {
        const lngLat = marker.getLngLat();
        setCenter([lngLat.lng, lngLat.lat]);
      });

      markerRef.current = marker;
      setReady(true);
    });

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setCenter([lng, lat]);
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [maplibre]);

  useEffect(() => {
    if (!mapRef.current || !ready) return;
    const source = mapRef.current.getSource("radius-circle") as GeoJSONSource;
    if (source) {
      const radiusKm = unit === "mi" ? radius * 1.60934 : radius;
      source.setData(createCircle(center, radiusKm));
    }
    if (markerRef.current) {
      markerRef.current.setLngLat(center);
    }
  }, [center, radius, unit, ready]);

  const radiusKm = unit === "mi" ? radius * 1.60934 : radius;
  const areaKm2 = Math.PI * radiusKm * radiusKm;
  const areaMi2 = areaKm2 / 2.58999;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4 rounded-xl border border-border bg-white p-4">
        <div>
          <label className="block text-xs font-medium text-stone-500">
            Radius
          </label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={2000}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value) || 1)}
              className="w-24 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "mi" | "km")}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
            >
              <option value="mi">miles</option>
              <option value="km">km</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-stone-600">
          <p>
            Center:{" "}
            <span className="font-mono text-stone-900">
              {center[1].toFixed(5)}, {center[0].toFixed(5)}
            </span>
          </p>
          <p className="mt-0.5">
            Area ≈{" "}
            <strong>
              {unit === "mi"
                ? `${areaMi2.toLocaleString(undefined, { maximumFractionDigits: 0 })} mi²`
                : `${areaKm2.toLocaleString(undefined, { maximumFractionDigits: 0 })} km²`}
            </strong>
          </p>
        </div>
        <p className="w-full text-xs text-stone-400 sm:w-auto sm:ml-auto">
          Click map or drag the marker to set center
        </p>
      </div>

      <div
        ref={mapContainer}
        className="h-[480px] w-full overflow-hidden rounded-xl border border-border bg-stone-100"
      />
    </div>
  );
}
