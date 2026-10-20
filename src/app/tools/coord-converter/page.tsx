import type { Metadata } from "next";
import CoordConverterTool from "@/components/CoordConverterTool";

export const metadata: Metadata = {
  title: "GPS Coordinate Converter — DD ↔ DMS",
  description:
    "Convert coordinates between decimal degrees (DD) and degrees-minutes-seconds (DMS). Free, instant.",
};

export default function CoordConverterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          GPS Coordinate Converter
        </h1>
        <p className="mt-3 text-stone-600">
          Convert between decimal degrees (DD) and degrees-minutes-seconds (DMS).
        </p>
      </header>
      <CoordConverterTool />
    </div>
  );
}
