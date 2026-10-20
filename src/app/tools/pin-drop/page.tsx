import type { Metadata } from "next";
import PinDropTool from "@/components/PinDropTool";

export const metadata: Metadata = {
  title: "Pin Drop Map — Drop Labeled Pins on a Map",
  description:
    "Drop multiple labeled pins on an interactive map. Free pin map tool.",
};

export default function PinDropPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Pin Drop Map
        </h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Click the map to drop numbered pins. Clear anytime. Useful for trip
          planning, field notes, or marking locations.
        </p>
      </header>
      <PinDropTool />
    </div>
  );
}
