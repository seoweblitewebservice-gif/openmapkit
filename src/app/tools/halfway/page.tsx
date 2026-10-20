import type { Metadata } from "next";
import HalfwayTool from "@/components/HalfwayTool";

export const metadata: Metadata = {
  title: "Halfway Between Two Places — Geographic Midpoint Finder",
  description:
    "Find the exact geographic midpoint between any two locations on Earth. Perfect for meeting halfway. Free, no sign-up.",
};

export default function HalfwayPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Halfway Between Two Places
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click two points on the map to find the precise geographic midpoint —
          the ideal meeting spot when both sides travel equal distance.
        </p>
      </header>
      <HalfwayTool />
      <section className="mt-12 max-w-3xl space-y-4 text-stone-600 leading-relaxed">
        <h2 className="font-serif text-xl font-semibold text-stone-900">
          How the midpoint is calculated
        </h2>
        <p>
          OpenMapKit uses the spherical midpoint formula on a great-circle arc.
          More accurate than averaging latitude and longitude, especially for
          long distances or points near the poles.
        </p>
      </section>
    </div>
  );
}
