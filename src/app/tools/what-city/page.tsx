import type { Metadata } from "next";
import WhatCityTool from "@/components/WhatCityTool";

export const metadata: Metadata = {
  title: "What City Am I In? — Detect City from Map or GPS",
  description:
    "Click the map or use GPS to find the nearest city, town or village.",
};

export default function WhatCityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          What City Am I In?
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click any point or use GPS to detect the nearest city, town, or village.
        </p>
      </header>
      <WhatCityTool />
    </div>
  );
}
