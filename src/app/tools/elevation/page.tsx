import type { Metadata } from "next";
import ElevationTool from "@/components/ElevationTool";

export const metadata: Metadata = {
  title: "Elevation Finder — Height Above Sea Level Anywhere",
  description:
    "Look up ground elevation at any point on Earth in feet and meters. Click the map or use GPS. Free, no sign-up.",
};

export default function ElevationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Elevation Finder
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click any point on the map (or use your device GPS) to get the ground
          elevation above sea level in feet and meters.
        </p>
      </header>
      <ElevationTool />
      <section className="mt-12 max-w-3xl space-y-4 text-stone-600 leading-relaxed">
        <h2 className="font-serif text-xl font-semibold text-stone-900">Data source</h2>
        <p>
          Elevation is fetched from the free Open-Elevation API (SRTM and other
          open datasets). Accuracy is typically within a few meters.
        </p>
      </section>
    </div>
  );
}
