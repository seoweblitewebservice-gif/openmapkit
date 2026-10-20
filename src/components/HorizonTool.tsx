"use client";

import { useState } from "react";
import { horizonDistanceKm } from "@/lib/geo";

export default function HorizonTool() {
  const [height, setHeight] = useState(1.7);
  const [unit, setUnit] = useState<"m" | "ft">("m");

  const heightM = unit === "ft" ? height * 0.3048 : height;
  const distKm = horizonDistanceKm(heightM);
  const distMi = distKm * 0.621371;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-stone-700">Eye height</label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value) || 0)}
            className="w-32 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "m" | "ft")}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            <option value="m">meters</option>
            <option value="ft">feet</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-stone-50 p-4">
          <p className="text-sm text-stone-500">Distance to horizon</p>
          <p className="text-3xl font-semibold text-stone-900">{distKm.toFixed(2)} km</p>
          <p className="text-stone-500">{distMi.toFixed(2)} miles</p>
        </div>
        <div className="rounded-lg bg-stone-50 p-4 text-sm text-stone-600">
          <p>Common heights:</p>
          <ul className="mt-2 space-y-1">
            <li>Standing adult ≈ 1.6–1.8 m → ~4.5–4.8 km</li>
            <li>10-storey building ≈ 30 m → ~19.5 km</li>
            <li>Lighthouse 50 m → ~25 km</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
