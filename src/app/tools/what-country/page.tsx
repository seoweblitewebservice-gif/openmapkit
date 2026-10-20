import type { Metadata } from "next";
import WhatCountryTool from "@/components/WhatCountryTool";

export const metadata: Metadata = {
  title: "What Country Am I In? — Identify Country from Map or GPS",
  description:
    "Click the map or use GPS to identify the country. Free reverse-geocode tool.",
};

export default function WhatCountryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          What Country Am I In?
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click any point or use GPS to identify the country. Powered by
          OpenStreetMap Nominatim.
        </p>
      </header>
      <WhatCountryTool />
    </div>
  );
}
