import type { Metadata } from "next";
import MapRadius from "@/components/MapRadius";

export const metadata: Metadata = {
  title: "Map Radius Tool — Draw a Circle of Any Radius",
  description:
    "Free map radius tool. Draw a true geodesic circle of any radius in miles or kilometers around any point. See the covered area instantly. No sign-up required.",
};

export default function RadiusPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Map Radius Tool
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Draw a true circle of any radius around a point on the map. Useful for
          delivery zones, service areas, event planning, real-estate research,
          and coverage analysis. The circle uses a geodesic approximation so it
          stays accurate even at larger distances.
        </p>
      </header>

      <MapRadius />

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-stone-900">
          How to use this tool
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-stone-600">
          <li>Click anywhere on the map or drag the teal marker to set the center.</li>
          <li>Enter the desired radius and choose miles or kilometers.</li>
          <li>
            The circle and approximate area update instantly. Zoom and pan as
            needed.
          </li>
        </ol>

        <h2 className="mt-8 font-serif text-xl font-semibold text-stone-900">
          Data & methodology
        </h2>
        <p className="mt-3 text-stone-600 leading-relaxed">
          Map tiles are served by OpenFreeMap (OpenStreetMap data). The circle
          geometry is generated entirely in the browser. No location data is
          sent to any server.
        </p>
      </section>
    </div>
  );
}
