import type { Metadata } from "next";
import BearingTool from "@/components/BearingTool";

export const metadata: Metadata = {
  title: "Bearing & Compass Calculator — True Direction Between Points",
  description:
    "Calculate the true compass bearing and distance between any two points on Earth.",
};

export default function BearingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Bearing & Compass Calculator
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Find the initial true bearing and great-circle distance from point A
          to point B. Useful for navigation and outdoor planning.
        </p>
      </header>
      <BearingTool />
    </div>
  );
}
