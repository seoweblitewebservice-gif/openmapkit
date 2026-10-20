import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OpenMapKit",
  description:
    "OpenMapKit is a free collection of browser-based map tools and printable blank maps built on open data.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-stone-900">
        About OpenMapKit
      </h1>
      <div className="mt-6 space-y-6 text-stone-600 leading-relaxed">
        <p>
          OpenMapKit provides free interactive map tools and printable blank
          maps that run entirely in your browser. No account, no API key, and
          no paid plan is required.
        </p>
        <p>
          Every tool is built on publicly available open data: OpenStreetMap
          (via OpenFreeMap tiles and Nominatim/Photon geocoding), US Census
          Bureau boundary and demographic files, USGS elevation data, and
          Natural Earth for world boundaries.
        </p>
        <h2 className="font-serif text-xl font-semibold text-stone-900 pt-4">
          Data sources
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Map tiles — OpenFreeMap / OpenStreetMap</li>
          <li>Geocoding — Photon & Nominatim</li>
          <li>US boundaries & demographics — US Census Bureau</li>
          <li>Elevation — USGS / AWS Terrain Tiles</li>
          <li>World boundaries — Natural Earth</li>
        </ul>
      </div>
    </div>
  );
}
