"use client";

import { useState } from "react";
import { toDMS } from "@/lib/geo";

function parseDMS(str: string): number | null {
  const cleaned = str.trim().replace(/,/g, ".");
  const asNum = parseFloat(cleaned);
  if (!isNaN(asNum) && Math.abs(asNum) <= 180) return asNum;
  return null;
}

export default function CoordConverterTool() {
  const [lat, setLat] = useState("40.7128");
  const [lng, setLng] = useState("-74.0060");

  const latN = parseDMS(lat);
  const lngN = parseDMS(lng);
  const valid = latN != null && lngN != null && Math.abs(latN) <= 90 && Math.abs(lngN) <= 180;

  return (
    <div className="space-y-6 rounded-xl border border-stone-200 bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-stone-700">Latitude (DD)</label>
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="40.7128"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Longitude (DD)</label>
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            placeholder="-74.0060"
          />
        </div>
      </div>

      {valid ? (
        <div className="rounded-lg bg-stone-50 p-4 space-y-3">
          <div>
            <span className="text-xs font-medium text-stone-500">Decimal degrees</span>
            <p className="font-mono text-lg font-semibold text-stone-900">
              {latN!.toFixed(6)}, {lngN!.toFixed(6)}
            </p>
          </div>
          <div>
            <span className="text-xs font-medium text-stone-500">Degrees minutes seconds (DMS)</span>
            <p className="font-mono text-lg font-semibold text-stone-900">
              {toDMS(latN!, true)}, {toDMS(lngN!, false)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600">Enter valid latitude (−90 to 90) and longitude (−180 to 180).</p>
      )}

      <div className="text-xs text-stone-400">
        Example: New York City ≈ 40.7128, −74.0060
      </div>
    </div>
  );
}
