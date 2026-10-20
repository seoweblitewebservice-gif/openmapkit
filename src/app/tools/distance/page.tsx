import type { Metadata } from "next";
import DistanceTool from "@/components/DistanceTool";

export const metadata: Metadata = {
  title: "Distance Between Places — Great-Circle Calculator",
  description:
    "Free distance calculator. Measure the straight-line (great-circle) distance between any two places on Earth in miles or kilometers.",
};

export default function DistancePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Distance Between Places
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Calculate the shortest path over the Earth’s surface (great-circle or
          “as the crow flies” distance) between any two points. Click the map
          twice or enter coordinates.
        </p>
      </header>

      <DistanceTool />

      <section className="mt-12">
        <h2 className="font-serif text-xl font-semibold text-stone-900">
          About great-circle distance
        </h2>
        <p className="mt-3 text-stone-600 leading-relaxed">
          The shortest distance between two points on a sphere is along a great
          circle. OpenMapKit uses the haversine formula. Results are shown in
          both statute miles and kilometers.
        </p>
      </section>
    </div>
  );
}
